"use client";

import { useState } from "react";
import { db, auth } from "../utils/config/firebase";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { IoCloseOutline } from "react-icons/io5"; // Add a close icon for the sidebar

interface Comment {
  userId: string;
  username: string;
  text: string;
  createdAt: Date;
}

interface CommentSectionProps {
  postId: string;
  CommentsProps?: Comment[];
  renderCommentsHeader?: (commentsCount: number) => JSX.Element;
  renderComment?: (comment: Comment, index: number, handleDeleteComment: (comment: Comment) => void) => JSX.Element;
  renderTextarea?: (newComment: string, handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void) => JSX.Element;
  renderButton?: (handleAddComment: () => void) => JSX.Element;
  showInputFields?: boolean;
}

export default function CommentSection({
  postId,
  CommentsProps = [],
  renderCommentsHeader,
  renderComment,
  renderTextarea,
  renderButton,
  showInputFields = true,
}: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(CommentsProps);
  const [newComment, setNewComment] = useState("");
  const [showSidebar, setShowSidebar] = useState(false); // Sidebar toggle state
  const user = auth.currentUser;

  const handleAddComment = async () => {
    if (!user || newComment.trim() === "") return;

    const postDoc = doc(db, "posts", postId);
    const commentToAdd = {
      userId: user.uid,
      username: user.displayName || "Anonymous",
      text: newComment,
      createdAt: new Date(),
    };

    await updateDoc(postDoc, {
      comments: arrayUnion(commentToAdd),
    });

    setComments([...comments, commentToAdd]);
    setNewComment("");
  };

  const handleDeleteComment = async (commentToDelete: Comment) => {
    const postDoc = doc(db, "posts", postId);

    await updateDoc(postDoc, {
      comments: arrayRemove(commentToDelete),
    });

    setComments(comments.filter((comment) => comment !== commentToDelete));
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      {/* Comment Icon to open sidebar */}
      <div onClick={toggleSidebar} className="cursor-pointer">
        {renderCommentsHeader ? (
          renderCommentsHeader(comments.length)
        ) : (
          <div className="text-sm text-gray-500 mb-2">
            {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
          </div>
        )}
      </div>

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 w-80 h-full bg-white shadow-lg transition-transform duration-300 ${showSidebar ? "translate-x-0" : "translate-x-full"} z-50`}>
        <div className="p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Comments</h2>
            <IoCloseOutline onClick={toggleSidebar} className="cursor-pointer" />
          </div>
          <div className="mt-4 overflow-y-auto flex-grow">
            {comments.map((comment, index) =>
              renderComment ? (
                renderComment(comment, index, handleDeleteComment)
              ) : (
                <div key={index} className="mb-2 flex justify-between items-center">
                  <div>
                    <strong>{comment.username}</strong>: {comment.text}
                  </div>
                  {user && user.uid === comment.userId && (
                    <button
                      className="text-red-500 text-sm"
                      onClick={() => handleDeleteComment(comment)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              )
            )}
          </div>
          {showInputFields && (
            <div className="mt-2 pt-2 border-t">
              {renderTextarea ? (
                renderTextarea(newComment, (e) => setNewComment(e.target.value))
              ) : (
                <textarea
                  placeholder="Add a comment..."
                  className="border p-2 w-full resize-none focus:outline-none focus:border-blue-500"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleAddComment();
                    }
                  }}
                />
              )}
              {renderButton ? (
                renderButton(handleAddComment)
              ) : (
                <button onClick={handleAddComment} className="text-blue-500 mt-2">
                  Comment
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
