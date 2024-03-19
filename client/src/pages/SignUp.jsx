import { Alert, Button, Label, TextInput, Toast } from "flowbite-react";
import React from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { z } from "zod";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters long." })
      .max(255, { message: "Username must be less than 255 characters long." })
      .regex(/^[a-zA-Z0-9_]*$/, {
        message:
          "Username must only contain letters, numbers, and underscores.",
      }),
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long." }),
    confirmPassword: z.string(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match.",
        path: ["confirmPassword"],
      });
    }
  });

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
    setError,
  } = useForm({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const resData = await res.json();

      if (resData.success === false) {
        return setError("root", {
          type: "manual",
          message: resData.message,
        });
      }

      toast.success("Account created successfully. Please sign in.");
      navigate("/sign-in");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen max-w-screen-lg mx-auto p-4 mt-12">
      <div className="flex flex-col md:flex-row gap-5">
        <div className="flex-grow md:max-w-[50%] flex justify-center flex-col gap-2">
          <h1 className="text-4xl font-bold">
            Welcome To{" "}
            <Link
              to={"/"}
              className="bg-gradient-to-br bg-clip-text text-transparent from-purple-500 to-blue-400"
            >
              InkWell
            </Link>
          </h1>
          <p className="text-gray-500 max-w-sm">
            InkWell is a personal project for me to share my projects and
            thoughts with the world. Sign up to join the community.
          </p>
        </div>
        <div className="flex-grow md:max-w-[50%]">
          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <Label htmlFor="username" value="Username" />
              <TextInput
                id="username"
                type="text"
                placeholder="Username"
                {...register("username", { required: true })}
              />
              {errors.username && (
                <span className="text-sm text-red-500">
                  {errors.username.message}
                </span>
              )}
            </div>
            <div>
              <Label htmlFor="email" value="Email" />
              <TextInput
                id="email"
                type="email"
                placeholder="Email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-sm text-red-500">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div>
              <Label htmlFor="password" value="Password" />
              <TextInput
                id="password"
                type="password"
                placeholder="Password"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-sm text-red-500">
                  {errors.password.message}
                </span>
              )}
            </div>
            <div>
              <Label htmlFor="confirmPassword" value="Confirm Password" />
              <TextInput
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword", { required: true })}
              />
              {errors.confirmPassword && (
                <span className="text-sm text-red-500">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <Button
                type="submit"
                gradientDuoTone={"purpleToBlue"}
                disabled={isLoading}
              >
                {isLoading ? (
                  <AiOutlineLoading className="animate-spin h-5 w-5" />
                ) : (
                  "Sign Up"
                )}
              </Button>

              {errors.root && (
                <Alert color={"failure"}>{errors.root.message}</Alert>
              )}

              <OAuth />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
