"use client";

import { useState, useEffect } from "react";
import { db } from "../utils/config/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import ScrollingNews from "./sidebar";

interface Post {
  id: string;
  AuthorId: string;
  dateCreatedAt: Date;
  description: string;
  title: string;
  username: string;
  photo: string;
  imageUrl?: string;
}

export default function Post() {
  const [postList, setPostList] = useState<Post[] | null>(null);
  const [loading, setLoading] = useState(false);

  const postRef = collection(db, "posts");

  const getPosts = async () => {
    setLoading(true);
    const data = await getDocs(postRef);
    setLoading(false);
    setPostList(
      data.docs.map(
        (doc) =>
          ({
            ...doc.data(),
            id: doc.id,
            dateCreatedAt: doc.data().dateCreatedAt.toDate(),
          } as Post)
      )
    );
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="ml-6">
      <h1 className="mb-8 font-medium mt-12">For You</h1>
      {loading ? (
        <div className="loader"></div>
      ) : (
        postList?.map((post) => (
          <div key={post.id} className=" mb-6 space-y-2 pb-4 sm:w-10/12">
            <Link href={`/posts/${post.id}`}>
              <div className="flex items-center gap-4">
                <img
                  src={post.photo}
                  alt="avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div className="text-sm">{post.username}</div>
                  <div className="text-sm text-gray-500">
                    {post.dateCreatedAt.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </div>

              <div className="flex gap-20">
                <div className="mt-4 flex flex-col">
                  <div className="text-xl font-semibold ">{post.title}</div>
                  <div className="text-gray-700 mt-4">
                    {post.description.substring(0, 100)}...{" "}
                    {/* Brief description */}
                  </div>
                </div>

                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt="post-image"
                    className=" w-40 h-28  rounded-md"
                  />
                )}
              </div>
            </Link>
          </div>
        ))
      )}
    </div>
  );
}
