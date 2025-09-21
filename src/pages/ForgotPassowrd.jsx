import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import z from "zod";

const schema = z
  .object({
    email: z.string().email({ message: "Email tidak valid" }),
    password: z
      .string()
      .min(8, { message: "Password minimal 8 karakter" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&><])/, {
        message:
          "Password harus mengandung huruf besar, huruf kecil, dan simbol",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password tidak sama",
  });

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const toggleConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data) => {
    toast.success("Password Berhasil diganti");
    console.log("Forgot Password data:", data);
    navigate("/login");
  };

  return (
    <>
      <main className="min-h-screen bg-[url('/images/bg-auth.svg')] bg-top bg-no-repeat bg-cover bg-black/30 bg-blend-overlay flex flex-col items-center justify-center relative px-4 font-[Mulish] py-10">
        <section>
          <img src="/logos/tickitz-logo-white.svg" alt="Tickitz Logo" />
        </section>

        <section className="w-[34.125rem] bg-white rounded-md px-10 py-7 md:px-10 md:py-10">
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email" className="text-sm text-gray-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                autoComplete="email"
                placeholder="Enter your email"
                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 "
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="pwd" className="text-sm text-gray-600">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="pwd"
                  placeholder="Enter your password"
                  autoComplete="new-password"
                  className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute inset-y-0 top-1 right-3 flex items-center text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="confirm-pwd" className="text-sm text-gray-600">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirm-pwd"
                  placeholder="Enter your password"
                  autoComplete="new-password"
                  className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("confirmPassword")}
                />
                <button
                  type="button"
                  onClick={toggleConfirmPassword}
                  className="absolute inset-y-0 top-1 right-3 flex items-center text-gray-500"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="mt-10 ">
              <button className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 cursor-pointer text-center">
                Reset Password
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
};
