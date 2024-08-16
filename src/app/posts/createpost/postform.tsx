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
    <div>
      {loading ? (
        <div className="loader"></div>
      ) : (
        <form
          onSubmit={handleSubmit(handleCreatePost)}
          className="mt-36 lg:mt-20 flex flex-col justify-center place-items-center gap-6 border-solid border-2 border-blue-600 bg-slate-800 w-9/12 ml-12 sm:ml-20 lg:ml-48 sm:w-10/12 lg:w-7/12 h-auto items-center p-4"
        >
          <input
            type="text"
            placeholder="Title..."
            {...register("title")}
            className="input-field"
          />
          <p className="text-red-500">{errors.title?.message}</p>

          <textarea
            placeholder="Type Content Here"
            {...register("description")}
            className="textarea-field"
          />
          <p className="text-red-500">{errors.description?.message}</p>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input"
          />
          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Image Preview"
              
                className="w-24 h-24 object-cover"
              />
            </div>
          )}

          <input type="submit" className="text-white mt-4" />
        </form>
      )}
    </div>
  );
};

export default PostForm;
