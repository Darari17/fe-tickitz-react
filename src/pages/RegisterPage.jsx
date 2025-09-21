import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import z from "zod";
import { toast } from "react-toastify";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { register as registerThunk } from "../store/slices/authSlice";

const schema = z.object({
  email: z.string().email({ message: "Email tidak valid" }),
  password: z
    .string()
    .min(8, { message: "Password minimal 8 karakter" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&><])/, {
      message: "Password harus mengandung huruf besar, huruf kecil, dan simbol",
    }),
  terms: z.boolean().refine((val) => val === true, {
    message: "Anda harus menyetujui Terms & Conditions",
  }),
});

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleRegister = async (data) => {
    try {
      await dispatch(registerThunk(data)).unwrap();
      toast.success("Registrasi berhasil! Silakan login");
      navigate("/login");
    } catch (err) {
      toast.error(err || "Registrasi gagal");
    }
  };

  return (
    <main className="min-h-screen bg-[url('/images/bg-auth.svg')] bg-top bg-no-repeat bg-cover bg-black/30 bg-blend-overlay flex flex-col items-center justify-center relative px-4 font-[Mulish] py-10">
      {/* logo */}
      <section>
        <img src="/logos/tickitz-logo-white.svg" alt="Tickitz Logo" />
      </section>

      {/* card */}
      <section className="w-[34.125rem] bg-white rounded-md px-10 py-7 md:px-10 md:py-10">
        {/* step */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
              1
            </div>
            <div className="text-sm mt-2 font-medium text-gray-700">
              Fill Form
            </div>
          </div>
          <div className="flex-1 border-2 border-t border-dashed border-gray-300 mx-2"></div>
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-sm font-bold">
              2
            </div>
            <div className="text-sm mt-2 font-medium text-gray-500">
              Activate
            </div>
          </div>
          <div className="flex-1 border-2 border-t border-dashed border-gray-300 mx-2"></div>
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-sm font-bold">
              3
            </div>
            <div className="text-sm mt-2 font-medium text-gray-500">Done</div>
          </div>
        </div>

        {/* form */}
        <form className="space-y-5" onSubmit={handleSubmit(handleRegister)}>
          <div>
            <label htmlFor="email" className="text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              autoComplete="email"
              placeholder="Enter your email"
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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

          <div className="flex flex-col">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="checkbox"
                className="mr-2"
                {...register("terms")}
              />
              <label htmlFor="checkbox" className="text-sm text-gray-600">
                I agree to terms & conditions
              </label>
            </div>
            {errors.terms && (
              <p className="text-sm text-red-500">{errors.terms.message}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 cursor-pointer disabled:opacity-50"
            >
              {loading ? "Registering..." : "Join For Free Now"}
            </button>
          </div>

          {error && (
            <p className="text-sm text-red-500 text-center mt-2">{error}</p>
          )}

          <div className="text-center text-sm text-gray-600">
            <span>Already have an account? </span>
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </div>
        </form>

        {/* or, facebook, google */}
        <div className="mt-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span>or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <div className="flex gap-4">
            <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-md w-full justify-center hover:bg-gray-100 cursor-pointer">
              <img
                src="/logos/google-btn.svg"
                alt="Google"
                className="w-5 h-5"
              />
              <span className="text-sm text-gray-700">Google</span>
            </button>
            <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-md w-full justify-center hover:bg-gray-100 cursor-pointer">
              <img
                src="/logos/facebook-btn.svg"
                alt="Facebook"
                className="w-5 h-5"
              />
              <span className="text-sm text-gray-700">Facebook</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};
