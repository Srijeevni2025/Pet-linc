// import { useMutation } from "@tanstack/react-query";
// import { useForm } from "react-hook-form";
// import { RegisterGroomer } from "./mutationFunctions";
// import toast from "react-hot-toast";
// import { Navigate, useNavigate } from "react-router";

// export default function AddGroomer() {
//   const { register, handleSubmit } = useForm();
//   const navigate = useNavigate();

//   const {mutate, isPending} = useMutation({
//     mutationFn:RegisterGroomer,
//     onSuccess:async()=>{
//         toast.success("Groomer added successfully!!!")
//         navigate('/admin-dashboard')
//     }
//   })
//   function onSubmit(data) {
//     mutate(data);
    
//   }

//   return (
//     <div className="min-h-screen bg-slate-50 p-8">
//       <div className="max-w-5xl mx-auto">
        
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">
//             🐾 Register Grooming Partner
//           </h1>
//           <p className="text-gray-600 mt-2">
//             Add a new independent grooming partner to Petlinc
//           </p>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

//           {/* BASIC DETAILS */}
//           <Section title="Basic Details">
//             <Input label="Full Name" {...register("name", { required: true })} />
//             <Input label="Phone Number" {...register("phone", { required: true })} />
//             <Input label="Email" {...register("email")} />
//             <Input label="Avatar URL" {...register("avatar")} />
//           </Section>

//           {/* SERVICE AREA */}
//           <Section title="Service Area">
//             <Input label="City" {...register("city", { required: true })} />
//             <Input label="Pincode" {...register("pincode", { required: true })} />
//             <Input
//               label="Service Radius (km)"
//               type="number"
//               {...register("serviceRadiusKm")}
//             />
//           </Section>

//           {/* PROFESSIONAL INFO */}
//           <Section title="Professional Information">
//             <Input
//               label="Experience (Years)"
//               type="number"
//               {...register("experienceYears")}
//             />
//             <Textarea
//               label="About Groomer"
//               {...register("about")}
//             />
//           </Section>

//           {/* VERIFICATION */}
//           <Section title="Verification & Trust">
//             <Input
//               label="Aadhar Number"
//               {...register("aadhar", { required: true })}
//             />
//             <Input
//               label="PAN Number"
//               {...register("panNumber", { required: true })}
//             />
//           </Section>

//           {/* BANK DETAILS */}
//           <Section title="Bank Details (For Payouts)">
//             <Input
//               label="Account Holder Name"
//               {...register("bankDetails.accountHolder")}
//             />
//             <Input
//               label="Account Number"
//               {...register("bankDetails.accountNumber")}
//             />
//             <Input
//               label="IFSC Code"
//               {...register("bankDetails.ifsc")}
//             />
//             <Input
//               label="Bank Name"
//               {...register("bankDetails.bankName")}
//             />
//           </Section>

//           {/* COMMISSION */}
//           <Section title="Commission & Status">
//             <Input
//               label="Commission Percent (%)"
//               type="number"
//               defaultValue={20}
//               {...register("commissionPercent")}
//             />

//             <div className="flex items-center gap-6 mt-4">
//               <Checkbox label="Verified Groomer" {...register("isVerified")} />
//               <Checkbox label="Active" defaultChecked {...register("isActive")} />
//             </div>
//           </Section>

//           {/* ACTION */}
//           <div className="flex justify-end">
//             <button
//               type="submit"
//               className="px-8 py-3 bg-orange-600 text-white font-semibold rounded-xl hover:bg-orange-700 transition"
//               disabled={isPending}
//             >
//               Register Groomer
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// /* ---------- Reusable Components ---------- */

// function Section({ title, children }) {
//   return (
//     <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
//       <h2 className="text-xl font-semibold text-gray-800 mb-6">
//         {title}
//       </h2>
//       <div className="grid md:grid-cols-2 gap-6">
//         {children}
//       </div>
//     </div>
//   );
// }

// function Input({ label, ...props }) {
//   return (
//     <div>
//       <label className="block text-sm font-medium text-gray-700 mb-1">
//         {label}
//       </label>
//       <input
//         {...props}
//         className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
//       />
//     </div>
//   );
// }

// function Textarea({ label, ...props }) {
//   return (
//     <div className="md:col-span-2">
//       <label className="block text-sm font-medium text-gray-700 mb-1">
//         {label}
//       </label>
//       <textarea
//         rows={4}
//         {...props}
//         className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
//       />
//     </div>
//   );
// }

// function Checkbox({ label, ...props }) {
//   return (
//     <label className="flex items-center gap-2 text-sm text-gray-700">
//       <input type="checkbox" {...props} className="accent-orange-600" />
//       {label}
//     </label>
//   );
// }



import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { RegisterGroomer } from "./mutationFunctions";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export default function AddGroomer() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      commissionPercent: 20,
      isActive: true,
      isVerified: false,
    },
  });

  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: RegisterGroomer,
    onSuccess: () => {
      toast.success("Groomer registered successfully!");
      navigate("/admin-dashboard");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Registration failed. Please try again.");
    },
  });

  function onSubmit(data) {
    mutate(data);
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-5xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">🐾 Register Grooming Partner</h1>
          <p className="text-gray-600 mt-2">Add a new independent grooming partner to Petlinc</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

          {/* BASIC DETAILS */}
          <Section title="Basic Details">
            <Input
              label="Full Name"
              error={errors.name}
              {...register("name", { required: "Name is required" })}
            />
            <Input
              label="Phone Number"
              error={errors.phone}
              {...register("phone", {
                required: "Phone is required",
                pattern: { value: /^[6-9]\d{9}$/, message: "Enter a valid 10-digit phone number" },
              })}
            />
            <Input
              label="Email"
              type="email"
              error={errors.email}
              {...register("email", {
                pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
              })}
            />
            <Input label="Avatar URL" {...register("avatar")} />
          </Section>

          {/* PASSWORD */}
          <Section title="Account Credentials">
            <Input
              label="Password"
              type="password"
              error={errors.password}
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" },
              })}
            />
            <Input
              label="Confirm Password"
              type="password"
              error={errors.confirmPassword}
              {...register("confirmPassword", {
                required: "Please confirm the password",
                validate: (val, formValues) =>
                  val === formValues.password || "Passwords do not match",
              })}
            />
          </Section>

          {/* SERVICE AREA */}
          <Section title="Service Area">
            <Input
              label="City"
              error={errors.city}
              {...register("city", { required: "City is required" })}
            />
            <Input
              label="Pincode"
              error={errors.pincode}
              {...register("pincode", {
                required: "Pincode is required",
                pattern: { value: /^\d{6}$/, message: "Enter a valid 6-digit pincode" },
              })}
            />
            <Input
              label="Service Radius (km)"
              type="number"
              {...register("serviceRadiusKm", { min: { value: 1, message: "Minimum 1 km" } })}
            />
          </Section>

          {/* PROFESSIONAL INFO */}
          <Section title="Professional Information">
            <Input
              label="Experience (Years)"
              type="number"
              {...register("experienceYears", { min: { value: 0, message: "Cannot be negative" } })}
            />
            <Textarea label="About Groomer" {...register("about")} />
          </Section>

          {/* VERIFICATION */}
          <Section title="Verification & Trust">
            <Input
              label="Aadhar Number"
              error={errors.aadhar}
              {...register("aadhar", {
                required: "Aadhar is required",
                pattern: { value: /^\d{12}$/, message: "Aadhar must be 12 digits" },
              })}
            />
            <Input
              label="PAN Number"
              error={errors.panNumber}
              {...register("panNumber", {
                required: "PAN is required",
                pattern: { value: /^[A-Z]{5}[0-9]{4}[A-Z]$/, message: "Enter a valid PAN (e.g. ABCDE1234F)" },
              })}
            />
          </Section>

          {/* BANK DETAILS */}
          <Section title="Bank Details (For Payouts)">
            <Input label="Account Holder Name" {...register("bankDetails.accountHolder")} />
            <Input label="Account Number" {...register("bankDetails.accountNumber")} />
            <Input
              label="IFSC Code"
              {...register("bankDetails.ifsc", {
                pattern: { value: /^[A-Z]{4}0[A-Z0-9]{6}$/, message: "Enter a valid IFSC code" },
              })}
            />
            <Input label="Bank Name" {...register("bankDetails.bankName")} />
          </Section>

          {/* COMMISSION & STATUS */}
          <Section title="Commission & Status">
            <Input
              label="Commission Percent (%)"
              type="number"
              error={errors.commissionPercent}
              {...register("commissionPercent", {
                min: { value: 0, message: "Cannot be negative" },
                max: { value: 100, message: "Cannot exceed 100%" },
              })}
            />
            <div className="flex items-center gap-6 mt-2">
              <Checkbox label="Verified Groomer" {...register("isVerified")} />
              <Checkbox label="Active" {...register("isActive")} />
            </div>
          </Section>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isPending}
              className="px-8 py-3 bg-orange-600 text-white font-semibold rounded-xl hover:bg-orange-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isPending ? "Registering…" : "Register Groomer"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

/* ---------- Reusable Components ---------- */

function Section({ title, children }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">{title}</h2>
      <div className="grid md:grid-cols-2 gap-6">{children}</div>
    </div>
  );
}

function Input({ label, error, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        {...props}
        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition ${
          error ? "border-red-400 bg-red-50" : "border-gray-300"
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error.message}</p>}
    </div>
  );
}

function Textarea({ label, error, ...props }) {
  return (
    <div className="md:col-span-2">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <textarea
        rows={4}
        {...props}
        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
      />
      {error && <p className="mt-1 text-xs text-red-600">{error.message}</p>}
    </div>
  );
}

function Checkbox({ label, ...props }) {
  return (
    <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
      <input type="checkbox" {...props} className="accent-orange-600 w-4 h-4" />
      {label}
    </label>
  );
}