"use client";

import { useState } from "react";
import { db, auth } from "../utils/config/firebase";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { HeartIcon, HeartFilledIcon } from "@radix-ui/react-icons";


interface LikeButtonProps {
  postId: string;
  initialLikes: string[];
}

export default function LikeButton({ postId, initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const user = auth.currentUser;

  const handleLike = async () => {
    if (!user) return;

    const postDoc = doc(db, "posts", postId);
    const hasLiked = likes.includes(user.uid);

    if (hasLiked) {
      // Remove like
      await updateDoc(postDoc, {
        likes: arrayRemove(user.uid),
      });
      setLikes(likes.filter((id) => id !== user.uid));
    } else {
      // Add like
      await updateDoc(postDoc, {
        likes: arrayUnion(user.uid),
      });
      setLikes([...likes, user.uid]);
    }
  };

  return (
    <div className="flex items-center gap-1 text-[14px] relative group">
      <button onClick={handleLike} className="text-blue-500">
        {likes.includes(user?.uid || "") ?  <HeartFilledIcon className="text-red-600"/>  : <HeartIcon className="text-gray-600"/>}
      </button>
      <span>{likes.length}</span>
      <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-full bg-gray-800 text-white text-xs text-nowrap rounded py-2 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      {likes.length} likes
      </div>
    </div>
  );
}
