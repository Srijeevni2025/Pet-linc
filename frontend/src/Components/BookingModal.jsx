// import { useContext, useEffect, useState } from "react";
// import { GlobalContext } from "../Store/Context";
// import { CreateBooking } from "../Features/Booking/mutationFunction";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router";
// import { GetAddOns } from "../Features/Packages/queryFunction";
// import ProtectedRoute from "./Protect";
// import { CheckCircle, MapPin } from "lucide-react";
// import { GetSlotAvailability } from "../Features/Booking/queryFunction";
// import queryClient from "../Store/queryClient";

// export default function BookingModal() {
//   const navigate = useNavigate();
//   const [locLoading, setLocLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const {
//     setShowBookingModal,
//     selectedPackage,
//     setSelectedPackage,
//     form,
//     setForm,
//   } = useContext(GlobalContext);

//   // const [form, setForm] = useState({
//   //   productId: "",
//   //   petName: "",
//   //   type: "",
//   //   breed: "",
//   //   age: "",
//   //   weight: "",
//   //   aggression: "",
//   //   notes: "",
//   //   mobile:"",
//   //   address: "",
//   //   date: "",
//   //   timeSlot: "",
//   //   addons: [],
//   //   coupan:"",
//   //   coupanId:"",
//   //   discount:"",
//   //   agreedToTerms: false,
//   // });

//   const [accordionOpen, setAccordionOpen] = useState(false);

//   // coupon state
//   const [coupon, setCoupon] = useState("");
//   const [appliedCoupon, setAppliedCoupon] = useState(null); // store code
//   const [discount, setDiscount] = useState(0);
//   const [couponId, setCouponId] = useState("");

//   // sample T&C text — replace with your actual terms as needed
//   const termsText = [
//     "Customer must ensure pet is healthy and free from contagious conditions.",
//     "Cancellation within 2 hours may incur charges of Rs 150 as per company policy.",
//     "Payment is due on completion unless prepaid online.",
//     "It is not possible to operate trimmers/ clippers in knotted and mated body, so a zero haircut or \
//     an uneven haircut can be an output. If pet gets aggressive while the grooming, please assist our professionals in \
//     handling the pet. Every time pet behaves in a different manner with different grommer in different setting. We \
//     don't charge anything for the free services. If anything is not done due to aggression or any other scenario which can harm \
//     the pet or our service provider, no refuncds will be generated. In case we provide a tooth brush, we use a fresh tooth brush \
//     which costs 100/- per peice which will be handed over to you.",
//   ];

//   const { data: addons, isPending } = useQuery({
//     queryKey: ["addons"],
//     queryFn: GetAddOns,
//   });
//   let addonsList = addons?.data;
//   let coupans = addons?.coupans;


//   /* IMPORTANT: getting slots availability for the selected date and package (productId) to disable already booked slots.*/
//   const { data: slotCounts, refetch: refetchSlots } = useQuery({
//   queryKey: ["slotAvailability", form.date],
//   queryFn: () => GetSlotAvailability(form.date, form.productId),
//   enabled: !!form.date, // only fetch when a date is selected
// });

// const MAX_PER_SLOT = 3; // max bookings allowed per slot  
// const slots = ["9 AM - 11 PM", "12 PM - 2 PM", "3 PM - 5 PM", "5 PM - 7 PM"];


//   useEffect(() => {
//     setForm((f) => ({ ...f, productId: selectedPackage?._id }));
//   }, [selectedPackage]);

//   useEffect(() => {
//     setForm((f) => ({ ...f, discount: discount, couponId: couponId }));
//   }, [couponId, discount]);

//   const [step, setStep] = useState(1);

//   const { mutate } = useMutation({
//     mutationFn: CreateBooking,
//     onSuccess: async () => {
//       toast.success("Booking created successfully.");
//       queryClient.invalidateQueries(["slotAvailability", form.date]); // refresh slot availability after booking
//       setShowBookingModal(false);
//       setSelectedPackage(null);
//       navigate("/booking-success");
//     },
//     onError: async () => {
//       setShowBookingModal(false);
//       setSelectedPackage(null);
//       toast.error(
//         "Something went wrong!!! Please contact petlinc team to book a session.",
//       );
//       navigate("/");
//     },
//   });

//   const closeModal = () => {
//     setShowBookingModal(false);
//     setSelectedPackage(null);
//   };

//   function handleNext() {
//     let error = {};

//     if (step === 1) error = validateStep1(form);
//     if (step === 2) error = validateStep2(form);

//     if (Object.keys(error).length > 0) {
//       setErrors(error);
//       return;
//     }
//     setErrors({});
//     setStep(step + 1);
//   }

//   function handleSubmit() {
//     // optionally enforce that terms agreed
//     if (!form.agreedToTerms) {
//       toast.error("Please accept terms & conditions before confirming.");
//       return;
//     }
//     const city = localStorage.getItem("currentCity");
//     setForm({...form, city:city});
    
//     // send payload (including coupon info)
//     mutate({ ...form, coupon: appliedCoupon || null, discount: discount || 0 });
//   }

//   if (isPending) return <h1 className="p-8 text-center">Loading...</h1>;

//   // compute totals BEFORE coupon apply logic uses them
//   const addonsTotal = form.addons
//     .map((id) => addonsList.find((a) => a._id === id)?.price || 0)
//     .reduce((a, b) => a + b, 0);

//   const grandTotal =
//     Number(selectedPackage?.price || 0) + Number(addonsTotal || 0);
//   const finalTotal = Math.max(
//     Math.round((grandTotal - discount) * 100) / 100,
//     0,
//   );

//   // coupon application (uses currently computed grandTotal)
//   function applyCoupon() {
//     const code = (coupon || "").trim().toUpperCase();
//     if (!code) {
//       toast.error("Enter a coupon code");
//       return;
//     }
//     // Example coupon rules — change to real validation (API) as desired
//     for (let index = 0; index < coupans.length; index++) {
//       if (coupans[index].coupan === code) {
//         const amt = Math.round(grandTotal * coupans[index].percent) / 100;
//         setDiscount(amt);
//         setAppliedCoupon(code);
//         setCouponId(coupans[index]._id);
//         toast.success(`Coupon Applied: ${coupans[index].percent}% OFF`);
//         break;
//       } else {
//         setDiscount(0);
//         setAppliedCoupon(null);
//         setCouponId(null);
//         toast.error("Invalid Coupon");
//       }
//     }
//   }

//   function clearCoupon() {
//     setCoupon("");
//     setAppliedCoupon(null);
//     setDiscount(0);
//     setCouponId(null);
//   }

//   function validateStep1(form) {
//     const e = {};
//     if (!form.petName?.trim()) e.petName = "Pet name is required";
//     if (!form.type) e.type = "Pet type is required";
//     if (!form.breed?.trim()) e.breed = "Breed is required";
//     if (!form.age) e.age = "Age is required";
//     if (!form.weight) e.weight = "Weight is required";
//     if (!form.aggression) e.aggression = "Aggression level is required";
//     return e;
//   }

//   function validateStep2(form) {
//     // if (!form.mobile) return "Mobile number is required";
//     // if (form.mobile.length < 10) return "Enter valid mobile number";
//     // if (!form.address) return "Address is required";
//     // if (!form.pincode) return "Pincode is required";
//     // if (!form.date) return "Preferred date is required";
//     // if (!form.timeSlot) return "Time slot is required";
//     // if (!form.agreedToTerms) return "You must accept Terms & Conditions";
//     // return null;
//     const e = {};

//     if (!/^\d{10}$/.test(form.mobile || ""))
//       e.mobile = "Enter a valid 10-digit mobile number";

//     if (!form.address?.trim()) e.address = "Service address is required";

//     if (!form.pincode || form.pincode.length !== 6)
//       e.pincode = "Enter valid pincode";

//     if (!form.date) e.date = "Preferred date is required";
//     if (!form.timeSlot) e.timeSlot = "Select a time slot";

//     if (!form.agreedToTerms)
//       e.agreedToTerms = "You must accept terms & conditions";

//     // 🔥 GPS intentionally ignored
//     return e;
//   }
  

 
//   // capturing the current location: lat and lng

//   function captureExactLocation() {
//     if (!navigator.geolocation) {
//       toast.error("Location not supported on this browser");
//       return;
//     }

//     setLocLoading(true);

//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         const { latitude, longitude } = pos.coords;

//         setForm((f) => ({
//           ...f,
//           lat: latitude,
//           lng: longitude,
//         }));

//         toast.success("Exact location captured successfully");
//         setLocLoading(false);
//       },
//       (err) => {
//         toast.error("Unable to capture location. Please allow permission.");
//         setLocLoading(false);
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 10000,
//         maximumAge: 0,
//       },
//     );
//   }

//   let currDate = new Date();
//   currDate.setDate(currDate.getDate());
//   let minBookingDate = currDate.toLocaleDateString('en-CA').split('T')[0];
  
//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex justify-center items-center z-[999] p-2 md:p-4">
//       <div
//         className="
//           bg-white rounded-2xl w-full max-w-xl shadow-2xl relative
//           flex flex-col max-h-[90vh] overflow-hidden
//         "
//       >
//         {/* scroll area */}
//         <div className="overflow-y-auto px-5 py-6 md:px-8 md:py-8">
//           {/* close */}
//           <button
//             onClick={closeModal}
//             className="absolute top-3 right-3 md:top-4 md:right-4 text-gray-500 hover:text-gray-700 text-xl md:text-2xl"
//             aria-label="Close"
//           >
//             ✖
//           </button>

//           {/* header */}
//           <div className="text-center mb-6 md:mb-8">
//             <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
//               Book Grooming
//             </h2>
//             <p className="text-gray-500 text-sm mt-1">
//               {selectedPackage?.name}
//             </p>
//           </div>

//           {/* progress */}
//           <div className="flex items-center justify-between mb-8 md:mb-10 px-3 md:px-4">
//             {[1, 2, 3].map((s) => (
//               <div key={s} className="flex-1 flex items-center">
//                 <div
//                   className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-bold ${
//                     step >= s
//                       ? "bg-orange-600 text-white"
//                       : "bg-gray-200 text-gray-500"
//                   }`}
//                 >
//                   {s}
//                 </div>

//                 {s < 3 && (
//                   <div
//                     className={`flex-1 h-[2px] mx-1 md:mx-2 ${step > s ? "bg-orange-500" : "bg-gray-200"}`}
//                   ></div>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Step content */}
//           <div className="space-y-5">
//             {/* STEP 1 */}
//             {step === 1 && (
//               <div className="space-y-5">
//                 <div>
//                   <label className="text-sm font-semibold text-gray-600">
//                     Pet Name
//                   </label>
//                   <input
//                     type="text"
//                     value={form.petName}
//                     onChange={(e) => {
//                       setForm({ ...form, petName: e.target.value });
//                       setErrors((prev) => ({ ...prev, petName: undefined }));
//                     }}
//                     className={`w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50
//     ${errors.petName ? "border-red-500" : "border-gray-300"}
//     focus:ring-2 focus:ring-orange-500`}
//                   />
//                   {errors.petName && (
//                     <p className="text-xs text-red-600 mt-1">
//                       {errors.petName}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <label className="text-sm font-semibold text-gray-600">
//                     Pet Type
//                   </label>
//                   <select
//                     value={form.type}
//                     onChange={(e) => {
//                       setForm({ ...form, type: e.target.value });
//                       setErrors((prev) => ({ ...prev, type: undefined }));
//                     }}
//                     //className="w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500"
//                     className={`w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50
//     ${errors.type ? "border-red-500" : "border-gray-300"}
//     focus:ring-2 focus:ring-orange-500`}
//                   >
//                     <option value="">Select Type</option>
//                     <option value="Dog">Dog</option>
//                     <option value="Cat">Cat</option>
//                   </select>
//                   {errors.type && (
//                     <p className="text-xs text-red-600 mt-1">{errors.type}</p>
//                   )}
//                 </div>

//                 <div>
//                   <label className="text-sm font-semibold text-gray-600">
//                     Breed
//                   </label>
//                   <input
//                     type="text"
//                     value={form.breed}
//                     onChange={(e) => {
//                       setForm({ ...form, breed: e.target.value });
//                       setErrors((prev) => ({ ...prev, breed: undefined }));
//                     }}
//                     //className="w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500"

//                     className={`w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50
//     ${errors.breed ? "border-red-500" : "border-gray-300"}
//     focus:ring-2 focus:ring-orange-500`}
//                   />
//                   {errors.breed && (
//                     <p className="text-xs text-red-600 mt-1">{errors.breed}</p>
//                   )}
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="text-sm font-semibold text-gray-600">
//                       Age
//                     </label>
//                     <input
//                       type="number"
//                       value={form.age}
//                       onChange={(e) => {
//                         setForm({ ...form, age: e.target.value });
//                         setErrors((prev) => ({ ...prev, age: undefined }));
//                       }}
//                       //className="w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500"
//                       className={`w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50
//     ${errors.age ? "border-red-500" : "border-gray-300"}
//     focus:ring-2 focus:ring-orange-500`}
//                     />
//                     {errors.age && (
//                       <p className="text-xs text-red-600 mt-1">{errors.age}</p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="text-sm font-semibold text-gray-600">
//                       Weight (kg)
//                     </label>
//                     <input
//                       type="number"
//                       value={form.weight}
//                       onChange={(e) => {
//                         setForm({ ...form, weight: e.target.value });
//                         setErrors((prev) => ({ ...prev, weight: undefined }));
//                       }}
//                       //className="w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500"
//                       className={`w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50
//     ${errors.weight ? "border-red-500" : "border-gray-300"}
//     focus:ring-2 focus:ring-orange-500`}
//                     />
//                     {errors.weight && (
//                       <p className="text-xs text-red-600 mt-1">
//                         {errors.weight}
//                       </p>
//                     )}
//                   </div>
//                 </div>

//                 <div>
//                   <label className="text-sm font-semibold text-gray-600">
//                     Aggression Level
//                   </label>
//                   <select
//                     value={form.aggression}
//                     onChange={(e) => {
//                       setForm({ ...form, aggression: e.target.value });
//                       setErrors((prev) => ({ ...prev, aggression: undefined }));
//                     }}
//                     //className="w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500"
//                     className={`w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50
//     ${errors.aggression ? "border-red-500" : "border-gray-300"}
//     focus:ring-2 focus:ring-orange-500`}
//                   >
//                     <option value="">Select Level</option>
//                     <option value="1">1 - Low</option>
//                     <option value="2">2 - Medium</option>
//                     <option value="3">3 - High</option>
//                   </select>
//                   {errors.aggression && (
//                     <p className="text-xs text-red-600 mt-1">
//                       {errors.aggression}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <label className="text-sm font-semibold text-gray-600">
//                     Special Notes
//                   </label>
//                   <textarea
//                     rows="3"
//                     value={form.notes}
//                     onChange={(e) =>
//                       setForm({ ...form, notes: e.target.value })
//                     }
//                     placeholder="Behaviour notes, allergies, etc."
//                     className="w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500"
//                   />
//                 </div>
//               </div>
//             )}

//             {step === 2 && (
//               <div className="space-y-5">
//                 <div>
//                   <label className="text-sm font-semibold text-gray-600">
//                     Contact Number
//                   </label>
//                   <input
//                     type="tel"
//                     minLength="10"
//                     maxLength="10"
//                     pattern="[0-9]{10}"
//                     value={form.mobile}
//                     required
//                     title="Only digits are allowed."
//                     onChange={(e) =>{
//                       setForm({ ...form, mobile: e.target.value })
//                       setErrors((prev)=>({...prev, mobile:undefined}))}
//                     }
//                     className={`w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50
//     ${errors.mobile ? "border-red-500" : "border-gray-300"}
//     focus:ring-2 focus:ring-orange-500`}
//                     //className="w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500"
//                   />
//                   {errors.mobile && (
//                     <p className="text-xs text-red-600 mt-1">
//                       {errors.mobile}
//                     </p>
//                   )}
                  
//                 </div>

//                 {/* address: input in form*/}
//                 {/* <div>
//       <label className="text-sm font-semibold text-gray-600">Address</label>
//       <input
//         type="text"
//         value={form.address}
//         onChange={(e) => setForm({ ...form, address: e.target.value })}
//         className="w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500"
//       />
//     </div> */}
//                 {/* <div>
//                   <label className="text-sm font-semibold text-gray-600">
//                     Service Address
//                   </label>

//                   <div className="flex gap-2 mt-1">
//                     <input
//                       type="text"
//                       value={form.address}
//                       onChange={(e) =>
//                         setForm({ ...form, address: e.target.value })
//                       }
//                       placeholder="House no, area, city"
//                       className="flex-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500"
//                     />

//                     <button
//                       type="button"
//                       onClick={captureExactLocation}
//                       disabled={locLoading}
//                       className="px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 disabled:opacity-50"
//                     >
//                       {locLoading ? "Detecting..." : "Get exact location"}
//                     </button>
//                   </div>
//                 </div>

//                 <div> */}
//                 <div>
//                   <label className="text-sm font-semibold text-gray-600">
//                     Service Address
//                   </label>

//                   <input
//                     type="text"
//                     value={form.address}
//                     onChange={(e) =>{
//                       setForm({ ...form, address: e.target.value })
//                        setErrors((prev)=>({...prev, address:undefined}))}
//                     }
//                     placeholder="House no, area, city"
//                     //className="w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500"
//                   className={`w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50
//     ${errors.address ? "border-red-500" : "border-gray-300"}
//     focus:ring-2 focus:ring-orange-500`}

//                   />
//                   {errors.address && (
//                     <p className="text-xs text-red-600 mt-1">
//                       {errors.address}
//                     </p>
//                   )}

//                   {/* GPS helper row */}
//                   <div className="mt-2 flex items-center justify-between">
//                     <p className="text-xs text-gray-500">
//                       Helps our groomer reach you easily
//                     </p>

//                     {!form.lat ? (
//                       <button
//                         type="button"
//                         onClick={captureExactLocation}
//                         disabled={locLoading}
//                         className="
//           flex items-center gap-1.5 
//           text-xs font-medium text-orange-600 
//           hover:text-orange-700
//           disabled:opacity-50
//         "
//                       >
//                         <MapPin size={14} />
//                         {locLoading
//                           ? "Detecting..."
//                           : "Add live location (optional)"}
//                       </button>
//                     ) : (
//                       <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
//                         <CheckCircle size={14} />
//                         Location added
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 {/*pincode input field*/}
//                 <div>
//                   <label className="text-sm font-semibold text-gray-600">
//                     Pincode
//                   </label>
//                   <input
//                     type="number"
//                     required
//                     value={form.pincode}
//                     onChange={(e) =>{
//                       setForm({ ...form, pincode: e.target.value })
//                        setErrors((prev)=>({...prev, address:undefined}))}
//                     }
//                     //className="w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500"
//                   className={`w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50
//     ${errors.pincode ? "border-red-500" : "border-gray-300"}
//     focus:ring-2 focus:ring-orange-500`}

//                   />
//                   {errors.pincode && (
//                     <p className="text-xs text-red-600 mt-1">
//                       {errors.pincode}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <label className="text-sm font-semibold text-gray-600">
//                     Preferred Date
//                   </label>
//                   <input
//                     type="date"
//                     min={minBookingDate}
//                     value={form.date}
//                     onChange={(e) => setForm({ ...form, date: e.target.value })}
//                     className="w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500"
//                   />
//                 </div>

//                 {/* <div>
//                   <label className="text-sm font-semibold text-gray-600">
//                     Preferred Time Slot
//                   </label>
//                   <select
//                     value={form.timeSlot}
//                     onChange={(e) =>
//                       setForm({ ...form, timeSlot: e.target.value })
//                     }
//                     className="w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500"
//                   >
//                     <option value="">Select Slot</option>
//                     <option>9 AM - 11 PM</option>
//                     <option>12 PM - 2 PM</option>
//                     <option>3 PM - 5 PM</option>
//                     <option>5 PM - 7 PM</option>
//                   </select>
//                 </div> */}
//                 <div>
//   <label className="text-sm font-semibold text-gray-600">
//     Preferred Time Slot
//   </label>

//   {!form.date ? (
//     <p className="text-xs text-gray-400 mt-2">
//       Please select a date first to see available slots.
//     </p>
//   ) : (
//     <div className="grid grid-cols-2 gap-3 mt-2">
//       {slots.map((slot) => {
      
//         const count = slotCounts?.data?.[slot] || 0;
//         const isFull = count >= MAX_PER_SLOT;
//         const isSelected = form.timeSlot === slot;

//         return (
//           <button
//             key={slot}
//             type="button"
//             disabled={isFull}
//             onClick={() => {
//               if (!isFull) {
//                 setForm({ ...form, timeSlot: slot });
//                 setErrors((prev) => ({ ...prev, timeSlot: undefined }));
//               }
//             }}
//             className={`
//               relative px-4 py-3 rounded-xl border text-sm font-medium transition
//               ${isFull
//                 ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through"
//                 : isSelected
//                 ? "bg-orange-600 text-white border-orange-600 shadow"
//                 : "bg-white text-gray-700 border-gray-300 hover:border-orange-400"
//               }
//             `}
//           >
//             {slot}
//             {isFull && (
//               <span className="block text-xs font-normal text-red-400 no-underline" style={{ textDecoration: "none" }}>
//                 Fully Booked
//               </span>
//             )}
//             {!isFull && (
//               <span className="block text-xs font-normal text-gray-400">
//                 {MAX_PER_SLOT - count} spot{MAX_PER_SLOT - count !== 1 ? "s" : ""} left
//               </span>
//             )}
//           </button>
//         );
//       })}
//     </div>
//   )}

//   {errors.timeSlot && (
//     <p className="text-xs text-red-600 mt-1">{errors.timeSlot}</p>
//   )}
// </div>

//                 {/* ---------------- ALWAYS VISIBLE TERMS & CONDITIONS ---------------- */}
//                 <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
//                   <h3 className="text-lg font-bold text-gray-900 mb-3">
//                     Terms & Conditions
//                   </h3>

//                   <div className="space-y-2 text-sm text-gray-700 leading-relaxed">
//                     {termsText.map((t, i) => (
//                       <p key={i}>• {t}</p>
//                     ))}
//                   </div>

//                   <label className="flex items-center gap-3 mt-4">
//                     <input
//                       type="checkbox"
//                       checked={form.agreedToTerms}
//                       required
//                       onChange={(e) =>
//                         setForm({ ...form, agreedToTerms: e.target.checked })
//                       }
//                     />
//                     <span className="text-gray-700 text-sm">
//                       I agree to the Terms & Conditions
//                     </span>
//                   </label>
//                 </div>
//               </div>
//             )}

//             {/* STEP 3 */}
//             {step === 3 && (
//               <div className="space-y-6 bg-gray-50 p-5 rounded-2xl border">
//                 {/* package info */}
//                 <div className="bg-white p-4 rounded-xl border shadow-sm">
//                   <h4 className="text-lg font-semibold flex justify-between text-gray-900">
//                     {selectedPackage?.name}
//                     <span className="text-orange-600 font-bold">
//                       ₹{selectedPackage?.price}
//                     </span>
//                   </h4>
//                 </div>

//                 {/* pet details */}
//                 <div className="bg-white p-4 rounded-xl border shadow-sm space-y-1">
//                   <h4 className="text-lg font-semibold text-gray-900">
//                     Pet Details
//                   </h4>
//                   <p>
//                     <strong>Name:</strong> {form.petName}
//                   </p>
//                   <p>
//                     <strong>Type:</strong> {form.type}
//                   </p>
//                   <p>
//                     <strong>Breed:</strong> {form.breed}
//                   </p>
//                   <p>
//                     <strong>Age:</strong> {form.age}
//                   </p>
//                   <p>
//                     <strong>Weight:</strong> {form.weight} kg
//                   </p>
//                   <p>
//                     <strong>Aggression Level:</strong> {form.aggression || "—"}
//                   </p>

//                   <hr className="my-2" />
//                   <p>
//                     <strong>Contact:</strong> {form.mobile}
//                   </p>
//                   <p>
//                     <strong>Address:</strong> {form.address}
//                   </p>
//                   <p>
//                     <strong>Date:</strong> {form.date}
//                   </p>
//                   <p>
//                     <strong>Time Slot:</strong> {form.timeSlot}
//                   </p>
//                 </div>

//                 {/* addons */}
//                 <div className="bg-white p-4 rounded-xl border shadow-sm">
//                   <h4 className="text-lg font-semibold text-gray-900 mb-2">
//                     Add-Ons
//                   </h4>
//                   <div className="space-y-2">
//                     {addonsList.map((addon) => {
//                       const isSelected = form.addons.includes(addon._id);
//                       return (
//                         <label
//                           key={addon._id}
//                           className={`flex justify-between items-center p-3 border rounded-lg ${isSelected ? "border-orange-500 bg-orange-50" : "hover:border-orange-400"}`}
//                         >
//                           <div className="flex items-center gap-3">
//                             <input
//                               type="checkbox"
//                               checked={isSelected}
//                               onChange={() =>
//                                 setForm((prev) => ({
//                                   ...prev,
//                                   addons: prev.addons.includes(addon._id)
//                                     ? prev.addons.filter(
//                                         (id) => id !== addon._id,
//                                       )
//                                     : [...prev.addons, addon._id],
//                                 }))
//                               }
//                             />
//                             <span className="text-gray-800">{addon.name}</span>
//                           </div>

//                           <span className="text-orange-600 font-semibold">
//                             ₹{addon.price}
//                           </span>
//                         </label>
//                       );
//                     })}
//                     {form.addons.length === 0 && (
//                       <p className="text-gray-500 text-sm">
//                         No add-ons selected.
//                       </p>
//                     )}
//                   </div>
//                 </div>

//                 {/* coupon responsive */}
//                 <div className="bg-white p-4 rounded-xl border shadow-sm space-y-3">
//                   <h4 className="text-lg font-semibold text-gray-900">
//                     Apply Coupon
//                   </h4>

//                   <div className="flex flex-col sm:flex-row gap-3">
//                     <input
//                       type="text"
//                       value={coupon}
//                       onChange={(e) => setCoupon(e.target.value)}
//                       placeholder="Enter coupon code"
//                       className="flex-1 px-4 py-2 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500"
//                     />

//                     <div className="flex gap-2">
//                       <button
//                         onClick={applyCoupon}
//                         disabled={appliedCoupon !== null}
//                         className={`px-4 py-2 rounded-xl bg-orange-600 text-white font-medium hover:bg-orange-700 disabled:opacity-50 ${appliedCoupon ? "cursor-not-allowed" : ""}`}
//                       >
//                         {appliedCoupon ? "Applied" : "Apply"}
//                       </button>

//                       {appliedCoupon && (
//                         <button
//                           onClick={clearCoupon}
//                           className="px-4 py-2 rounded-xl bg-gray-100 text-gray-800 hover:bg-gray-200"
//                         >
//                           Clear
//                         </button>
//                       )}
//                     </div>
//                   </div>

//                   {appliedCoupon && (
//                     <div className="text-sm text-green-700">
//                       Coupon <strong>{appliedCoupon}</strong> applied — discount
//                       ₹{discount.toFixed(0)}
//                     </div>
//                   )}
//                 </div>

//                 {/* price breakdown */}
//                 <div className="bg-white p-4 rounded-xl border shadow-sm space-y-3">
//                   <h4 className="text-lg font-semibold text-gray-900">
//                     Price Breakdown
//                   </h4>

//                   <div className="flex justify-between text-gray-700">
//                     <span>Base Package</span>
//                     <span className="font-semibold">
//                       ₹{selectedPackage?.price}
//                     </span>
//                   </div>
//                   <div className="flex justify-between text-gray-700">
//                     <span>Add-ons Total</span>
//                     <span className="font-semibold">₹{addonsTotal}</span>
//                   </div>
//                   <div className="flex justify-between text-gray-700">
//                     <span>Discount</span>
//                     <span className="font-semibold text-green-600">
//                       -₹{discount.toFixed(0)}
//                     </span>
//                   </div>

//                   <hr />

//                   <div className="flex justify-between text-lg font-bold">
//                     <span>Total Payable</span>
//                     <span className="text-orange-600">
//                       ₹{finalTotal.toFixed(0)}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* footer */}
//         <div className="px-5 py-4 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.06)] rounded-b-2xl flex justify-between items-center">
//           {step > 1 ? (
//             <button
//               onClick={() => setStep(step - 1)}
//               className="px-5 py-2.5 w-full max-w-[120px] rounded-full bg-gray-100 hover:bg-gray-200 font-medium text-sm"
//             >
//               Back
//             </button>
//           ) : (
//             <div />
//           )}

//           {step < 3 ? (
//             <button
//               onClick={handleNext}
//               className="px-7 py-2.5 w-full max-w-[150px] rounded-full bg-orange-600 text-white font-semibold hover:bg-orange-700"
//             >
//               Next
//             </button>
//           ) : (
//             <ProtectedRoute>
//               <button
//                 onClick={handleSubmit}
//                 className="px-7 py-2.5 w-full max-w-[180px] rounded-full bg-orange-600 text-white font-semibold hover:bg-orange-700"
//               >
//                 Confirm Booking
//               </button>
//             </ProtectedRoute>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

//------------------------------------------------------------------------------ version 2
// import { useContext, useEffect, useRef, useState } from "react";
// import { GlobalContext } from "../Store/Context";
// import { CreateBooking } from "../Features/Booking/mutationFunction";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router";
// import { GetAddOns } from "../Features/Packages/queryFunction";
// import { GetAllPackages, GetSlotAvailability } from "../Features/Booking/queryFunction";
// import ProtectedRoute from "./Protect";
// import { CheckCircle, MapPin, Trash2, PlusCircle, ChevronDown, ChevronUp } from "lucide-react";
// import queryClient from "../Store/queryClient";

// // ─── constants ────────────────────────────────────────────────────────────────

// const SLOTS       = ["9 AM - 11 PM", "12 PM - 2 PM", "3 PM - 5 PM", "5 PM - 7 PM"];
// const MAX_PER_SLOT = 3;

// const TERMS = [
//   "Customer must ensure pet is healthy and free from contagious conditions.",
//   "Cancellation within 2 hours may incur charges of ₹150 as per company policy.",
//   "Payment is due on completion unless prepaid online.",
//   "It is not possible to operate trimmers/clippers on knotted and matted coats, so a zero or uneven haircut may result. If your pet gets aggressive, please assist our professionals. We don't charge for free services. If anything is skipped due to aggression or safety concerns, no refunds will be generated. A fresh toothbrush costs ₹100/piece and will be handed over to you.",
// ];

// // ─── helpers ──────────────────────────────────────────────────────────────────

// function emptyPet(productId = "", packageName = "", packagePrice = 0) {
//   return {
//     _key:         Math.random().toString(36).slice(2), // stable React key, never sent to API
//     petName:      "",
//     type:         "",
//     breed:        "",
//     age:          "",
//     weight:       "",
//     aggression:   "",
//     notes:        "",
//     productId,
//     packageName,
//     packagePrice,
//     addons:       [],
//   };
// }

// function validatePet(pet) {
//   const e = {};
//   if (!pet.petName?.trim())  e.petName    = "Pet name is required";
//   if (!pet.type)             e.type       = "Pet type is required";
//   if (!pet.breed?.trim())    e.breed      = "Breed is required";
//   if (!pet.age)              e.age        = "Age is required";
//   if (!pet.weight)           e.weight     = "Weight is required";
//   if (!pet.aggression)       e.aggression = "Aggression level is required";
//   if (!pet.productId)        e.productId  = "Please select a package for this pet";
//   return e;
// }

// function validateStep2(f) {
//   const e = {};
//   if (!/^\d{10}$/.test(f.mobile || ""))          e.mobile        = "Enter a valid 10-digit mobile number";
//   if (!f.address?.trim())                         e.address       = "Service address is required";
//   if (!f.pincode || String(f.pincode).length !== 6) e.pincode     = "Enter a valid 6-digit pincode";
//   if (!f.date)                                    e.date          = "Preferred date is required";
//   if (!f.timeSlot)                                e.timeSlot      = "Select a time slot";
//   if (!f.agreedToTerms)                           e.agreedToTerms = "You must accept Terms & Conditions";
//   return e;
// }

// function inputCls(hasError) {
//   return `w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500 ${
//     hasError ? "border-red-500" : "border-gray-300"
//   }`;
// }

// function Field({ label, error, children }) {
//   return (
//     <div>
//       <label className="text-sm font-semibold text-gray-600">{label}</label>
//       {children}
//       {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
//     </div>
//   );
// }

// // ─── BookingModal ─────────────────────────────────────────────────────────────

// export default function BookingModal() {
//   const navigate = useNavigate();
//   const [locLoading, setLocLoading] = useState(false);

//   const { setShowBookingModal, selectedPackage, setSelectedPackage, form, setForm } =
//     useContext(GlobalContext);

//   // ── remote data ──────────────────────────────────────────────────────────────

//   // Addons + coupons (existing query, unchanged)
//   const { data: addonsData, isPending: addonsPending } = useQuery({
//     queryKey: ["addons"],
//     queryFn:  GetAddOns,
//   });
//   const addonsList = addonsData?.data    ?? [];
//   const coupans    = addonsData?.coupans ?? [];

//   // Packages — fetched from /api/v1/packages/:city (separate from addons)
//   const { data: packagesList = [], isPending: packagesPending } = useQuery({
//     queryKey: ["packages"],
//     queryFn:  GetAllPackages,
//   });

//   // Slot availability — keyed on date
//   const { data: slotCounts } = useQuery({
//     queryKey: ["slotAvailability", form.date],
//     queryFn:  () => GetSlotAvailability(form.date, pets[0]?.productId),
//     enabled:  !!form.date,
//   });

//   // ── pets state ───────────────────────────────────────────────────────────────

//   const [pets, setPets] = useState(() => [
//     emptyPet(
//       selectedPackage?._id    ?? "",
//       selectedPackage?.name   ?? "",
//       Number(selectedPackage?.price) || 0,
//     ),
//   ]);
//   const [petErrors,   setPetErrors]   = useState([{}]);
//   const [expandedIdx, setExpandedIdx] = useState(0);

//   // ── step / shared errors ─────────────────────────────────────────────────────

//   const [step,        setStep]        = useState(1);
//   const [step2Errors, setStep2Errors] = useState({});

//   // ── coupon state ─────────────────────────────────────────────────────────────

//   const [coupon,        setCoupon]        = useState("");
//   const [appliedCoupon, setAppliedCoupon] = useState(null);
//   const [discount,      setDiscount]      = useState(0);
//   const [couponId,      setCouponId]      = useState(null);

//   // keep coupon data mirrored in the shared `form` so handleSubmit sees it
//   useEffect(() => {
//     setForm((f) => ({ ...f, discount, couponId }));
//   }, [couponId, discount]);

//   // ── min date ─────────────────────────────────────────────────────────────────

//   const minBookingDate = new Date().toLocaleDateString("en-CA").split("T")[0];

//   // ── mutation — one call per pet ───────────────────────────────────────────────

//   const successCount = useRef(0);
//   const errorCount   = useRef(0);
//   const totalPets    = useRef(0);

//   const { mutate } = useMutation({
//     mutationFn: CreateBooking,
//     onSuccess: () => {
//       successCount.current += 1;
//       queryClient.invalidateQueries(["slotAvailability", form.date]);
//       if (successCount.current + errorCount.current === totalPets.current) finishAll();
//     },
//     onError: () => {
//       errorCount.current += 1;
//       if (successCount.current + errorCount.current === totalPets.current) finishAll();
//     },
//   });

//   function finishAll() {
//     const s = successCount.current;
//     const e = errorCount.current;
//     setShowBookingModal(false);
//     setSelectedPackage(null);
//     if (s > 0 && e === 0) {
//       toast.success(`${s} booking${s > 1 ? "s" : ""} created successfully!`);
//       navigate("/booking-success");
//     } else if (s > 0) {
//       toast.success(`${s} booking${s > 1 ? "s" : ""} created. ${e} failed — contact Petlinc for help.`);
//       navigate("/booking-success");
//     } else {
//       toast.error("Booking failed. Please contact the Petlinc team.");
//       navigate("/");
//     }
//   }

//   // ── pet list handlers ─────────────────────────────────────────────────────────

//   function updatePet(idx, field, value) {
//     setPets((prev) => prev.map((p, i) => (i === idx ? { ...p, [field]: value } : p)));
//     setPetErrors((prev) => prev.map((e, i) => (i === idx ? { ...e, [field]: undefined } : e)));
//   }

//   function addPet() {
//     setPets((prev) => [...prev, emptyPet()]);
//     setPetErrors((prev) => [...prev, {}]);
//     setExpandedIdx(pets.length); // open the newly added card
//   }

//   function removePet(idx) {
//     if (pets.length === 1) return; // always keep at least 1
//     setPets((prev)      => prev.filter((_, i) => i !== idx));
//     setPetErrors((prev) => prev.filter((_, i) => i !== idx));
//     setExpandedIdx((cur) => (cur >= idx && cur > 0 ? cur - 1 : cur));
//   }

//   // ── navigation ────────────────────────────────────────────────────────────────

//   function handleNext() {
//     if (step === 1) {
//       const allErrors = pets.map(validatePet);
//       const hasErrors = allErrors.some((e) => Object.keys(e).length > 0);
//       if (hasErrors) {
//         setPetErrors(allErrors);
//         setExpandedIdx(allErrors.findIndex((e) => Object.keys(e).length > 0));
//         return;
//       }
//     }
//     if (step === 2) {
//       const e = validateStep2(form);
//       if (Object.keys(e).length > 0) { setStep2Errors(e); return; }
//       setStep2Errors({});
//     }
//     setStep((s) => s + 1);
//   }

//   function handleSubmit() {
//     if (!form.agreedToTerms) {
//       toast.error("Please accept Terms & Conditions before confirming.");
//       return;
//     }
//     const city = localStorage.getItem("currentCity");

//     successCount.current = 0;
//     errorCount.current   = 0;
//     totalPets.current    = pets.length;

//     pets.forEach((pet) => {
//       mutate({
//         // pet-specific fields
//         productId:  pet.productId,
//         petName:    pet.petName,
//         type:       pet.type,
//         breed:      pet.breed,
//         age:        pet.age,
//         weight:     pet.weight,
//         aggression: pet.aggression,
//         notes:      pet.notes,
//         // shared fields (same for all pets in this booking session)
//         mobile:        form.mobile,
//         address:       form.address,
//         pincode:       form.pincode,
//         date:          form.date,
//         timeSlot:      form.timeSlot,
//         lat:           form.lat || 0,
//         lng:           form.lng || 0,
//         agreedToTerms: form.agreedToTerms,
//         addons:        form.addons,
//         coupon:        appliedCoupon || null,
//         discount:      discount      || 0,
//         couponId:      couponId      || null,
//         city,
//       });
//     });
//   }

//   // ── geolocation ───────────────────────────────────────────────────────────────

//   function captureExactLocation() {
//     if (!navigator.geolocation) { toast.error("Location not supported on this browser"); return; }
//     setLocLoading(true);
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         setForm((f) => ({ ...f, lat: pos.coords.latitude, lng: pos.coords.longitude }));
//         toast.success("Exact location captured successfully");
//         setLocLoading(false);
//       },
//       () => { toast.error("Unable to capture location. Please allow permission."); setLocLoading(false); },
//       { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
//     );
//   }

//   // ── coupon helpers ────────────────────────────────────────────────────────────

//   // grandTotal needed here so coupon % is applied to the correct base
//   const petsPackageTotal = pets.reduce((sum, p) => sum + (Number(p.packagePrice) || 0), 0);
//   const addonsTotal      = form.addons
//     .map((id) => addonsList.find((a) => a._id === id)?.price || 0)
//     .reduce((a, b) => a + b, 0);
//   const grandTotal = petsPackageTotal + addonsTotal;
//   const finalTotal = Math.max(Math.round((grandTotal - discount) * 100) / 100, 0);

//   function applyCoupon() {
//     const code = (coupon || "").trim().toUpperCase();
//     if (!code) { toast.error("Enter a coupon code"); return; }
//     const match = coupans.find((c) => c.coupan === code);
//     if (match) {
//       const amt = Math.round(grandTotal * match.percent) / 100;
//       setDiscount(amt); setAppliedCoupon(code); setCouponId(match._id);
//       toast.success(`Coupon applied: ${match.percent}% OFF`);
//     } else {
//       setDiscount(0); setAppliedCoupon(null); setCouponId(null);
//       toast.error("Invalid coupon");
//     }
//   }

//   function clearCoupon() { setCoupon(""); setAppliedCoupon(null); setDiscount(0); setCouponId(null); }

//   function closeModal() { setShowBookingModal(false); setSelectedPackage(null); }

//   // ── loading guard ─────────────────────────────────────────────────────────────

//   if (addonsPending || packagesPending) {
//     return (
//       <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex justify-center items-center z-[999]">
//         <div className="bg-white rounded-2xl p-10 text-center">
//           <p className="text-gray-600 animate-pulse">Loading packages…</p>
//         </div>
//       </div>
//     );
//   }

//   // ─────────────────────────────────────────────────────────────────────────────
//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex justify-center items-center z-[999] p-2 md:p-4">
//       <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl relative flex flex-col max-h-[90vh] overflow-hidden">

//         {/* scrollable body */}
//         <div className="overflow-y-auto px-5 py-6 md:px-8 md:py-8">

//           {/* close button */}
//           <button onClick={closeModal}
//             className="absolute top-3 right-3 md:top-4 md:right-4 text-gray-500 hover:text-gray-700 text-xl md:text-2xl"
//             aria-label="Close">
//             ✖
//           </button>

//           {/* header */}
//           <div className="text-center mb-6">
//             <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Book Grooming</h2>
//             <p className="text-gray-500 text-sm mt-1">
//               {pets.length > 1
//                 ? `${pets.length} pets`
//                 : pets[0]?.petName || selectedPackage?.name || ""}
//             </p>
//           </div>

//           {/* stepper */}
//           <div className="flex items-center justify-between mb-2 px-3 md:px-4">
//             {[1, 2, 3].map((s) => (
//               <div key={s} className="flex-1 flex items-center">
//                 <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-bold ${step >= s ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-500"}`}>
//                   {s}
//                 </div>
//                 {s < 3 && (
//                   <div className={`flex-1 h-[2px] mx-1 md:mx-2 ${step > s ? "bg-orange-500" : "bg-gray-200"}`} />
//                 )}
//               </div>
//             ))}
//           </div>
//           <div className="flex justify-between text-xs text-gray-400 mb-7 px-1">
//             <span className={step === 1 ? "text-orange-600 font-semibold" : ""}>Pets</span>
//             <span className={step === 2 ? "text-orange-600 font-semibold" : ""}>Schedule</span>
//             <span className={step === 3 ? "text-orange-600 font-semibold" : ""}>Review</span>
//           </div>

//           {/* ── STEP 1 — Pets ──────────────────────────────────────────────── */}
//           {step === 1 && (
//             <div className="space-y-4">
//               <p className="text-sm text-gray-500">
//                 Add one or more pets. Each pet can have its own grooming package.
//               </p>

//               {pets.map((pet, idx) => (
//                 <PetCard
//                   key={pet._key}
//                   idx={idx}
//                   pet={pet}
//                   errors={petErrors[idx] || {}}
//                   isExpanded={expandedIdx === idx}
//                   onToggle={() => setExpandedIdx(expandedIdx === idx ? -1 : idx)}
//                   onUpdate={(field, value) => updatePet(idx, field, value)}
//                   onRemove={() => removePet(idx)}
//                   canRemove={pets.length > 1}
//                   packagesList={packagesList}
//                 />
//               ))}

//               <button onClick={addPet}
//                 className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-orange-300 rounded-xl text-orange-600 hover:border-orange-500 hover:bg-orange-50 font-medium text-sm transition">
//                 <PlusCircle size={18} />
//                 Add Another Pet
//               </button>
//             </div>
//           )}

//           {/* ── STEP 2 — Schedule ──────────────────────────────────────────── */}
//           {step === 2 && (
//             <div className="space-y-5">

//               <Field label="Contact Number" error={step2Errors.mobile}>
//                 <input type="tel" minLength="10" maxLength="10" value={form.mobile}
//                   onChange={(e) => { setForm({ ...form, mobile: e.target.value }); setStep2Errors((p) => ({ ...p, mobile: undefined })); }}
//                   className={inputCls(step2Errors.mobile)} />
//               </Field>

//               {/* Address */}
//               <div>
//                 <label className="text-sm font-semibold text-gray-600">Service Address</label>
//                 <input type="text" value={form.address} placeholder="House no, area, city"
//                   onChange={(e) => { setForm({ ...form, address: e.target.value }); setStep2Errors((p) => ({ ...p, address: undefined })); }}
//                   className={inputCls(step2Errors.address)} />
//                 {step2Errors.address && <p className="text-xs text-red-600 mt-1">{step2Errors.address}</p>}
//                 <div className="mt-2 flex items-center justify-between">
//                   <p className="text-xs text-gray-500">Helps our groomer reach you easily</p>
//                   {!form.lat ? (
//                     <button type="button" onClick={captureExactLocation} disabled={locLoading}
//                       className="flex items-center gap-1.5 text-xs font-medium text-orange-600 hover:text-orange-700 disabled:opacity-50">
//                       <MapPin size={14} />
//                       {locLoading ? "Detecting…" : "Add live location (optional)"}
//                     </button>
//                   ) : (
//                     <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
//                       <CheckCircle size={14} /> Location added
//                     </span>
//                   )}
//                 </div>
//               </div>

//               <Field label="Pincode" error={step2Errors.pincode}>
//                 <input type="number" value={form.pincode}
//                   onChange={(e) => { setForm({ ...form, pincode: e.target.value }); setStep2Errors((p) => ({ ...p, pincode: undefined })); }}
//                   className={inputCls(step2Errors.pincode)} />
//               </Field>

//               <Field label="Preferred Date" error={step2Errors.date}>
//                 <input type="date" min={minBookingDate} value={form.date}
//                   onChange={(e) => { setForm({ ...form, date: e.target.value, timeSlot: "" }); setStep2Errors((p) => ({ ...p, date: undefined })); }}
//                   className={inputCls(step2Errors.date)} />
//               </Field>

//               {/* Slots */}
//               <div>
//                 <label className="text-sm font-semibold text-gray-600">Preferred Time Slot</label>
//                 {!form.date ? (
//                   <p className="text-xs text-gray-400 mt-2">Select a date first to see available slots.</p>
//                 ) : (
//                   <div className="grid grid-cols-2 gap-3 mt-2">
//                     {SLOTS.map((slot) => {
//                       const count      = slotCounts?.data?.[slot] || 0;
//                       const isFull     = count >= MAX_PER_SLOT;
//                       const isSelected = form.timeSlot === slot;
//                       return (
//                         <button key={slot} type="button" disabled={isFull}
//                           onClick={() => { if (!isFull) { setForm({ ...form, timeSlot: slot }); setStep2Errors((p) => ({ ...p, timeSlot: undefined })); } }}
//                           className={`relative px-4 py-3 rounded-xl border text-sm font-medium transition
//                             ${isFull
//                               ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through"
//                               : isSelected
//                               ? "bg-orange-600 text-white border-orange-600 shadow"
//                               : "bg-white text-gray-700 border-gray-300 hover:border-orange-400"
//                             }`}
//                         >
//                           {slot}
//                           {isFull
//                             ? <span className="block text-xs font-normal text-red-400" style={{ textDecoration: "none" }}>Fully Booked</span>
//                             : <span className="block text-xs font-normal opacity-60">{MAX_PER_SLOT - count} spot{MAX_PER_SLOT - count !== 1 ? "s" : ""} left</span>
//                           }
//                         </button>
//                       );
//                     })}
//                   </div>
//                 )}
//                 {step2Errors.timeSlot && <p className="text-xs text-red-600 mt-1">{step2Errors.timeSlot}</p>}
//               </div>

//               {/* T&C */}
//               <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
//                 <h3 className="text-lg font-bold text-gray-900 mb-3">Terms & Conditions</h3>
//                 <div className="space-y-2 text-sm text-gray-700 leading-relaxed">
//                   {TERMS.map((t, i) => <p key={i}>• {t}</p>)}
//                 </div>
//                 <label className="flex items-center gap-3 mt-4">
//                   <input type="checkbox" checked={form.agreedToTerms}
//                     onChange={(e) => { setForm({ ...form, agreedToTerms: e.target.checked }); setStep2Errors((p) => ({ ...p, agreedToTerms: undefined })); }} />
//                   <span className="text-gray-700 text-sm">I agree to the Terms & Conditions</span>
//                 </label>
//                 {step2Errors.agreedToTerms && <p className="text-xs text-red-600 mt-1">{step2Errors.agreedToTerms}</p>}
//               </div>
//             </div>
//           )}

//           {/* ── STEP 3 — Review ────────────────────────────────────────────── */}
//           {step === 3 && (
//             <div className="space-y-6 bg-gray-50 p-5 rounded-2xl border">

//               {/* Pets & packages */}
//               <div className="bg-white p-4 rounded-xl border shadow-sm">
//                 <h4 className="text-lg font-semibold text-gray-900 mb-3">Pets & Packages</h4>
//                 {pets.map((pet, i) => (
//                   <div key={pet._key} className="flex justify-between items-start border-b last:border-0 pb-2 last:pb-0 mb-2 last:mb-0">
//                     <div>
//                       <p className="font-medium text-gray-800">
//                         {pet.petName}{" "}
//                         <span className="text-gray-400 text-xs">({pet.type} · {pet.breed})</span>
//                       </p>
//                       <p className="text-xs text-gray-500">{pet.packageName || "—"}</p>
//                     </div>
//                     <span className="text-orange-600 font-bold">₹{pet.packagePrice || 0}</span>
//                   </div>
//                 ))}
//               </div>

//               {/* Appointment details */}
//               <div className="bg-white p-4 rounded-xl border shadow-sm space-y-1 text-sm text-gray-700">
//                 <h4 className="text-lg font-semibold text-gray-900 mb-2">Appointment Details</h4>
//                 <p><strong>Contact:</strong> {form.mobile}</p>
//                 <p><strong>Address:</strong> {form.address}</p>
//                 <p><strong>Pincode:</strong> {form.pincode}</p>
//                 <p><strong>Date:</strong> {form.date}</p>
//                 <p><strong>Time Slot:</strong> {form.timeSlot}</p>
//               </div>

//               {/* Add-ons */}
//               <div className="bg-white p-4 rounded-xl border shadow-sm">
//                 <h4 className="text-lg font-semibold text-gray-900 mb-2">
//                   Add-Ons{" "}
//                   <span className="text-xs text-gray-400 font-normal">(shared across all pets)</span>
//                 </h4>
//                 <div className="space-y-2">
//                   {addonsList.map((addon) => {
//                     const isSelected = form.addons.includes(addon._id);
//                     return (
//                       <label key={addon._id}
//                         className={`flex justify-between items-center p-3 border rounded-lg cursor-pointer ${isSelected ? "border-orange-500 bg-orange-50" : "hover:border-orange-400"}`}>
//                         <div className="flex items-center gap-3">
//                           <input type="checkbox" checked={isSelected}
//                             onChange={() => setForm((prev) => ({
//                               ...prev,
//                               addons: prev.addons.includes(addon._id)
//                                 ? prev.addons.filter((id) => id !== addon._id)
//                                 : [...prev.addons, addon._id],
//                             }))} />
//                           <span className="text-gray-800 text-sm">{addon.name}</span>
//                         </div>
//                         <span className="text-orange-600 font-semibold">₹{addon.price}</span>
//                       </label>
//                     );
//                   })}
//                   {form.addons.length === 0 && <p className="text-gray-500 text-sm">No add-ons selected.</p>}
//                 </div>
//               </div>

//               {/* Coupon */}
//               <div className="bg-white p-4 rounded-xl border shadow-sm space-y-3">
//                 <h4 className="text-lg font-semibold text-gray-900">Apply Coupon</h4>
//                 <div className="flex flex-col sm:flex-row gap-3">
//                   <input type="text" value={coupon} onChange={(e) => setCoupon(e.target.value)}
//                     placeholder="Enter coupon code"
//                     className="flex-1 px-4 py-2 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500" />
//                   <div className="flex gap-2">
//                     <button onClick={applyCoupon} disabled={!!appliedCoupon}
//                       className="px-4 py-2 rounded-xl bg-orange-600 text-white font-medium hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed">
//                       {appliedCoupon ? "Applied" : "Apply"}
//                     </button>
//                     {appliedCoupon && (
//                       <button onClick={clearCoupon}
//                         className="px-4 py-2 rounded-xl bg-gray-100 text-gray-800 hover:bg-gray-200">
//                         Clear
//                       </button>
//                     )}
//                   </div>
//                 </div>
//                 {appliedCoupon && (
//                   <p className="text-sm text-green-700">
//                     Coupon <strong>{appliedCoupon}</strong> applied — saving ₹{discount.toFixed(0)}
//                   </p>
//                 )}
//               </div>

//               {/* Price breakdown */}
//               <div className="bg-white p-4 rounded-xl border shadow-sm space-y-2 text-sm">
//                 <h4 className="text-lg font-semibold text-gray-900 mb-1">Price Breakdown</h4>

//                 {pets.map((pet, i) => (
//                   <div key={pet._key} className="flex justify-between text-gray-700">
//                     <span>{pet.petName || `Pet ${i + 1}`} — {pet.packageName || "—"}</span>
//                     <span className="font-semibold">₹{pet.packagePrice || 0}</span>
//                   </div>
//                 ))}

//                 <div className="flex justify-between text-gray-700">
//                   <span>Add-ons</span>
//                   <span className="font-semibold">₹{addonsTotal}</span>
//                 </div>

//                 {discount > 0 && (
//                   <div className="flex justify-between text-gray-700">
//                     <span>Discount</span>
//                     <span className="font-semibold text-green-600">−₹{discount.toFixed(0)}</span>
//                   </div>
//                 )}

//                 <hr className="my-1" />

//                 <div className="flex justify-between text-base font-bold">
//                   <span>Total Payable</span>
//                   <span className="text-orange-600">₹{finalTotal.toFixed(0)}</span>
//                 </div>

//                 {pets.length > 1 && (
//                   <p className="text-xs text-gray-400 pt-1">
//                     {pets.length} separate bookings will be created — one per pet, same date & slot.
//                   </p>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* footer */}
//         <div className="px-5 py-4 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.06)] rounded-b-2xl flex justify-between items-center">
//           {step > 1 ? (
//             <button onClick={() => setStep(step - 1)}
//               className="px-5 py-2.5 w-full max-w-[120px] rounded-full bg-gray-100 hover:bg-gray-200 font-medium text-sm">
//               Back
//             </button>
//           ) : <div />}

//           {step < 3 ? (
//             <button onClick={handleNext}
//               className="px-7 py-2.5 w-full max-w-[150px] rounded-full bg-orange-600 text-white font-semibold hover:bg-orange-700">
//               Next
//             </button>
//           ) : (
//             <ProtectedRoute>
//               <button onClick={handleSubmit}
//                 className="px-7 py-2.5 w-full max-w-[210px] rounded-full bg-orange-600 text-white font-semibold hover:bg-orange-700">
//                 Confirm {pets.length > 1 ? `${pets.length} Bookings` : "Booking"}
//               </button>
//             </ProtectedRoute>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── PetCard ──────────────────────────────────────────────────────────────────

// function PetCard({ idx, pet, errors, isExpanded, onToggle, onUpdate, onRemove, canRemove, packagesList }) {
//   const hasError = Object.keys(errors).length > 0;

//   return (
//     <div className={`border rounded-2xl overflow-hidden transition ${hasError ? "border-red-400" : "border-gray-200"}`}>

//       {/* accordion header */}
//       <div className="flex items-center justify-between px-4 py-3 bg-gray-50 cursor-pointer select-none" onClick={onToggle}>
//         <div className="flex items-center gap-3">
//           <div className="w-7 h-7 rounded-full bg-orange-100 text-orange-600 font-bold text-sm flex items-center justify-center flex-shrink-0">
//             {idx + 1}
//           </div>
//           <div className="min-w-0">
//             <p className="font-semibold text-gray-800 text-sm truncate">
//               {pet.petName || `Pet ${idx + 1}`}
//             </p>
//             {pet.packageName
//               ? <p className="text-xs text-gray-500">{pet.packageName} · ₹{pet.packagePrice}</p>
//               : <p className="text-xs text-orange-400">No package selected</p>
//             }
//           </div>
//         </div>
//         <div className="flex items-center gap-2 flex-shrink-0 ml-2">
//           {canRemove && (
//             <button onClick={(e) => { e.stopPropagation(); onRemove(); }}
//               className="text-red-400 hover:text-red-600 p-1" title="Remove pet">
//               <Trash2 size={16} />
//             </button>
//           )}
//           {isExpanded
//             ? <ChevronUp   size={18} className="text-gray-400" />
//             : <ChevronDown size={18} className="text-gray-400" />
//           }
//         </div>
//       </div>

//       {/* accordion body */}
//       {isExpanded && (
//         <div className="px-4 py-5 space-y-4">

//           {/* Package selector — uses real packages from /api/v1/packages/:city */}
//           <div>
//             <label className="text-sm font-semibold text-gray-600">Package</label>
//             <select value={pet.productId}
//               onChange={(e) => {
//                 const pkg = packagesList.find((p) => p._id === e.target.value);
//                 onUpdate("productId",    e.target.value);
//                 onUpdate("packageName",  pkg?.name  ?? "");
//                 onUpdate("packagePrice", Number(pkg?.price) || 0);
//               }}
//               className={`w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500 ${errors.productId ? "border-red-500" : "border-gray-300"}`}
//             >
//               <option value="">Select a package</option>
//               {packagesList.map((pkg) => (
//                 <option key={pkg._id} value={pkg._id}>
//                   {pkg.emoji ? `${pkg.emoji} ` : ""}{pkg.name} — ₹{pkg.price}
//                 </option>
//               ))}
//             </select>
//             {errors.productId && <p className="text-xs text-red-600 mt-1">{errors.productId}</p>}
//           </div>

//           {/* Pet Name */}
//           <div>
//             <label className="text-sm font-semibold text-gray-600">Pet Name</label>
//             <input type="text" value={pet.petName} onChange={(e) => onUpdate("petName", e.target.value)}
//               className={`w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500 ${errors.petName ? "border-red-500" : "border-gray-300"}`} />
//             {errors.petName && <p className="text-xs text-red-600 mt-1">{errors.petName}</p>}
//           </div>

//           {/* Pet Type */}
//           <div>
//             <label className="text-sm font-semibold text-gray-600">Pet Type</label>
//             <select value={pet.type} onChange={(e) => onUpdate("type", e.target.value)}
//               className={`w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500 ${errors.type ? "border-red-500" : "border-gray-300"}`}>
//               <option value="">Select Type</option>
//               <option value="Dog">Dog</option>
//               <option value="Cat">Cat</option>
//             </select>
//             {errors.type && <p className="text-xs text-red-600 mt-1">{errors.type}</p>}
//           </div>

//           {/* Breed */}
//           <div>
//             <label className="text-sm font-semibold text-gray-600">Breed</label>
//             <input type="text" value={pet.breed} onChange={(e) => onUpdate("breed", e.target.value)}
//               className={`w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500 ${errors.breed ? "border-red-500" : "border-gray-300"}`} />
//             {errors.breed && <p className="text-xs text-red-600 mt-1">{errors.breed}</p>}
//           </div>

//           {/* Age + Weight */}
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="text-sm font-semibold text-gray-600">Age</label>
//               <input type="number" value={pet.age} onChange={(e) => onUpdate("age", e.target.value)}
//                 className={`w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500 ${errors.age ? "border-red-500" : "border-gray-300"}`} />
//               {errors.age && <p className="text-xs text-red-600 mt-1">{errors.age}</p>}
//             </div>
//             <div>
//               <label className="text-sm font-semibold text-gray-600">Weight (kg)</label>
//               <input type="number" value={pet.weight} onChange={(e) => onUpdate("weight", e.target.value)}
//                 className={`w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500 ${errors.weight ? "border-red-500" : "border-gray-300"}`} />
//               {errors.weight && <p className="text-xs text-red-600 mt-1">{errors.weight}</p>}
//             </div>
//           </div>

//           {/* Aggression */}
//           <div>
//             <label className="text-sm font-semibold text-gray-600">Aggression Level</label>
//             <select value={pet.aggression} onChange={(e) => onUpdate("aggression", e.target.value)}
//               className={`w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500 ${errors.aggression ? "border-red-500" : "border-gray-300"}`}>
//               <option value="">Select Level</option>
//               <option value="1">1 — Low</option>
//               <option value="2">2 — Medium</option>
//               <option value="3">3 — High</option>
//             </select>
//             {errors.aggression && <p className="text-xs text-red-600 mt-1">{errors.aggression}</p>}
//           </div>

//           {/* Notes */}
//           <div>
//             <label className="text-sm font-semibold text-gray-600">Special Notes</label>
//             <textarea rows="2" value={pet.notes} onChange={(e) => onUpdate("notes", e.target.value)}
//               placeholder="Behaviour notes, allergies, etc."
//               className="w-full mt-1 px-4 py-2.5 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500" />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
import { useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "../Store/Context";
import { CreateBooking } from "../Features/Booking/mutationFunction";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { GetAddOns } from "../Features/Packages/queryFunction";
import { GetAllPackages, GetSlotAvailability } from "../Features/Booking/queryFunction";
import ProtectedRoute from "./Protect";
import { CheckCircle, MapPin, Trash2, PlusCircle, ChevronDown, ChevronUp } from "lucide-react";
import queryClient from "../Store/queryClient";
import { gtagReportConversion } from "../utils/gtag";

// ─── constants ────────────────────────────────────────────────────────────────

const SLOTS        = ["9 AM - 11 PM", "12 PM - 2 PM", "3 PM - 5 PM", "5 PM - 7 PM"];
const MAX_PER_SLOT = 3;

const TERMS = [
  "Customer must ensure pet is healthy and free from contagious conditions.",
  "Cancellation within 2 hours may incur charges of ₹150 as per company policy.",
  "Payment is due on completion unless prepaid online.",
  "It is not possible to operate trimmers/clippers on knotted and matted coats, so a zero or uneven haircut may result. If your pet gets aggressive, please assist our professionals. We don't charge for free services. If anything is skipped due to aggression or safety concerns, no refunds will be generated. A fresh toothbrush costs ₹100/piece and will be handed over to you.",
];

// ─── helpers ──────────────────────────────────────────────────────────────────

function emptyPet(productId = "", packageName = "", packagePrice = 0) {
  return {
    _key:         Math.random().toString(36).slice(2),
    petName:      "",
    type:         "",
    breed:        "",
    age:          "",
    weight:       "",
    aggression:   "",
    notes:        "",
    productId,
    packageName,
    packagePrice,
    addons:       [],
  };
}

function validatePet(pet) {
  const e = {};
  if (!pet.petName?.trim())  e.petName    = "Pet name is required";
  if (!pet.type)             e.type       = "Pet type is required";
  if (!pet.breed?.trim())    e.breed      = "Breed is required";
  if (!pet.age)              e.age        = "Age is required";
  if (!pet.weight)           e.weight     = "Weight is required";
  if (!pet.aggression)       e.aggression = "Aggression level is required";
  if (!pet.productId)        e.productId  = "Please select a package for this pet";
  return e;
}

function validateStep2(f) {
  const e = {};
  if (!/^\d{10}$/.test(f.mobile || ""))             e.mobile        = "Enter a valid 10-digit mobile number";
  if (!f.address?.trim())                            e.address       = "Service address is required";
  if (!f.pincode || String(f.pincode).length !== 6)  e.pincode       = "Enter a valid 6-digit pincode";
  if (!f.date)                                       e.date          = "Preferred date is required";
  if (!f.timeSlot)                                   e.timeSlot      = "Select a time slot";
  if (!f.agreedToTerms)                              e.agreedToTerms = "You must accept Terms & Conditions";
  return e;
}

function inputCls(hasError) {
  return `w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500 ${
    hasError ? "border-red-500" : "border-gray-300"
  }`;
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="text-sm font-semibold text-gray-600">{label}</label>
      {children}
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}

// ─── PackagePicker ────────────────────────────────────────────────────────────
// Replaces the native <select> with an inline list that stays inside the modal's
// scroll container — no OS-level dropdown that escapes the viewport on mobile.

function PackagePicker({ packagesList, selectedId, onSelect, error }) {
  const [open, setOpen] = useState(false);
  const selected = packagesList.find((p) => p._id === selectedId);

  return (
    <div className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 flex items-center justify-between text-sm transition
          ${error ? "border-red-500" : open ? "border-orange-500 ring-2 ring-orange-100" : "border-gray-300"}`}
      >
        <span className={`truncate ${selected ? "text-gray-800 font-medium" : "text-gray-400"}`}>
          {selected
            ? `${selected.emoji ?? ""} ${selected.name} — ₹${selected.price}`
            : "Select a package"}
        </span>
        <ChevronDown
          size={16}
          className={`text-gray-400 flex-shrink-0 ml-2 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Inline dropdown — renders in document flow, scrolls with the modal */}
      {open && (
        <div className="mt-1 border border-orange-200 rounded-xl bg-white shadow-md overflow-hidden">
          {packagesList.map((pkg) => {
            const isActive = pkg._id === selectedId;
            return (
              <button
                key={pkg._id}
                type="button"
                onClick={() => { onSelect(pkg); setOpen(false); }}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm text-left border-b last:border-0 transition
                  ${isActive
                    ? "bg-orange-50 text-orange-700 font-semibold border-orange-100"
                    : "text-gray-700 hover:bg-gray-50 border-gray-100"
                  }`}
              >
                <span className="truncate pr-3">
                  {pkg.emoji ? `${pkg.emoji} ` : ""}{pkg.name}
                </span>
                <span className={`font-bold flex-shrink-0 ${isActive ? "text-orange-600" : "text-gray-500"}`}>
                  ₹{pkg.price}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}

// ─── BookingModal ─────────────────────────────────────────────────────────────

export default function BookingModal() {
  const navigate    = useNavigate();
  const [locLoading, setLocLoading] = useState(false);

  const { setShowBookingModal, selectedPackage, setSelectedPackage, form, setForm } =
    useContext(GlobalContext);

  // ── remote data ───────────────────────────────────────────────────────────────

  const { data: addonsData, isPending: addonsPending } = useQuery({
    queryKey: ["addons"],
    queryFn:  GetAddOns,
  });
  const addonsList = addonsData?.data    ?? [];
  const coupans    = addonsData?.coupans ?? [];

  const { data: packagesList = [], isPending: packagesPending } = useQuery({
    queryKey: ["packages"],
    queryFn:  GetAllPackages,
  });

  const { data: slotCounts } = useQuery({
    queryKey: ["slotAvailability", form.date],
    queryFn:  () => GetSlotAvailability(form.date, pets[0]?.productId),
    enabled:  !!form.date,
  });

  // ── pets state ────────────────────────────────────────────────────────────────

  const [pets, setPets] = useState(() => [
    emptyPet(
      selectedPackage?._id   ?? "",
      selectedPackage?.name  ?? "",
      Number(selectedPackage?.price) || 0,
    ),
  ]);
  const [petErrors,   setPetErrors]   = useState([{}]);
  const [expandedIdx, setExpandedIdx] = useState(0);

  // ── step / shared errors ──────────────────────────────────────────────────────

  const [step,        setStep]        = useState(1);
  const [step2Errors, setStep2Errors] = useState({});

  // ── coupon state ──────────────────────────────────────────────────────────────

  const [coupon,        setCoupon]        = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discount,      setDiscount]      = useState(0);
  const [couponId,      setCouponId]      = useState(null);

  useEffect(() => {
    setForm((f) => ({ ...f, discount, couponId }));
  }, [couponId, discount]);

  const minBookingDate = new Date().toLocaleDateString("en-CA").split("T")[0];

  // ── mutation ──────────────────────────────────────────────────────────────────

  const successCount = useRef(0);
  const errorCount   = useRef(0);
  const totalPets    = useRef(0);

  const { mutate } = useMutation({
    mutationFn: CreateBooking,
    onSuccess: () => {
      successCount.current += 1;
      queryClient.invalidateQueries(["slotAvailability", form.date]);
      if (successCount.current + errorCount.current === totalPets.current) finishAll();
    },
    onError: () => {
      errorCount.current += 1;
      if (successCount.current + errorCount.current === totalPets.current) finishAll();
    },
  });

  function finishAll() {
    const s = successCount.current;
    const e = errorCount.current;
    setShowBookingModal(false);
    setSelectedPackage(null);
    if (s > 0 && e === 0) {
      toast.success(`${s} booking${s > 1 ? "s" : ""} created successfully!`);
      navigate("/booking-success");
    } else if (s > 0) {
      toast.success(`${s} booking${s > 1 ? "s" : ""} created. ${e} failed — contact Petlinc for help.`);
      navigate("/booking-success");
    } else {
      toast.error("Booking failed. Please contact the Petlinc team.");
      navigate("/");
    }
  }

  // ── pet handlers ──────────────────────────────────────────────────────────────

  function updatePet(idx, field, value) {
    setPets((prev) => prev.map((p, i) => (i === idx ? { ...p, [field]: value } : p)));
    setPetErrors((prev) => prev.map((e, i) => (i === idx ? { ...e, [field]: undefined } : e)));
  }

  function addPet() {
    setPets((prev) => [...prev, emptyPet()]);
    setPetErrors((prev) => [...prev, {}]);
    setExpandedIdx(pets.length);
  }

  function removePet(idx) {
    if (pets.length === 1) return;
    setPets((prev)      => prev.filter((_, i) => i !== idx));
    setPetErrors((prev) => prev.filter((_, i) => i !== idx));
    setExpandedIdx((cur) => (cur >= idx && cur > 0 ? cur - 1 : cur));
  }

  // ── navigation ────────────────────────────────────────────────────────────────

  function handleNext() {
    if (step === 1) {
      const allErrors = pets.map(validatePet);
      const hasErrors = allErrors.some((e) => Object.keys(e).length > 0);
      if (hasErrors) {
        setPetErrors(allErrors);
        setExpandedIdx(allErrors.findIndex((e) => Object.keys(e).length > 0));
        return;
      }
    }
    if (step === 2) {
      const e = validateStep2(form);
      if (Object.keys(e).length > 0) { setStep2Errors(e); return; }
      setStep2Errors({});
    }
    setStep((s) => s + 1);
  }

  function handleSubmit() {
    if (!form.agreedToTerms) {
      toast.error("Please accept Terms & Conditions before confirming.");
      return;
    }
    const city = localStorage.getItem("currentCity");

    successCount.current = 0;
    errorCount.current   = 0;
    totalPets.current    = pets.length;
    
    pets.forEach((pet) => {
      mutate({
        productId:     pet.productId,
        petName:       pet.petName,
        type:          pet.type,
        breed:         pet.breed,
        age:           pet.age,
        weight:        pet.weight,
        aggression:    pet.aggression,
        notes:         pet.notes,
        addons:        pet.addons,        // ← per-pet add-ons
        mobile:        form.mobile,
        address:       form.address,
        pincode:       form.pincode,
        date:          form.date,
        timeSlot:      form.timeSlot,
        lat:           form.lat || 0,
        lng:           form.lng || 0,
        agreedToTerms: form.agreedToTerms,
        coupon:        appliedCoupon || null,
        discount:      discount      || 0,
        couponId:      couponId      || null,
        city,
      });
      gtagReportConversion();
    });
  }

  // ── geolocation ───────────────────────────────────────────────────────────────

  function captureExactLocation() {
    if (!navigator.geolocation) { toast.error("Location not supported on this browser"); return; }
    setLocLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setForm((f) => ({ ...f, lat: pos.coords.latitude, lng: pos.coords.longitude }));
        toast.success("Exact location captured successfully");
        setLocLoading(false);
      },
      () => { toast.error("Unable to capture location. Please allow permission."); setLocLoading(false); },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    );
  }

  // ── price calculations ────────────────────────────────────────────────────────

  const petsPackageTotal = pets.reduce((sum, p) => sum + (Number(p.packagePrice) || 0), 0);
  const addonsTotal      = pets.reduce((sum, p) =>
    sum + p.addons.reduce((s, id) => s + (addonsList.find((a) => a._id === id)?.price || 0), 0), 0
  );
  const grandTotal = petsPackageTotal + addonsTotal;
  const finalTotal = Math.max(Math.round((grandTotal - discount) * 100) / 100, 0);

  // ── coupon ────────────────────────────────────────────────────────────────────

  function applyCoupon() {
    const code = (coupon || "").trim().toUpperCase();
    if (!code) { toast.error("Enter a coupon code"); return; }
    const match = coupans.find((c) => c.coupan === code);
    if (match) {
      const amt = Math.round(grandTotal * match.percent) / 100;
      setDiscount(amt); setAppliedCoupon(code); setCouponId(match._id);
      toast.success(`Coupon applied: ${match.percent}% OFF`);
    } else {
      setDiscount(0); setAppliedCoupon(null); setCouponId(null);
      toast.error("Invalid coupon");
    }
  }

  function clearCoupon() { setCoupon(""); setAppliedCoupon(null); setDiscount(0); setCouponId(null); }
  function closeModal()   { setShowBookingModal(false); setSelectedPackage(null); }

  // ── loading guard ─────────────────────────────────────────────────────────────

  if (addonsPending || packagesPending) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex justify-center items-center z-[999]">
        <div className="bg-white rounded-2xl p-10 text-center">
          <p className="text-gray-600 animate-pulse">Loading packages…</p>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex justify-center items-center z-[999] p-2 md:p-4">
      <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl relative flex flex-col max-h-[90vh] overflow-hidden">

        {/* scrollable body */}
        <div className="overflow-y-auto px-5 py-6 md:px-8 md:py-8">

          {/* close */}
          <button onClick={closeModal}
            className="absolute top-3 right-3 md:top-4 md:right-4 text-gray-500 hover:text-gray-700 text-xl md:text-2xl"
            aria-label="Close">✖
          </button>

          {/* header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Book Grooming</h2>
            <p className="text-gray-500 text-sm mt-1">
              {pets.length > 1 ? `${pets.length} pets` : pets[0]?.petName || selectedPackage?.name || ""}
            </p>
          </div>

          {/* stepper */}
          <div className="flex items-center justify-between mb-2 px-3 md:px-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex-1 flex items-center">
                <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-bold
                  ${step >= s ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-500"}`}>
                  {s}
                </div>
                {s < 3 && <div className={`flex-1 h-[2px] mx-1 md:mx-2 ${step > s ? "bg-orange-500" : "bg-gray-200"}`} />}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-400 mb-7 px-1">
            <span className={step === 1 ? "text-orange-600 font-semibold" : ""}>Pets</span>
            <span className={step === 2 ? "text-orange-600 font-semibold" : ""}>Schedule</span>
            <span className={step === 3 ? "text-orange-600 font-semibold" : ""}>Review</span>
          </div>

          {/* ── STEP 1 — Pets ──────────────────────────────────────────────── */}
          {step === 1 && (
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                Add one or more pets. Each pet can have its own package and add-ons.
              </p>

              {pets.map((pet, idx) => (
                <PetCard
                  key={pet._key}
                  idx={idx}
                  pet={pet}
                  errors={petErrors[idx] || {}}
                  isExpanded={expandedIdx === idx}
                  onToggle={() => setExpandedIdx(expandedIdx === idx ? -1 : idx)}
                  onUpdate={(field, value) => updatePet(idx, field, value)}
                  onRemove={() => removePet(idx)}
                  canRemove={pets.length > 1}
                  packagesList={packagesList}
                  addonsList={addonsList}
                />
              ))}

              <button onClick={addPet}
                className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-orange-300 rounded-xl text-orange-600 hover:border-orange-500 hover:bg-orange-50 font-medium text-sm transition">
                <PlusCircle size={18} /> Add Another Pet
              </button>
            </div>
          )}

          {/* ── STEP 2 — Schedule ──────────────────────────────────────────── */}
          {step === 2 && (
            <div className="space-y-5">

              <Field label="Contact Number" error={step2Errors.mobile}>
                <input type="tel" minLength="10" maxLength="10" value={form.mobile}
                  onChange={(e) => { setForm({ ...form, mobile: e.target.value }); setStep2Errors((p) => ({ ...p, mobile: undefined })); }}
                  className={inputCls(step2Errors.mobile)} />
              </Field>

              <div>
                <label className="text-sm font-semibold text-gray-600">Service Address</label>
                <input type="text" value={form.address} placeholder="House no, area, city"
                  onChange={(e) => { setForm({ ...form, address: e.target.value }); setStep2Errors((p) => ({ ...p, address: undefined })); }}
                  className={inputCls(step2Errors.address)} />
                {step2Errors.address && <p className="text-xs text-red-600 mt-1">{step2Errors.address}</p>}
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-xs text-gray-500">Helps our groomer reach you easily</p>
                  {!form.lat ? (
                    <button type="button" onClick={captureExactLocation} disabled={locLoading}
                      className="flex items-center gap-1.5 text-xs font-medium text-orange-600 hover:text-orange-700 disabled:opacity-50">
                      <MapPin size={14} />
                      {locLoading ? "Detecting…" : "Add live location (optional)"}
                    </button>
                  ) : (
                    <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
                      <CheckCircle size={14} /> Location added
                    </span>
                  )}
                </div>
              </div>

              <Field label="Pincode" error={step2Errors.pincode}>
                <input type="number" value={form.pincode}
                  onChange={(e) => { setForm({ ...form, pincode: e.target.value }); setStep2Errors((p) => ({ ...p, pincode: undefined })); }}
                  className={inputCls(step2Errors.pincode)} />
              </Field>

              <Field label="Preferred Date" error={step2Errors.date}>
                <input type="date" min={minBookingDate} value={form.date}
                  onChange={(e) => { setForm({ ...form, date: e.target.value, timeSlot: "" }); setStep2Errors((p) => ({ ...p, date: undefined })); }}
                  className={inputCls(step2Errors.date)} />
              </Field>

              <div>
                <label className="text-sm font-semibold text-gray-600">Preferred Time Slot</label>
                {!form.date ? (
                  <p className="text-xs text-gray-400 mt-2">Select a date first to see available slots.</p>
                ) : (
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {SLOTS.map((slot) => {
                      const count      = slotCounts?.data?.[slot] || 0;
                      const isFull     = count >= MAX_PER_SLOT;
                      const isSelected = form.timeSlot === slot;
                      return (
                        <button key={slot} type="button" disabled={isFull}
                          onClick={() => { if (!isFull) { setForm({ ...form, timeSlot: slot }); setStep2Errors((p) => ({ ...p, timeSlot: undefined })); } }}
                          className={`px-3 py-3 rounded-xl border text-sm font-medium transition text-center
                            ${isFull
                              ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through"
                              : isSelected
                              ? "bg-orange-600 text-white border-orange-600 shadow"
                              : "bg-white text-gray-700 border-gray-300 hover:border-orange-400"}`}
                        >
                          {slot}
                          {isFull
                            ? <span className="block text-xs font-normal text-red-400" style={{ textDecoration: "none" }}>Fully Booked</span>
                            : <span className="block text-xs font-normal opacity-60">{MAX_PER_SLOT - count} spot{MAX_PER_SLOT - count !== 1 ? "s" : ""} left</span>
                          }
                        </button>
                      );
                    })}
                  </div>
                )}
                {step2Errors.timeSlot && <p className="text-xs text-red-600 mt-1">{step2Errors.timeSlot}</p>}
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Terms & Conditions</h3>
                <div className="space-y-2 text-sm text-gray-700 leading-relaxed">
                  {TERMS.map((t, i) => <p key={i}>• {t}</p>)}
                </div>
                <label className="flex items-center gap-3 mt-4">
                  <input type="checkbox" checked={form.agreedToTerms}
                    onChange={(e) => { setForm({ ...form, agreedToTerms: e.target.checked }); setStep2Errors((p) => ({ ...p, agreedToTerms: undefined })); }} />
                  <span className="text-gray-700 text-sm">I agree to the Terms & Conditions</span>
                </label>
                {step2Errors.agreedToTerms && <p className="text-xs text-red-600 mt-1">{step2Errors.agreedToTerms}</p>}
              </div>
            </div>
          )}

          {/* ── STEP 3 — Review ────────────────────────────────────────────── */}
          {step === 3 && (
            <div className="space-y-5 bg-gray-50 p-4 rounded-2xl border">

              {/* Pets & packages */}
              <div className="bg-white p-4 rounded-xl border shadow-sm">
                <h4 className="text-base font-semibold text-gray-900 mb-3">Pets & Packages</h4>
                {pets.map((pet, i) => {
                  const petAddonsTotal = pet.addons.reduce(
                    (s, id) => s + (addonsList.find((a) => a._id === id)?.price || 0), 0
                  );
                  return (
                    <div key={pet._key} className="border-b last:border-0 pb-3 last:pb-0 mb-3 last:mb-0">
                      <div className="flex justify-between items-start gap-2">
                        <div className="min-w-0">
                          <p className="font-medium text-gray-800 text-sm">
                            {pet.petName}{" "}
                            <span className="text-gray-400 text-xs">({pet.type} · {pet.breed})</span>
                          </p>
                          <p className="text-xs text-gray-500 truncate">{pet.packageName || "—"}</p>
                        </div>
                        <span className="text-orange-600 font-bold text-sm flex-shrink-0">₹{pet.packagePrice || 0}</span>
                      </div>
                      {pet.addons.length > 0 && (
                        <div className="mt-1.5 pl-1 space-y-0.5">
                          {pet.addons.map((id) => {
                            const addon = addonsList.find((a) => a._id === id);
                            return addon ? (
                              <div key={id} className="flex justify-between text-xs text-gray-500">
                                <span>+ {addon.name}</span>
                                <span className="flex-shrink-0 ml-2">₹{addon.price}</span>
                              </div>
                            ) : null;
                          })}
                          <div className="flex justify-between text-xs font-semibold text-orange-500 pt-1">
                            <span>Pet subtotal</span>
                            <span>₹{(pet.packagePrice || 0) + petAddonsTotal}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Appointment */}
              <div className="bg-white p-4 rounded-xl border shadow-sm space-y-1 text-sm text-gray-700">
                <h4 className="text-base font-semibold text-gray-900 mb-2">Appointment Details</h4>
                <p><strong>Contact:</strong> {form.mobile}</p>
                <p><strong>Address:</strong> {form.address}</p>
                <p><strong>Pincode:</strong> {form.pincode}</p>
                <p><strong>Date:</strong> {form.date}</p>
                <p><strong>Time Slot:</strong> {form.timeSlot}</p>
              </div>

              {/* Coupon */}
              <div className="bg-white p-4 rounded-xl border shadow-sm space-y-3">
                <h4 className="text-base font-semibold text-gray-900">Apply Coupon</h4>
                <div className="flex gap-2">
                  <input type="text" value={coupon} onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Enter coupon code"
                    className="flex-1 min-w-0 px-3 py-2 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500 text-sm" />
                  <button onClick={applyCoupon} disabled={!!appliedCoupon}
                    className="px-4 py-2 rounded-xl bg-orange-600 text-white font-medium hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm flex-shrink-0">
                    {appliedCoupon ? "Applied" : "Apply"}
                  </button>
                  {appliedCoupon && (
                    <button onClick={clearCoupon}
                      className="px-3 py-2 rounded-xl bg-gray-100 text-gray-800 hover:bg-gray-200 text-sm flex-shrink-0">
                      Clear
                    </button>
                  )}
                </div>
                {appliedCoupon && (
                  <p className="text-sm text-green-700">
                    Coupon <strong>{appliedCoupon}</strong> applied — saving ₹{discount.toFixed(0)}
                  </p>
                )}
              </div>

              {/* Price breakdown */}
              <div className="bg-white p-4 rounded-xl border shadow-sm space-y-2 text-sm">
                <h4 className="text-base font-semibold text-gray-900 mb-1">Price Breakdown</h4>
                {pets.map((pet, i) => (
                  <div key={pet._key} className="flex justify-between text-gray-700 gap-2">
                    <span className="truncate">{pet.petName || `Pet ${i + 1}`} — {pet.packageName || "—"}</span>
                    <span className="font-semibold flex-shrink-0">₹{pet.packagePrice || 0}</span>
                  </div>
                ))}
                {addonsTotal > 0 && (
                  <div className="flex justify-between text-gray-700">
                    <span>Add-ons (all pets)</span>
                    <span className="font-semibold">₹{addonsTotal}</span>
                  </div>
                )}
                {discount > 0 && (
                  <div className="flex justify-between text-gray-700">
                    <span>Discount</span>
                    <span className="font-semibold text-green-600">−₹{discount.toFixed(0)}</span>
                  </div>
                )}
                <hr className="my-1" />
                <div className="flex justify-between text-base font-bold">
                  <span>Total Payable</span>
                  <span className="text-orange-600">₹{finalTotal.toFixed(0)}</span>
                </div>
                {pets.length > 1 && (
                  <p className="text-xs text-gray-400 pt-1">
                    {pets.length} separate bookings will be created — one per pet, same date & slot.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* footer */}
        <div className="px-5 py-4 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.06)] rounded-b-2xl flex justify-between items-center gap-3">
          {step > 1
            ? <button onClick={() => setStep(step - 1)}
                className="px-5 py-2.5 rounded-full bg-gray-100 hover:bg-gray-200 font-medium text-sm flex-shrink-0">
                Back
              </button>
            : <div />
          }
          {step < 3
            ? <button onClick={handleNext}
                className="px-7 py-2.5 rounded-full bg-orange-600 text-white font-semibold hover:bg-orange-700 flex-shrink-0">
                Next
              </button>
            : <ProtectedRoute>
                <button onClick={handleSubmit}
                  className="px-6 py-2.5 rounded-full bg-orange-600 text-white font-semibold hover:bg-orange-700 text-sm flex-shrink-0">
                  Confirm {pets.length > 1 ? `${pets.length} Bookings` : "Booking"}
                </button>
              </ProtectedRoute>
          }
        </div>
      </div>
    </div>
  );
}

// ─── PetCard ──────────────────────────────────────────────────────────────────

function PetCard({ idx, pet, errors, isExpanded, onToggle, onUpdate, onRemove, canRemove, packagesList, addonsList }) {
  const hasError = Object.keys(errors).length > 0;

  return (
    <div className={`border rounded-2xl overflow-hidden transition ${hasError ? "border-red-400" : "border-gray-200"}`}>

      {/* header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 cursor-pointer select-none" onClick={onToggle}>
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-7 h-7 rounded-full bg-orange-100 text-orange-600 font-bold text-sm flex items-center justify-center flex-shrink-0">
            {idx + 1}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-gray-800 text-sm truncate">
              {pet.petName || `Pet ${idx + 1}`}
            </p>
            {pet.packageName
              ? <p className="text-xs text-gray-500 truncate">
                  {pet.packageName} · ₹{pet.packagePrice}
                  {pet.addons.length > 0 && (
                    <span className="text-orange-500 ml-1">
                      + {pet.addons.length} add-on{pet.addons.length > 1 ? "s" : ""}
                    </span>
                  )}
                </p>
              : <p className="text-xs text-orange-400">No package selected</p>
            }
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 ml-2">
          {canRemove && (
            <button onClick={(e) => { e.stopPropagation(); onRemove(); }}
              className="text-red-400 hover:text-red-600 p-1" title="Remove pet">
              <Trash2 size={16} />
            </button>
          )}
          {isExpanded ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
        </div>
      </div>

      {/* body */}
      {isExpanded && (
        <div className="px-4 py-5 space-y-4">

          {/* Package — custom picker, no native <select> */}
          <div>
            <label className="text-sm font-semibold text-gray-600">Package</label>
            <PackagePicker
              packagesList={packagesList}
              selectedId={pet.productId}
              error={errors.productId}
              onSelect={(pkg) => {
                onUpdate("productId",    pkg._id);
                onUpdate("packageName",  pkg.name);
                onUpdate("packagePrice", Number(pkg.price) || 0);
              }}
            />
          </div>

          {/* Pet Name */}
          <div>
            <label className="text-sm font-semibold text-gray-600">Pet Name</label>
            <input type="text" value={pet.petName} onChange={(e) => onUpdate("petName", e.target.value)}
              className={`w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500 ${errors.petName ? "border-red-500" : "border-gray-300"}`} />
            {errors.petName && <p className="text-xs text-red-600 mt-1">{errors.petName}</p>}
          </div>

          {/* Pet Type */}
          <div>
            <label className="text-sm font-semibold text-gray-600">Pet Type</label>
            <select value={pet.type} onChange={(e) => onUpdate("type", e.target.value)}
              className={`w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500 ${errors.type ? "border-red-500" : "border-gray-300"}`}>
              <option value="">Select Type</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
            </select>
            {errors.type && <p className="text-xs text-red-600 mt-1">{errors.type}</p>}
          </div>

          {/* Breed */}
          <div>
            <label className="text-sm font-semibold text-gray-600">Breed</label>
            <input type="text" value={pet.breed} onChange={(e) => onUpdate("breed", e.target.value)}
              className={`w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500 ${errors.breed ? "border-red-500" : "border-gray-300"}`} />
            {errors.breed && <p className="text-xs text-red-600 mt-1">{errors.breed}</p>}
          </div>

          {/* Age + Weight */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-600">Age</label>
              <input type="number" value={pet.age} onChange={(e) => onUpdate("age", e.target.value)}
                className={`w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500 ${errors.age ? "border-red-500" : "border-gray-300"}`} />
              {errors.age && <p className="text-xs text-red-600 mt-1">{errors.age}</p>}
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-600">Weight (kg)</label>
              <input type="number" value={pet.weight} onChange={(e) => onUpdate("weight", e.target.value)}
                className={`w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500 ${errors.weight ? "border-red-500" : "border-gray-300"}`} />
              {errors.weight && <p className="text-xs text-red-600 mt-1">{errors.weight}</p>}
            </div>
          </div>

          {/* Aggression */}
          <div>
            <label className="text-sm font-semibold text-gray-600">Aggression Level</label>
            <select value={pet.aggression} onChange={(e) => onUpdate("aggression", e.target.value)}
              className={`w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500 ${errors.aggression ? "border-red-500" : "border-gray-300"}`}>
              <option value="">Select Level</option>
              <option value="1">1 — Low</option>
              <option value="2">2 — Medium</option>
              <option value="3">3 — High</option>
            </select>
            {errors.aggression && <p className="text-xs text-red-600 mt-1">{errors.aggression}</p>}
          </div>

          {/* Notes */}
          <div>
            <label className="text-sm font-semibold text-gray-600">Special Notes</label>
            <textarea rows="2" value={pet.notes} onChange={(e) => onUpdate("notes", e.target.value)}
              placeholder="Behaviour notes, allergies, etc."
              className="w-full mt-1 px-4 py-2.5 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500" />
          </div>

          {/* Add-ons — per pet */}
          {addonsList.length > 0 && (
            <div>
              <label className="text-sm font-semibold text-gray-600">
                Add-Ons <span className="text-xs text-gray-400 font-normal">(optional)</span>
              </label>
              <div className="space-y-2 mt-2">
                {addonsList.map((addon) => {
                  const isSelected = pet.addons.includes(addon._id);
                  return (
                    <label key={addon._id}
                      className={`flex justify-between items-center p-3 border rounded-lg cursor-pointer transition
                        ${isSelected ? "border-orange-500 bg-orange-50" : "border-gray-200 hover:border-orange-400"}`}>
                      <div className="flex items-center gap-3 min-w-0">
                        <input type="checkbox" checked={isSelected}
                          onChange={() =>
                            onUpdate("addons",
                              isSelected
                                ? pet.addons.filter((id) => id !== addon._id)
                                : [...pet.addons, addon._id]
                            )
                          }
                        />
                        <span className="text-gray-800 text-sm truncate">{addon.name}</span>
                      </div>
                      <span className="text-orange-600 font-semibold text-sm flex-shrink-0 ml-3">₹{addon.price}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}