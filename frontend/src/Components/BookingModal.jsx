// import { useContext, useEffect, useState } from "react";
// import { GlobalContext } from "../Store/Context";
// import { CreateBooking } from "../Features/Booking/mutationFunction";
// import { useMutation } from "@tanstack/react-query";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router";
// import { useQuery } from "@tanstack/react-query";
// import { GetAddOns } from "../Features/Packages/queryFunction";

// export default function BookingModal() {
//   const navigate = useNavigate();
//   const { setShowBookingModal, selectedPackage, setSelectedPackage } =
//     useContext(GlobalContext);
    
//   const [form, setForm] = useState({
//     productId: "",
//     petName: "Bruno",
//     type: "Dog",
//     breed: "Labrador",
//     age: "2",
//     weight: "3",
//     notes: "Very aggressive",
//     address: "Ruby park, Kolkata",
//     date: "",
//     timeSlot: "",
//     addons: [],
//   });

//   const { data:addonsList , isPending} = useQuery({
//     queryKey: ["addonsList"],
//     queryFn: GetAddOns,
//   });
//   // const addonsList = [
//   //   { id: "AD01", name: "Anti Tick & Flea (Ridd)", price: 250 },
//   //   { id: "AD02", name: "Anti Tick & Flea (Spot On)", price: 500 },
//   //   { id: "AD03", name: "Oil Massage", price: 300 },
//   //   { id: "AD04", name: "Anal Gland Cleaning", price: 300 },
//   //   { id: "AD05", name: "De-shedding", price: 400 },
//   //   { id: "AD06", name: "De-matting", price: 500 },
//   // ];

//   useEffect(() => {
//     setForm((form) => ({ ...form, productId: selectedPackage?._id }));
//   }, [selectedPackage]);

//   const [step, setStep] = useState(1);

//   const { mutate } = useMutation({
//     mutationFn: CreateBooking,
//     onSuccess: async () => {
//       toast.success("Booking created successfully.");
//       setShowBookingModal(false);
//       setSelectedPackage(null);
//       navigate("/booking-success"); // 🟧 go to success page
//     },
//     onError: async () => {
//       setShowBookingModal(false);
//       setSelectedPackage(null);
//       toast.error("You are not logged in!!! Please login.");
//       navigate("/signin");
//     },
//   });
//   const closeModal = () => {
//     setShowBookingModal(false);
//     setSelectedPackage(null);
//   };

//   function handleSubmit() {
//     console.log(form);
//     mutate(form);
//   }

//   const addonsTotal = form.addons
//     .map((id) => addonsList.find((a) => a._id === id)?.price || 0)
//     .reduce((a, b) => a + b, 0);

//   const grandTotal = (selectedPackage?.price * 1 || 0) + addonsTotal * 1;
//  if(isPending){
//   return <h1>loading</h1>
  
//  }

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex justify-center items-center z-[999] p-2 md:p-4 animate-fadeIn">
//       {/* MODAL CONTAINER */}
//       <div
//         className="
//     bg-white 
//     rounded-2xl 
//     w-full 
//     max-w-xl 
//     shadow-2xl 
//     relative 
//     animate-slideUp 
//     flex 
//     flex-col
//     max-h-[90vh] 
//     overflow-hidden
//   "
//       >
//         {/* SCROLL AREA */}
//         <div className="overflow-y-auto px-5 py-6 md:px-8 md:py-8">
//           {/* CLOSE BUTTON */}
//           <button
//             onClick={closeModal}
//             className="absolute top-3 right-3 md:top-4 md:right-4 text-gray-500 hover:text-gray-700 transition text-xl md:text-2xl"
//           >
//             ✖
//           </button>

//           {/* HEADER */}
//           <div className="text-center mb-6 md:mb-8">
//             <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
//               Book Grooming
//             </h2>
//             <p className="text-gray-500 text-sm mt-1">
//               {selectedPackage?.name}
//             </p>
//           </div>

//           {/* STEP PROGRESS */}
//           <div className="flex items-center justify-between mb-8 md:mb-10 px-3 md:px-4">
//             {[1, 2, 3].map((s) => (
//               <div key={s} className="flex-1 flex items-center">
//                 <div
//                   className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-bold 
//               ${
//                 step >= s
//                   ? "bg-orange-600 text-white"
//                   : "bg-gray-200 text-gray-500"
//               }
//             `}
//                 >
//                   {s}
//                 </div>

//                 {s < 3 && (
//                   <div
//                     className={`flex-1 h-[2px] mx-1 md:mx-2 transition-all ${
//                       step > s ? "bg-orange-500" : "bg-gray-200"
//                     }`}
//                   ></div>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* CONTENT AREA */}
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
//                     onChange={(e) =>
//                       setForm({ ...form, petName: e.target.value })
//                     }
//                     className="w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500 outline-none"
//                     placeholder="e.g. Bruno"
//                   />
//                 </div>

//                 <div>
//                   <label className="text-sm font-semibold text-gray-600">
//                     Pet Type
//                   </label>
//                   <select
//                     value={form.type}
//                     onChange={(e) => setForm({ ...form, type: e.target.value })}
//                     className="w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500 outline-none"
//                   >
//                     <option value="">Select Type</option>
//                     <option value="Dog">Dog</option>
//                     <option value="Cat">Cat</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="text-sm font-semibold text-gray-600">
//                     Breed
//                   </label>
//                   <input
//                     type="text"
//                     value={form.breed}
//                     onChange={(e) =>
//                       setForm({ ...form, breed: e.target.value })
//                     }
//                     className="w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500 outline-none"
//                     placeholder="e.g. Labrador"
//                   />
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="text-sm font-semibold text-gray-600">
//                       Age
//                     </label>
//                     <input
//                       value={form.age}
//                       onChange={(e) =>
//                         setForm({ ...form, age: e.target.value })
//                       }
//                       className="w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500 outline-none"
//                       placeholder="2 years"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-sm font-semibold text-gray-600">
//                       Weight (kg)
//                     </label>
//                     <input
//                       value={form.weight}
//                       onChange={(e) =>
//                         setForm({ ...form, weight: e.target.value })
//                       }
//                       className="w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500 outline-none"
//                       placeholder="10 kg"
//                     />
//                   </div>
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
//                     placeholder="Allergies, behaviour notes, etc."
//                     className="w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500 outline-none"
//                   ></textarea>
//                 </div>
//               </div>
//             )}

//             {/* STEP 2 */}
//             {step === 2 && (
//               <div className="space-y-5">
//                 <div>
//                   <label className="text-sm font-semibold text-gray-600">
//                     Address
//                   </label>
//                   <input
//                     type="text"
//                     value={form.address}
//                     onChange={(e) =>
//                       setForm({ ...form, address: e.target.value })
//                     }
//                     className="w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500 outline-none"
//                     placeholder="House no, area, city"
//                   />
//                 </div>

//                 <div>
//                   <label className="text-sm font-semibold text-gray-600">
//                     Preferred Date
//                   </label>
//                   <input
//                     type="date"
//                     value={form.date}
//                     onChange={(e) => setForm({ ...form, date: e.target.value })}
//                     className="w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500 outline-none"
//                   />
//                 </div>

//                 <div>
//                   <label className="text-sm font-semibold text-gray-600">
//                     Preferred Time Slot
//                   </label>
//                   <select
//                     value={form.timeSlot}
//                     onChange={(e) =>
//                       setForm({ ...form, timeSlot: e.target.value })
//                     }
//                     className="w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500 outline-none"
//                   >
//                     <option value="">Select Slot</option>
//                     <option>10 AM - 12 PM</option>
//                     <option>12 PM - 2 PM</option>
//                     <option>2 PM - 4 PM</option>
//                     <option>4 PM - 6 PM</option>
//                   </select>
//                 </div>
//               </div>
//             )}

//             {/* STEP 3 */}
//             {/* {step === 3 && (
//               <div className="space-y-3 text-gray-700 bg-gray-50 p-5 rounded-2xl border">
//                 <p>
//                   <strong>Pet Name:</strong> {form.petName}
//                 </p>
//                 <p>
//                   <strong>Type:</strong> {form.type}
//                 </p>
//                 <p>
//                   <strong>Breed:</strong> {form.breed}
//                 </p>
//                 <p>
//                   <strong>Age:</strong> {form.age}
//                 </p>
//                 <p>
//                   <strong>Weight:</strong> {form.weight}
//                 </p>
//                 <p>
//                   <strong>Address:</strong> {form.address}
//                 </p>
//                 <p>
//                   <strong>Date:</strong> {form.date}
//                 </p>
//                 <p>
//                   <strong>Time Slot:</strong> {form.timeSlot}
//                 </p>

//                 <hr />

//                 <p className="text-lg font-semibold">
//                   Package:{" "}
//                   <span className="text-orange-600">
//                     {selectedPackage?.name}
//                   </span>
//                 </p>
//                 <p className="text-lg font-bold">
//                   Price:{" "}
//                   <span className="text-orange-600">
//                     {selectedPackage?.price}
//                   </span>
//                 </p>
//               </div>
//             )} */}
//             {step === 3 && (
//               <div className="space-y-6 bg-gray-50 p-5 rounded-2xl border">
//                 {/* SECTION TITLE */}
//                 <h3 className="text-xl font-bold text-gray-900">
//                   Review Your Booking
//                 </h3>

//                 {/* PACKAGE INFO */}
//                 <div className="bg-white p-4 rounded-xl shadow-sm border">
//                   <h4 className="text-lg font-semibold text-gray-900 flex justify-between">
//                     {selectedPackage?.name}
//                     <span className="text-orange-600 font-bold">
//                       ₹{selectedPackage?.price}
//                     </span>
//                   </h4>
//                   <p className="text-gray-500 text-sm mt-1">
//                     Base grooming package selected
//                   </p>
//                 </div>

//                 {/* PET DETAILS */}
//                 <div className="bg-white p-4 rounded-xl shadow-sm border space-y-1">
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

//                   <hr className="my-2" />

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

//                 {/* ADDONS SECTION */}
//                 <div className="bg-white p-4 rounded-xl shadow-sm border">
//                   <h4 className="text-lg font-semibold text-gray-900 mb-2">
//                     Add-Ons
//                   </h4>

//                   {addonsList.map((addon) => {console.log("addon:", addon)
//                     const isSelected = form.addons.includes(addon._id);

//                     return (
//                       <label
//                         key={addon._id}
//                         className={`flex justify-between items-center p-3 rounded-lg border mb-2 cursor-pointer transition 
//                         ${
//                           isSelected
//                             ? "border-orange-500 bg-orange-50"
//                             : "hover:border-orange-400"
//                         }
//                       `}
//                       >
//                         <div className="flex items-center gap-3">
//                           <input
//                             type="checkbox"
//                             checked={isSelected}
//                             onChange={() => {
//                               setForm((prev) => ({
//                                 ...prev,
//                                 addons: prev.addons.includes(addon._id)
//                                   ? prev.addons.filter((a) => a !== addon._id)
//                                   : [...prev.addons, addon._id],
//                               }));
//                             }}
//                             className="w-5 h-5 text-orange-600"
//                           />
//                           <span className="text-gray-800 font-medium">
//                             {addon.name}
//                           </span>
//                         </div>

//                         <span className="text-orange-600 font-semibold">
//                           ₹{addon.price}
//                         </span>
//                       </label>
//                     );
//                   })}

//                   {/* Nothing selected */}
//                   {form.addons.length === 0 && (
//                     <p className="text-gray-500 text-sm">
//                       No add-ons selected.
//                     </p>
//                   )}
//                 </div>

//                 {/* PRICE BREAKDOWN */}
//                 <div className="bg-white p-4 rounded-xl shadow-sm border space-y-3">
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

//                   {/* Add-ons detailed lines */}
//                   {form.addons.length > 0 && (
//                     <ul className="ml-4 text-sm text-gray-600 space-y-1">
//                       {form.addons.map((id) => {
//                         const addon = addonsList.find((i) => i._id === id);
//                         return (
//                           <li key={id} className="flex justify-between">
//                             <span>- {addon.name}</span>
//                             <span>₹{addon.price}</span>
//                           </li>
//                         );
//                       })}
//                     </ul>
//                   )}

//                   <hr />

//                   <div className="flex justify-between text-lg font-bold">
//                     <span>Total Payable</span>
//                     <span className="text-orange-600">₹{grandTotal}</span>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* FOOTER BUTTONS — STICKY */}
//         <div
//           className="
//         px-5 py-4 
//         bg-white 
//         shadow-[0_-4px_20px_rgba(0,0,0,0.06)] 
//         rounded-b-2xl 
//         flex 
//         justify-between 
//         items-center
//       "
//         >
//           {step > 1 ? (
//             <button
//               onClick={() => setStep(step - 1)}
//               className="px-5 py-2.5 w-full max-w-[120px] rounded-full bg-gray-100 hover:bg-gray-200 transition text-gray-700 font-medium text-sm"
//             >
//               Back
//             </button>
//           ) : (
//             <div></div>
//           )}

//           {step < 3 ? (
//             <button
//               onClick={() => setStep(step + 1)}
//               className="px-7 py-2.5 w-full max-w-[150px] rounded-full bg-orange-600 text-white text-sm font-semibold hover:bg-orange-700 shadow-md transition"
//             >
//               Next
//             </button>
//           ) : (
//             <button
//               onClick={() => {
//                 // TODO: Send to backend

//                 handleSubmit();
//               }}
//               className="px-7 py-2.5 w-full max-w-[180px] rounded-full bg-orange-600 text-white text-sm font-semibold hover:bg-orange-700 shadow-md transition"
//             >
//               Confirm Booking
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../Store/Context";
import { CreateBooking } from "../Features/Booking/mutationFunction";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { GetAddOns } from "../Features/Packages/queryFunction";
import ProtectedRoute from "./Protect";

export default function BookingModal() {
  const navigate = useNavigate();
  const { setShowBookingModal, selectedPackage, setSelectedPackage, form, setForm } =
    useContext(GlobalContext);

  // const [form, setForm] = useState({
  //   productId: "",
  //   petName: "",
  //   type: "",
  //   breed: "",
  //   age: "",
  //   weight: "",
  //   aggression: "",
  //   notes: "",
  //   mobile:"",
  //   address: "",
  //   date: "",
  //   timeSlot: "",
  //   addons: [],
  //   coupan:"",
  //   coupanId:"",
  //   discount:"",
  //   agreedToTerms: false,
  // });

  const [accordionOpen, setAccordionOpen] = useState(false);

  // coupon state
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null); // store code
  const [discount, setDiscount] = useState(0);
  const [couponId, setCouponId] = useState("");

  

  // sample T&C text — replace with your actual terms as needed
  const termsText = [
    "Customer must ensure pet is healthy and free from contagious conditions.",
    "Cancellation within 24 hours may incur charges as per company policy.",
    "Payment is due on completion unless prepaid online.",
    "It is not possible to operate trimmers/ clippers in knotted and mated body, so a zero haircut or \
    an uneven haircut can be an output. If pet gets aggressive while the grooming, please assist our professionals in \
    handling the pet. Every time pet behaves in a different manner with different grommer in different setting. We \
    don't charge anything for the free services. If anything is not done due to aggression or any other scenario which can harm \
    the pet or our service provider, no refuncds will be generated. In case we provide a tooth brush, we use a fresh tooth brush \
    which costs 100/- per peice which will be handed over to you."
  ];

  const { data: addons, isPending } = useQuery({
    queryKey: ["addons"],
    queryFn: GetAddOns,
  });
 let addonsList = addons?.data;
 let coupans = addons?.coupans;


  useEffect(() => {
    setForm((f) => ({ ...f, productId: selectedPackage?._id }));
  }, [selectedPackage]);

  useEffect( ()=>{
     setForm((f)=>({...f, discount:discount, couponId:couponId}));
  }, [couponId, discount])



  

  const [step, setStep] = useState(1);

  const { mutate } = useMutation({
    mutationFn: CreateBooking,
    onSuccess: async () => {
      toast.success("Booking created successfully.");
      setShowBookingModal(false);
      setSelectedPackage(null);
      navigate("/booking-success");
    },
    onError: async () => {
      setShowBookingModal(false);
      setSelectedPackage(null);
      toast.error("Something went wrong!!! Please contact petlinc team to book a session.");
      navigate("/");
    },
  });

  const closeModal = () => {
    setShowBookingModal(false);
    setSelectedPackage(null);
  };


  function handleNext() {
  let error = null;

  if (step === 1) error = validateStep1(form);
  if (step === 2) error = validateStep2(form);

  if (error) {
    toast.error(error);
    return;
  }

  setStep(step + 1);
}
 

  function handleSubmit() {
    // optionally enforce that terms agreed
    if (!form.agreedToTerms) {
      toast.error("Please accept terms & conditions before confirming.");
      return;
    }
    // send payload (including coupon info)
    mutate({ ...form, coupon: appliedCoupon || null, discount: discount || 0 });
  }

  if (isPending) return <h1 className="p-8 text-center">Loading...</h1>;

  // compute totals BEFORE coupon apply logic uses them
  const addonsTotal = form.addons
    .map((id) => addonsList.find((a) => a._id === id)?.price || 0)
    .reduce((a, b) => a + b, 0);

  const grandTotal = (Number(selectedPackage?.price || 0) + Number(addonsTotal || 0));
  const finalTotal = Math.max(Math.round((grandTotal - discount) * 100) / 100, 0);

  // coupon application (uses currently computed grandTotal)
  function applyCoupon() {
    const code = (coupon || "").trim().toUpperCase();
    if (!code) {
      toast.error("Enter a coupon code");
      return;
    }
    // Example coupon rules — change to real validation (API) as desired
    for(let index = 0; index < coupans.length; index++){
      if(coupans[index].coupan === code){
         const amt = Math.round(grandTotal * coupans[index].percent ) / 100;
        setDiscount(amt);
        setAppliedCoupon(code);
        setCouponId(coupans[index]._id);
        toast.success(`Coupon Applied: ${coupans[index].percent}% OFF`);
        break
      }  else {
      setDiscount(0);
      setAppliedCoupon(null);
      setCouponId(null);
      toast.error("Invalid Coupon");
    }
  }
}

  function clearCoupon() {
    setCoupon("");
    setAppliedCoupon(null);
    setDiscount(0);
    setCouponId(null);
  }
   
  function validateStep1(form) {
  if (!form.petName) return "Pet name is required";
  if (!form.type) return "Pet type is required";
  if (!form.breed) return "Breed is required";
  if (!form.age) return "Age is required";
  if (!form.weight) return "Weight is required";
  if (!form.aggression) return "Aggression level is required";
  return null;
}

function validateStep2(form) {
  if (!form.mobile) return "Mobile number is required";
  if (form.mobile.length < 10) return "Enter valid mobile number";
  if (!form.address) return "Address is required";
  if (!form.date) return "Preferred date is required";
  if (!form.timeSlot) return "Time slot is required";
  if (!form.agreedToTerms) return "You must accept Terms & Conditions";
  return null;
}


  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex justify-center items-center z-[999] p-2 md:p-4">
      <div
        className="
          bg-white rounded-2xl w-full max-w-xl shadow-2xl relative
          flex flex-col max-h-[90vh] overflow-hidden
        "
      >
        {/* scroll area */}
        <div className="overflow-y-auto px-5 py-6 md:px-8 md:py-8">
          {/* close */}
          <button
            onClick={closeModal}
            className="absolute top-3 right-3 md:top-4 md:right-4 text-gray-500 hover:text-gray-700 text-xl md:text-2xl"
            aria-label="Close"
          >
            ✖
          </button>

          {/* header */}
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
              Book Grooming
            </h2>
            <p className="text-gray-500 text-sm mt-1">{selectedPackage?.name}</p>
          </div>

          {/* progress */}
          <div className="flex items-center justify-between mb-8 md:mb-10 px-3 md:px-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex-1 flex items-center">
                <div
                  className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-bold ${
                    step >= s ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {s}
                </div>

                {s < 3 && (
                  <div className={`flex-1 h-[2px] mx-1 md:mx-2 ${step > s ? "bg-orange-500" : "bg-gray-200"}`}></div>
                )}
              </div>
            ))}
          </div>

          {/* Step content */}
          <div className="space-y-5">
            {/* STEP 1 */}
            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <label className="text-sm font-semibold text-gray-600">Pet Name</label>
                  <input
                    type="text"
                    value={form.petName}
                    onChange={(e) => setForm({ ...form, petName: e.target.value })}
                    className="w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600">Pet Type</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Select Type</option>
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600">Breed</label>
                  <input
                    type="text"
                    value={form.breed}
                    onChange={(e) => setForm({ ...form, breed: e.target.value })}
                    className="w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Age</label>
                    <input
                      value={form.age}
                      onChange={(e) => setForm({ ...form, age: e.target.value })}
                      className="w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-600">Weight (kg)</label>
                    <input
                      value={form.weight}
                      onChange={(e) => setForm({ ...form, weight: e.target.value })}
                      className="w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600">Aggression Level</label>
                  <select
                    value={form.aggression}
                    onChange={(e) => setForm({ ...form, aggression: e.target.value })}
                    className="w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Select Level</option>
                    <option value="1">1 - Low</option>
                    <option value="2">2 - Medium</option>
                    <option value="3">3 - High</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600">Special Notes</label>
                  <textarea
                    rows="3"
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    placeholder="Behaviour notes, allergies, etc."
                    className="w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
            )}
            

           {step === 2 && (
  <div className="space-y-5">

    <div>
      <label className="text-sm font-semibold text-gray-600">Contact Number</label>
      <input
        type="number"
        value={form.mobile}
        required
        onChange={(e) => setForm({ ...form, mobile: e.target.value })}
        className="w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500"
      />
    </div>

    <div>
      <label className="text-sm font-semibold text-gray-600">Address</label>
      <input
        type="text"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
        className="w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500"
      />
    </div>

    <div>
      <label className="text-sm font-semibold text-gray-600">Preferred Date</label>
      <input
        type="date"
        min= {new Date().toISOString().split("T")[0]}
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        className="w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500"
      />
    </div>

    <div>
      <label className="text-sm font-semibold text-gray-600">Preferred Time Slot</label>
      <select
        value={form.timeSlot}
        onChange={(e) => setForm({ ...form, timeSlot: e.target.value })}
        className="w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500"
      >
        <option value="">Select Slot</option>
        <option>10 AM - 12 PM</option>
        <option>12 PM - 2 PM</option>
        <option>2 PM - 4 PM</option>
        <option>4 PM - 6 PM</option>
      </select>
    </div>

    {/* ---------------- ALWAYS VISIBLE TERMS & CONDITIONS ---------------- */}
    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 mb-3">
        Terms & Conditions
      </h3>

      <div className="space-y-2 text-sm text-gray-700 leading-relaxed">
        {termsText.map((t, i) => (
          <p key={i}>• {t}</p>
        ))}
      </div>

      <label className="flex items-center gap-3 mt-4">
        <input
          type="checkbox"
          checked={form.agreedToTerms}
          required
          onChange={(e) =>
            setForm({ ...form, agreedToTerms: e.target.checked })
          }
        />
        <span className="text-gray-700 text-sm">
          I agree to the Terms & Conditions
        </span>
      </label>
    </div>
  </div>
)}






            {/* STEP 3 */}
            {step === 3 && (
              <div className="space-y-6 bg-gray-50 p-5 rounded-2xl border">
                {/* package info */}
                <div className="bg-white p-4 rounded-xl border shadow-sm">
                  <h4 className="text-lg font-semibold flex justify-between text-gray-900">
                    {selectedPackage?.name}
                    <span className="text-orange-600 font-bold">₹{selectedPackage?.price}</span>
                  </h4>
                </div>

                {/* pet details */}
                <div className="bg-white p-4 rounded-xl border shadow-sm space-y-1">
                  <h4 className="text-lg font-semibold text-gray-900">Pet Details</h4>
                  <p><strong>Name:</strong> {form.petName}</p>
                  <p><strong>Type:</strong> {form.type}</p>
                  <p><strong>Breed:</strong> {form.breed}</p>
                  <p><strong>Age:</strong> {form.age}</p>
                  <p><strong>Weight:</strong> {form.weight} kg</p>
                  <p><strong>Aggression Level:</strong> {form.aggression || "—"}</p>

                  <hr className="my-2" />
                  <p><strong>Contact:</strong> {form.mobile}</p>
                  <p><strong>Address:</strong> {form.address}</p>
                  <p><strong>Date:</strong> {form.date}</p>
                  <p><strong>Time Slot:</strong> {form.timeSlot}</p>

                  
                </div>

                {/* addons */}
                <div className="bg-white p-4 rounded-xl border shadow-sm">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Add-Ons</h4>
                  <div className="space-y-2">
                    {addonsList.map((addon) => {
                      const isSelected = form.addons.includes(addon._id);
                      return (
                        <label key={addon._id} className={`flex justify-between items-center p-3 border rounded-lg ${isSelected ? "border-orange-500 bg-orange-50" : "hover:border-orange-400"}`}>
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() =>
                                setForm((prev) => ({
                                  ...prev,
                                  addons: prev.addons.includes(addon._id)
                                    ? prev.addons.filter((id) => id !== addon._id)
                                    : [...prev.addons, addon._id],
                                }))
                              }
                            />
                            <span className="text-gray-800">{addon.name}</span>
                          </div>

                          <span className="text-orange-600 font-semibold">₹{addon.price}</span>
                        </label>
                      );
                    })}
                    {form.addons.length === 0 && <p className="text-gray-500 text-sm">No add-ons selected.</p>}
                  </div>
                </div>

                {/* coupon responsive */}
                <div className="bg-white p-4 rounded-xl border shadow-sm space-y-3">
                  <h4 className="text-lg font-semibold text-gray-900">Apply Coupon</h4>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      placeholder="Enter coupon code"
                      className="flex-1 px-4 py-2 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500"
                    />

                    <div className="flex gap-2">
                      <button
                        onClick={applyCoupon}
                        disabled={appliedCoupon !== null}
                        className={`px-4 py-2 rounded-xl bg-orange-600 text-white font-medium hover:bg-orange-700 disabled:opacity-50 ${appliedCoupon ? "cursor-not-allowed" : ""}`}
                      >
                        {appliedCoupon ? "Applied" : "Apply"}
                      </button>

                      {appliedCoupon && (
                        <button
                          onClick={clearCoupon}
                          className="px-4 py-2 rounded-xl bg-gray-100 text-gray-800 hover:bg-gray-200"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  </div>

                  {appliedCoupon && (
                    <div className="text-sm text-green-700">
                      Coupon <strong>{appliedCoupon}</strong> applied — discount ₹{discount.toFixed(0)}
                    </div>
                  )}
                </div>

                {/* price breakdown */}
                <div className="bg-white p-4 rounded-xl border shadow-sm space-y-3">
                  <h4 className="text-lg font-semibold text-gray-900">Price Breakdown</h4>

                  <div className="flex justify-between text-gray-700"><span>Base Package</span><span className="font-semibold">₹{selectedPackage?.price}</span></div>
                  <div className="flex justify-between text-gray-700"><span>Add-ons Total</span><span className="font-semibold">₹{addonsTotal}</span></div>
                  <div className="flex justify-between text-gray-700"><span>Discount</span><span className="font-semibold text-green-600">-₹{discount.toFixed(0)}</span></div>

                  <hr />

                  <div className="flex justify-between text-lg font-bold"><span>Total Payable</span><span className="text-orange-600">₹{finalTotal.toFixed(0)}</span></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* footer */}
        <div className="px-5 py-4 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.06)] rounded-b-2xl flex justify-between items-center">
          {step > 1 ? (
            <button onClick={() => setStep(step - 1)} className="px-5 py-2.5 w-full max-w-[120px] rounded-full bg-gray-100 hover:bg-gray-200 font-medium text-sm">
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button onClick={handleNext} className="px-7 py-2.5 w-full max-w-[150px] rounded-full bg-orange-600 text-white font-semibold hover:bg-orange-700">
              Next
            </button>
          ) : (
            <ProtectedRoute><button onClick={handleSubmit} className="px-7 py-2.5 w-full max-w-[180px] rounded-full bg-orange-600 text-white font-semibold hover:bg-orange-700">
              Confirm Booking
            </button></ProtectedRoute>
          )}
        </div>
      </div>
    </div>
  );
}
