"use client";

import { useState } from "react";
import { auth, provider } from "./utils/config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import Image from "next/image";



interface DataInput {
  email: string;
  password: string;
  
}

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const [error, setError] = useState<string | null>(null);
  const [user] = useAuthState(auth);
  const router = useRouter();

  [user && router.push("/posts")];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm< DataInput>({ resolver: yupResolver(schema) });

  const handleGoogleSignIn = async () => {
    try {
      const UserCredential = await signInWithPopup(auth, provider);
      console.log(UserCredential);
      router.push("/posts");
    } catch (error) {
      console.error(error);
    }
  };

  const handleEmailLogin = async (data:  DataInput) => {
    try {
      const UserCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      console.log(UserCredential);
      router.push("/posts");
    } catch (error) {
      setError("Invalid Credentials");
    }
  };

  return (
    <div className="flex  flex-col items-center justify-between p-10 sm:p-2 space-y-4 lg:space-y-2">
      <div className="font-semibold sm:text-4xl">Login</div>
      <p className=" text-center text-nowrap sm:text-lg">
        Add your details below to enter app
      </p>

      <form onSubmit={handleSubmit(handleEmailLogin)}>
        <div className="mt-2">
          <label className="text-sm sm:text-md block ">Email address</label>
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="mb-6 p-2 border border-gray-300 w-[350px] h-12 rounded-md"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="text-sm sm:text-md block ">Password</label>
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="mb-6 p-2 border border-gray-300 w-[350px] h-12 rounded-md"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white  p-2 w-full h-12 rounded-md mb-4 sm:mb-2"
        >
          Log In
        </button>

        {error && (
          <div className="text-red-600 text-center">
            An Error Occured. Enter valid details
          </div>
        )}
      </form>
      <div className="flex ">
        <Image
          src="/7123025_logo_google_g_icon.svg"
          alt="google"
          width={25}
          height={25}
          className="absolute mt-3 ml-[70px]"
        />

        <button
          onClick={handleGoogleSignIn}
          className="bg-gray-600 text-white  w-[350px] h-12 p-2 px-8   rounded-md "
        >
          Sign In With Google
        </button>
      </div>

      <div className="text-center">
        <p> Don't have an account?</p>

        <Link href="/signup" className="text-blue-800 ">
          Create account
        </Link>
      </div>
    </div>
  );
};

export default Login;
