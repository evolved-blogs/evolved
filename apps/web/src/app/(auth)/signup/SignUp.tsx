"use client";

import React from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Input from "@src/components/atoms/input/Input";
import { CreateUser } from "@src/services/create-user/createUser.type";
import { createUser } from "@src/services";
import { useRouter } from "next/navigation";
import { Urls } from "@src/enum";
import { setCookie } from "@src/utils/cookies";

const SignUp = () => {
  const { control, handleSubmit } = useForm<CreateUser>();
  const router = useRouter();

  const onSubmit = async (data: CreateUser) => {
    try {
      const response = await createUser({ ...data } as CreateUser);
      console.log("Response:", response);
      if (response && response.token) {
        setCookie("token", response?.token, 1);
        // setCookie("user", JSON.stringify(response?.user), 1);
        router.push(Urls.Profile);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <div className="flex justify-center mb-4">
          <Image
            src="/assets/dark_logo.png"
            alt="Logo"
            width={100}
            height={100}
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            control={control}
            name="userName"
            label="User name"
            placeholder="Enter your username"
            isRequired
          />
          <Input
            control={control}
            name="email"
            label="Email"
            placeholder="Enter your email"
            isRequired
          />

          <Input
            control={control}
            name="password"
            label="Password"
            placeholder="Enter your password"
            isRequired
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-500 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
