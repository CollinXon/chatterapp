"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/app/utils/config/firebase";
import { doc, getDoc } from "firebase/firestore";


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
  
  useEffect(() => {
   getPostDetails();
  
  }, [id]);

  if (loading) return <div className="loader"></div>;

  if (!post) return <div className="loader"></div>;

  return (
    <div className=" mt-1  space-y-10 ">
       <div className="flex justify-center">
      {post.imageUrl && <img src={post.imageUrl} alt="post image" className="  w-11/12   " />}
      </div>
      <div className="p-2 sm:p-20 leading-8">
      <h1 className="font-semibold text-2xl sm:text-5xl mb-2">{post.title}</h1>
      <div className="flex items-center  gap-2  mt-10">
        <img src={post.photo} alt="avatar"  className="h-12 w-12 rounded-full" />
        <div className="">{post.username}</div>
        <div>
        <div className=" ml-6 font-medium">
        {post.dateCreatedAt.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })}
        </div>
          
      </div>
      
      </div>
     
      <div className="mt-12">{post.description}</div>
      </div>
      
    </div>
  );
}
