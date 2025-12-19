import { useMutation } from "@tanstack/react-query";

import { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { PawPrint, Loader2 } from "lucide-react";
import { Login } from "../Features/Authentication/mutationFunction";
import queryClient from "../Store/queryClient";
import { GlobalContext } from "../Store/Context";
import axios from "axios";

// It only works for the variables defined with VITE as their starting point.
const BASE_URL = "import.meta.env.VITE_BASE_URL"
//import.meta.env.VITE_BASE_URL;
console.log(BASE_URL);
export default function SignIn() {
  const { register, handleSubmit } = useForm();

  const { isLoggedInRef } = useContext(GlobalContext);
  const navigate = useNavigate();
  // logging in using react query
  const {isPending, mutate} = useMutation({
    mutationFn:Login,
    onSuccess:async (data)=>{
        
        toast.success("Welcome back");
        isLoggedInRef.current = true;
        
        // We need to invalidate queries data because mutation does not udpate cached data.
       await queryClient.invalidateQueries(["userData"])
        navigate('/');

    }
  })

  // // implementing google oauth
  // const handleGoogleLogin = async(credentialResponse)=>{
  //   const decoded = jwtDecode(credentialResponse.credential);

  //   const res = await axios.post(
  //     "import.meta.env.VITE_BASE_URL/api/v1/users/google-login",
  //     {
  //       email:decoded.email,
  //       name:decoded.name,
  //       googleId:decoded.sub,
  //       avatar:decoded.picture
  //     }
  //   )

  //       localStorage.setItem("accessToken", res.data.accessToken);
  //   localStorage.setItem("refreshToken", res.data.refreshToken);

  //   window.location.href = "/";   // redirect after login
  // }



  // Handler function that is called when login button is pressed.
  async function onSubmit(data) {
    
    mutate({email:data.email, password: data.password});
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center relative bg-gradient-to-br from-orange-100 via-white to-orange-50 overflow-hidden">
      {/* Background Glow Circles */}
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
          Because They Deserve the Best ❤️
        </h2>
        <p className="text-gray-600 mt-2 text-center max-w-md leading-relaxed">
          Book grooming, vet visits, and more — all in one place. <br />
          Petlinc keeps tails wagging and paws happy!
        </p>
      </div>

      {/* Sign In Card */}
      <div className="w-full md:w-[420px] bg-white/90 backdrop-blur-xl border border-orange-100 rounded-3xl shadow-xl p-8 relative z-10 transform transition-all hover:shadow-orange-100/60 hover:-translate-y-[2px] animate-fadeUp">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-orange-100 w-16 h-16 rounded-full shadow-md">
            <PawPrint className="text-orange-600 w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-orange-600 mt-4">
            Petlinc
          </h1>
          <p className="text-sm text-gray-500">
            Your Pet’s Happiness, Our Priority 🐶🐱
          </p>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
          Welcome Back 👋
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              {...register("email", { value: "test@gmail.com" })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              {...register("password", { value: "rajan1" })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all"
              placeholder="••••••••"
            />
            <div className="flex justify-end mt-1">
              <Link
                to="/forgot-password"
                className="text-xs text-orange-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          {/* Button */}
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
                <Loader2 className="w-5 h-5 animate-spin" /> Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-2 my-4">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-xs text-gray-500">or</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Social Login */}
          <button
            type="button"
            className="w-full py-2 border border-gray-300 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-all text-gray-700 font-medium"
          >
            <img src="/google.svg" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>
          {/* <GoogleLogin 
          onSuccess={handleGoogleLogin}
          onError={()=>console.log("google login failed")}
          />*/}
        </form> 

        {/* Sign Up Link */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-orange-600 font-medium hover:underline"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
