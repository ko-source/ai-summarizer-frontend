"use client";

import React from "react";
import Input from "@/components/input";
import Button from "@/components/button";
import Link from "next/link";
import { object, string } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = object({
  email: string().email("Invalid email address").required("Email is required"),
  password: string().required("Password is required"),
});

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: object) => {
    console.log("Form data:", data);
  };
  return (
    <div className="flex h-full min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-20 text-center text-2xl/9 font-bold tracking-tight text-white">
          Create an account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            type="email"
            placeholder="abc@gmail.com"
            label="Email address"
            error={!!errors.email}
            errorMessage={(errors.email?.message as string) || ""}
            {...register("email")}
          />

          <Input
            type="password"
            placeholder="Password"
            label="Password"
            error={!!errors.password}
            errorMessage={(errors.password?.message as string) || ""}
            {...register("password")}
          />
          <Button type="submit" label="Sign up" className="w-full" />
        </form>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <p className="text-center text-sm text-gray-100">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="text-indigo-500 hover:text-indigo-400"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
