import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { RegisterGroomer } from "./mutationFunctions";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router";

export default function AddGroomer() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const {mutate, isPending} = useMutation({
    mutationFn:RegisterGroomer,
    onSuccess:async()=>{
        toast.success("Groomer added successfully!!!")
        navigate('/admin-dashboard')
    }
  })
  function onSubmit(data) {
    mutate(data);
    console.log("Groomer Data:", data);
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            🐾 Register Grooming Partner
          </h1>
          <p className="text-gray-600 mt-2">
            Add a new independent grooming partner to Petlinc
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

          {/* BASIC DETAILS */}
          <Section title="Basic Details">
            <Input label="Full Name" {...register("name", { required: true })} />
            <Input label="Phone Number" {...register("phone", { required: true })} />
            <Input label="Email" {...register("email")} />
            <Input label="Avatar URL" {...register("avatar")} />
          </Section>

          {/* SERVICE AREA */}
          <Section title="Service Area">
            <Input label="City" {...register("city", { required: true })} />
            <Input label="Pincode" {...register("pincode", { required: true })} />
            <Input
              label="Service Radius (km)"
              type="number"
              {...register("serviceRadiusKm")}
            />
          </Section>

          {/* PROFESSIONAL INFO */}
          <Section title="Professional Information">
            <Input
              label="Experience (Years)"
              type="number"
              {...register("experienceYears")}
            />
            <Textarea
              label="About Groomer"
              {...register("about")}
            />
          </Section>

          {/* VERIFICATION */}
          <Section title="Verification & Trust">
            <Input
              label="Aadhar Number"
              {...register("aadhar", { required: true })}
            />
            <Input
              label="PAN Number"
              {...register("panNumber", { required: true })}
            />
          </Section>

          {/* BANK DETAILS */}
          <Section title="Bank Details (For Payouts)">
            <Input
              label="Account Holder Name"
              {...register("bankDetails.accountHolder")}
            />
            <Input
              label="Account Number"
              {...register("bankDetails.accountNumber")}
            />
            <Input
              label="IFSC Code"
              {...register("bankDetails.ifsc")}
            />
            <Input
              label="Bank Name"
              {...register("bankDetails.bankName")}
            />
          </Section>

          {/* COMMISSION */}
          <Section title="Commission & Status">
            <Input
              label="Commission Percent (%)"
              type="number"
              defaultValue={20}
              {...register("commissionPercent")}
            />

            <div className="flex items-center gap-6 mt-4">
              <Checkbox label="Verified Groomer" {...register("isVerified")} />
              <Checkbox label="Active" defaultChecked {...register("isActive")} />
            </div>
          </Section>

          {/* ACTION */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-8 py-3 bg-orange-600 text-white font-semibold rounded-xl hover:bg-orange-700 transition"
              disabled={isPending}
            >
              Register Groomer
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
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        {title}
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {children}
      </div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        {...props}
        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
      />
    </div>
  );
}

function Textarea({ label, ...props }) {
  return (
    <div className="md:col-span-2">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <textarea
        rows={4}
        {...props}
        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
      />
    </div>
  );
}

function Checkbox({ label, ...props }) {
  return (
    <label className="flex items-center gap-2 text-sm text-gray-700">
      <input type="checkbox" {...props} className="accent-orange-600" />
      {label}
    </label>
  );
}
