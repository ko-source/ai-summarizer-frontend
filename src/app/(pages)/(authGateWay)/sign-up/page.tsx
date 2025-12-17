"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/input";
import Button from "@/components/button";
import Link from "next/link";
import { object, string } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { nestApi } from "@/lib/axios";
import toast from "react-hot-toast";
import { SignUpRequest, SignUpResponse } from "@/types/types";

const schema = object({
  username: string().required("Username is required"),
  email: string().email("Invalid email address").required("Email is required"),
  password: string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export default function SignUpPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  
  const onSubmit = async (data: SignUpRequest) => {
    setIsLoading(true);
    try {
      const response = await nestApi.post<SignUpResponse>('/auth/sign-up', data);
      if (response.statusCode === 201) {
        router.push("/sign-in");
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error((error as Error).message || "Failed to create account");
    } finally {
      setIsLoading(false);
    }
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
            type="text"
            placeholder="Ali.."
            label="Username"
            error={!!errors.username}
            errorMessage={(errors.username?.message as string) || ""}
            {...register("username")}
          />
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
          <Button type="submit" label={isLoading ? "Creating account..." : "Sign up"} className="w-full" disabled={isLoading} />
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
