import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router";
import z from "zod";
import { toast } from "react-toastify";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/slices/authSlice";

const schema = z.object({
  email: z.string().email({ message: "Email tidak valid" }),
  password: z.string().min(1, { message: "Password tidak boleh kosong" }),
});

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  const onSubmit = async (data) => {
    try {
      await dispatch(login(data)).unwrap();
      toast.success("Login berhasil!");
      navigate("/");
    } catch (err) {
      toast.error(err || "Login gagal");
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
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Welcome Back 👋
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Sign in with your data that you entered during your registration
        </p>

        {/* form */}
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email" className="text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoComplete="email"
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
                autoComplete="current-password"
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

          <div className="text-right text-sm">
            <Link
              to="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>

          {error && (
            <p className="text-sm text-red-500 text-center mt-2">{error}</p>
          )}

          <div className="text-center text-sm text-gray-600">
            <span>Don't have an account? </span>
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
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
