"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { db, auth, storage } from "@/app/utils/config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


interface Data {
  title: string;
  description: string;
}

const PostForm = () => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const schema = yup.object().shape({
    title: yup.string().required("You must add a title."),
    description: yup.string().required("You must add a description."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Data>({
    resolver: yupResolver(schema),
  });

  const postRef = collection(db, "posts");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleCreatePost = async (data: Data) => {
    let imageUrl = "";
    if (image) {
      const imageRef = ref(storage, `posts/${image.name}`);
      await uploadBytes(imageRef, image);
      imageUrl = await getDownloadURL(imageRef);
    }

    await addDoc(postRef, {
      title: data.title,
      description: data.description,
      username: user?.displayName,
      authorId: user?.uid,
      photo: user?.photoURL,
      imageUrl: imageUrl,
      dateCreatedAt: new Date(),
    });

    router.push("/posts");
  };

  return (
    <div className="bg-slate-900  flex justify-center overflow-x-hidden min-h-screen">
      {loading ? (
        <div className="loader"></div>
      ) : (
        
        <form
          onSubmit={handleSubmit(handleCreatePost)}
          className="flex flex-col  place-items-center  gap-6  bg-slate-800 w-11/12 max-w-full  items-center text-white p-4 mt-12 xl:mt-6 h-full"
        >

            
        {imagePreview && (
          <div className=" flex justify-center">
            <img
              src={imagePreview}
              alt="Image Preview"
            
              className="w-11/12 h-1/2 object-cover"
            />
          </div>
        )}
        
          <input
            type="text" 
            placeholder="Title..."
            {...register("title")}
            className="input-field bg-gray-700 p-2 md:p-4 w-11/12 sm:w-7/12 focus:outline-none"
          />
          <p className="text-red-500">{errors.title?.message}</p>

          <textarea
            placeholder="Type Content Here"
            {...register("description")}
            className="textarea-field  w-11/12 bg-gray-700 p-4 h-[250px] focus:outline-none"
          />
          <p className="text-red-500">{errors.description?.message}</p>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="ml-24 sm:ml-0 "
          />
          
          

          <button type="submit" className="text-white mt-8 bg-red-500 p-2 px-8 rounded-md ]" > Post </button>
        </form>
      )}
    </div>
   
  );
  
};

export default PostForm;
