"use client";

import { useState } from "react";
import { auth } from "@/app/utils/config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export interface DataInputs {
  email: string;
  password: string;
  confirmPassword: string;
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
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password Don&apos;t Match")
    .required("Confirm Password is required"),
});

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DataInputs>({
    resolver: yupResolver(schema),
  });

  const handleEmailSignUp = async (data: DataInputs) => {
    try {
      const UserCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      console.log(UserCredential);
      router.push("/login");
    } catch (error) {
      setError("Something went wrong");
    }
  };

  return (
    <div className="flex  flex-col items-center justify-between p-24 sm:p-10  space-y-4 ">
      <div className="font-semibold sm:text-4xl">Create account</div>

      <form onSubmit={handleSubmit(handleEmailSignUp)}>
        <div className="mt-4">
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
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password")}
            className="mb-6 p-2 border relative border-gray-300 w-[350px] h-12 rounded-md"
          />
          <button
            className="absolute ml-[-50px] mt-3 "
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label className="text-sm sm:text-md block ">Confirm Password</label>

          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            {...register("confirmPassword")}
            className="mb-6 p-2 border relative border-gray-300 w-[350px] h-12 rounded-md
            "
          />
          <button
            className="absolute ml-[-50px] mt-3 disabled:text-opacity-50"
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </button>

          {errors.confirmPassword && (
            <p className="text-red-600">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white  p-2 w-full h-12 rounded-md mb-4 sm:mb-2"
        >
          Sign Up
        </button>

        {error && (
          <div className="text-red-600 text-center">
            User Already Exist. Use a different email address
          </div>
        )}
      </form>
    </div>
  );
};

export default Signup;
