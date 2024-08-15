"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/app/utils/config/firebase";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";

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

export default function PostDetails() {
  const { id } = useParams();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    const getPostDetails = async () => {
      if (!id) return;
  
      setLoading(true);
  
      try {
        const docRef = doc(db, "posts", id as string);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          const data = docSnap.data();
          setPost({
            id: docSnap.id,
            AuthorId: data.AuthorId,
            dateCreatedAt: data.dateCreatedAt.toDate(),
            description: data.description,
            title: data.title,
            username: data.username,
            photo: data.photo,
            imageUrl: data.imageUrl || "",
          });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
  
      setLoading(false);
    };
  
  }, [id]);

  if (loading) return <div className="loader"></div>;

  if (!post) return <div>Post not found</div>;

  return (
    <div className="ml-6">
      <h1 className="font-semibold text-2xl mb-2">{post.title}</h1>
      <div className="flex items-center gap-2 mb-2">
        <Image src={post.photo} alt="avatar" width={8} height={8} className="rounded-full" />
        <div>{post.username}</div>
      </div>
      <div>{post.description}</div>
      {post.imageUrl && <Image src={post.imageUrl} alt="post image" width={250} height={250} />}
      <div>
        {post.dateCreatedAt.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })}
      </div>
    </div>
  );
}
