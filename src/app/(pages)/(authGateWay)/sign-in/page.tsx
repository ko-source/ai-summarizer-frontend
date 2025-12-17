"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/button";
import Input from "@/components/input";
import Link from "next/link";
import { object, string } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { nestApi } from "@/lib/axios";
import { useAuthStore } from "@/store/useAuthStore";
import { LoginResponse } from "@/types/types";

const schema = object({
  email: string().email("Invalid email address").required("Email is required"),
  password: string().required("Password is required"),
});

type FormValues = {
  email: string;
  password: string;
};

export default function SignInPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const { setToken, setUser } = useAuthStore();

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      const response = await nestApi.post<LoginResponse>("/auth/sign-in", data);
      const token = response.access_token;

      document.cookie = `token=${token}; path=/`;

      setToken(token);
      setUser(response.user.email, response.user.username);

      toast.success("Signed in successfully!");
      router.push("/");
    } catch (error) {
      toast.error((error as Error).message || "Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-20 text-center text-2xl/9 font-bold tracking-tight text-white">
          Sign in to your account
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

          <Button
            type="submit"
            label={isLoading ? "Signing in..." : "Sign in"}
            className="w-full"
            disabled={isLoading}
          />
        </form>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <p className="text-center text-sm text-gray-100">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="text-indigo-500 hover:text-indigo-400"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
