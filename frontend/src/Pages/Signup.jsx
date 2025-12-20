
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import queryClient from "../Store/queryClient";
import GoogleLoginButton from "../ui/GoogleLogin";

import { PawPrint, Loader2 } from "lucide-react";

const BASE_URL = import.meta.env.VITE_BASE_URL
// import.meta.env.VITE_BASE_URL;
export default function Signup() {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  const { isPending, mutate } = useMutation({
    mutationFn: async ({ name, email, password, passwordConfirm }) => {
      const res = await axios({
        method: "POST",
        url: `${BASE_URL}/api/v1/users/signup`,
        headers: { "Content-Type": "application/json" },
        data: { name, email, password, passwordConfirm, authProvider:"local" },
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: async () => {
       await queryClient.invalidateQueries(["userData"]);
      toast.success("Account created successfully 🎉");
      reset();
      navigate("/");
    },
    onError: async (err) => {
      console.log(err);
      toast.error(err.response?.data?.message || "Signup failed");
    },
  });

  function onSubmit(data) {
    mutate(data);
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center relative bg-gradient-to-br from-orange-100 via-white to-orange-50 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-orange-200 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-orange-300 rounded-full blur-3xl opacity-20"></div>

      {/* Floating Paw Prints */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <PawPrint className="absolute top-10 left-10 w-10 h-10 text-orange-400 animate-float-slow" />
        <PawPrint className="absolute bottom-20 right-16 w-12 h-12 text-orange-300 animate-float-slow delay-500" />
        <PawPrint className="absolute top-1/3 right-32 w-9 h-9 text-orange-200 animate-float-slow delay-700" />
      </div>

      {/* Illustration */}
      <div className="hidden md:flex flex-col items-center justify-center w-1/2 animate-fadeIn">
        <img
          src="/puppy.png"
          alt="Cute pets"
          className="w-[380px] drop-shadow-2xl animate-float"
        />
        <h2 className="mt-6 text-3xl font-extrabold text-orange-700">
          Join the Petlinc Family 🐶🐱
        </h2>
        <p className="text-gray-600 mt-2 text-center max-w-md leading-relaxed">
          Discover the easiest way to book trusted pet grooming and wellness
          services near you.
        </p>
      </div>

      {/* Sign Up Card */}
      <div className="w-full md:w-[420px] bg-white/90 backdrop-blur-xl border border-orange-100 rounded-3xl shadow-xl p-8 relative z-10 transform transition-all hover:shadow-orange-100/60 hover:-translate-y-[2px] animate-fadeUp">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-orange-100 w-16 h-16 rounded-full shadow-md">
            <PawPrint className="text-orange-600 w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-orange-600 mt-4">
            Petlinc
          </h1>
          <p className="text-sm text-gray-500">
            Because They’re Family Too ❤️
          </p>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
          Create Your Account
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              {...register("name")}
              placeholder="John Doe"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              {...register("email")}
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                {...register("password")}
                placeholder="********"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                required
                {...register("passwordConfirm")}
                placeholder="********"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className={`w-full py-2.5 rounded-xl font-semibold text-white shadow-md transition-all flex justify-center items-center gap-2 ${
              isPending
                ? "bg-orange-400 cursor-not-allowed"
                : "bg-orange-600 hover:bg-orange-700 hover:shadow-lg hover:scale-[1.02]"
            }`}
          >
            {isPending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Creating Account...
              </>
            ) : (
              "Sign Up"
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-2 my-4">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-xs text-gray-500">or</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Social Signup */}
          {/* <button
            type="button"
            className="w-full py-2 border border-gray-300 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-all text-gray-700 font-medium"
          >
            <img src="/google.svg" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button> */}
        </form>

            <GoogleLoginButton/>
        {/* Sign In Redirect */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-orange-600 font-medium hover:underline"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
