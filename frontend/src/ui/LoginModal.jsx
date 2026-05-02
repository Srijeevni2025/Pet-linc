// src/ui/LoginModal.jsx
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { X, PawPrint, Loader2 } from "lucide-react";

import { Login } from "../Features/Authentication/mutationFunction";
import queryClient from "../Store/queryClient";
import { GlobalContext } from "../Store/Context";
import GoogleLoginButton from "./GoogleLogin";

export default function LoginModal() {
  const { isLoggedInRef, loginModalOpen, setLoginModalOpen } = useContext(GlobalContext);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationFn: Login,
    onSuccess: async (data) => {
      toast.success("Welcome back!");
      isLoggedInRef.current = true;
      await queryClient.invalidateQueries(["userData"]);
      setLoginModalOpen(false);

      // Role-based redirect only if they're not already on the right page
      if (data.user.role === "admin") navigate("/admin-dashboard", { replace: true });
      if (data.user.role === "partner") navigate("/partner-dashboard", { replace: true });
      // 'user' role: stay on current page so booking flow continues
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Login failed");
    },
  });

  function onSubmit(data) {
    mutate({ email: data.email, password: data.password });
  }

  if (!loginModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm flex items-center justify-center px-4"
      onClick={() => setLoginModalOpen(false)}
    >
      <div
        className="relative w-full max-w-md bg-white/95 backdrop-blur-xl border border-orange-100 rounded-3xl shadow-2xl p-8 animate-fadeUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={() => setLoginModalOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center bg-orange-100 w-14 h-14 rounded-full shadow-md">
            <PawPrint className="text-orange-600 w-7 h-7" />
          </div>
          <h2 className="text-2xl font-extrabold text-orange-600 mt-3">Sign in to book</h2>
          <p className="text-sm text-gray-500 mt-1">Your pet's appointment is one step away 🐾</p>
        </div>

        {/* Google login — primary CTA */}
        <GoogleLoginButton />

        {/* Divider */}
        <div className="flex items-center gap-2 my-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">or sign in with email</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Email/password form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              required
              {...register("email")}
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              required
              {...register("password")}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className={`w-full py-2.5 rounded-xl font-semibold text-white shadow-md transition-all flex justify-center items-center gap-2 ${
              isPending
                ? "bg-orange-400 cursor-not-allowed"
                : "bg-orange-600 hover:bg-orange-700 hover:scale-[1.02]"
            }`}
          >
            {isPending ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Signing In...</>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-5">
          No account?{" "}
          <a
            href="/signup"
            className="text-orange-600 font-medium hover:underline"
            onClick={() => setLoginModalOpen(false)}
          >
            Sign Up free
          </a>
        </p>
      </div>
    </div>
  );
}