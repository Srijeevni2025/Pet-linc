import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../Store/Context";
import { CreateBooking } from "../Features/Booking/mutationFunction";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { GetAddOns } from "../Features/Packages/queryFunction";
import ProtectedRoute from "./Protect";
import { CheckCircle, MapPin } from "lucide-react";

export default function BookingModal() {
  const navigate = useNavigate();
  const [locLoading, setLocLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const {
    setShowBookingModal,
    selectedPackage,
    setSelectedPackage,
    form,
    setForm,
  } = useContext(GlobalContext);

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
    which costs 100/- per peice which will be handed over to you.",
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

  useEffect(() => {
    setForm((f) => ({ ...f, discount: discount, couponId: couponId }));
  }, [couponId, discount]);

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
      toast.error(
        "Something went wrong!!! Please contact petlinc team to book a session.",
      );
      navigate("/");
    },
  });

  const closeModal = () => {
    setShowBookingModal(false);
    setSelectedPackage(null);
  };

  function handleNext() {
    let error = {};

    if (step === 1) error = validateStep1(form);
    if (step === 2) error = validateStep2(form);

    if (Object.keys(error).length > 0) {
      setErrors(error);
      return;
    }
    setErrors({});
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

  const grandTotal =
    Number(selectedPackage?.price || 0) + Number(addonsTotal || 0);
  const finalTotal = Math.max(
    Math.round((grandTotal - discount) * 100) / 100,
    0,
  );

  // coupon application (uses currently computed grandTotal)
  function applyCoupon() {
    const code = (coupon || "").trim().toUpperCase();
    if (!code) {
      toast.error("Enter a coupon code");
      return;
    }
    // Example coupon rules — change to real validation (API) as desired
    for (let index = 0; index < coupans.length; index++) {
      if (coupans[index].coupan === code) {
        const amt = Math.round(grandTotal * coupans[index].percent) / 100;
        setDiscount(amt);
        setAppliedCoupon(code);
        setCouponId(coupans[index]._id);
        toast.success(`Coupon Applied: ${coupans[index].percent}% OFF`);
        break;
      } else {
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
    const e = {};
    if (!form.petName?.trim()) e.petName = "Pet name is required";
    if (!form.type) e.type = "Pet type is required";
    if (!form.breed?.trim()) e.breed = "Breed is required";
    if (!form.age) e.age = "Age is required";
    if (!form.weight) e.weight = "Weight is required";
    if (!form.aggression) e.aggression = "Aggression level is required";
    return e;
  }

  function validateStep2(form) {
    // if (!form.mobile) return "Mobile number is required";
    // if (form.mobile.length < 10) return "Enter valid mobile number";
    // if (!form.address) return "Address is required";
    // if (!form.pincode) return "Pincode is required";
    // if (!form.date) return "Preferred date is required";
    // if (!form.timeSlot) return "Time slot is required";
    // if (!form.agreedToTerms) return "You must accept Terms & Conditions";
    // return null;
    const e = {};

    if (!/^\d{10}$/.test(form.mobile || ""))
      e.mobile = "Enter a valid 10-digit mobile number";

    if (!form.address?.trim()) e.address = "Service address is required";

    if (!form.pincode || form.pincode.length !== 6)
      e.pincode = "Enter valid pincode";

    if (!form.date) e.date = "Preferred date is required";
    if (!form.timeSlot) e.timeSlot = "Select a time slot";

    if (!form.agreedToTerms)
      e.agreedToTerms = "You must accept terms & conditions";

    // 🔥 GPS intentionally ignored
    return e;
  }

  // capturing the current location: lat and lng

  function captureExactLocation() {
    if (!navigator.geolocation) {
      toast.error("Location not supported on this browser");
      return;
    }

    setLocLoading(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;

        setForm((f) => ({
          ...f,
          lat: latitude,
          lng: longitude,
        }));

        toast.success("Exact location captured successfully");
        setLocLoading(false);
      },
      (err) => {
        toast.error("Unable to capture location. Please allow permission.");
        setLocLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
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
            <p className="text-gray-500 text-sm mt-1">
              {selectedPackage?.name}
            </p>
          </div>

          {/* progress */}
          <div className="flex items-center justify-between mb-8 md:mb-10 px-3 md:px-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex-1 flex items-center">
                <div
                  className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-bold ${
                    step >= s
                      ? "bg-orange-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {s}
                </div>

                {s < 3 && (
                  <div
                    className={`flex-1 h-[2px] mx-1 md:mx-2 ${step > s ? "bg-orange-500" : "bg-gray-200"}`}
                  ></div>
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
                  <label className="text-sm font-semibold text-gray-600">
                    Pet Name
                  </label>
                  <input
                    type="text"
                    value={form.petName}
                    onChange={(e) => {
                      setForm({ ...form, petName: e.target.value });
                      setErrors((prev) => ({ ...prev, petName: undefined }));
                    }}
                    className={`w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50
    ${errors.petName ? "border-red-500" : "border-gray-300"}
    focus:ring-2 focus:ring-orange-500`}
                  />
                  {errors.petName && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.petName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    Pet Type
                  </label>
                  <select
                    value={form.type}
                    onChange={(e) => {
                      setForm({ ...form, type: e.target.value });
                      setErrors((prev) => ({ ...prev, type: undefined }));
                    }}
                    //className="w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500"
                    className={`w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50
    ${errors.type ? "border-red-500" : "border-gray-300"}
    focus:ring-2 focus:ring-orange-500`}
                  >
                    <option value="">Select Type</option>
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                  </select>
                  {errors.type && (
                    <p className="text-xs text-red-600 mt-1">{errors.type}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    Breed
                  </label>
                  <input
                    type="text"
                    value={form.breed}
                    onChange={(e) => {
                      setForm({ ...form, breed: e.target.value });
                      setErrors((prev) => ({ ...prev, breed: undefined }));
                    }}
                    //className="w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500"

                    className={`w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50
    ${errors.breed ? "border-red-500" : "border-gray-300"}
    focus:ring-2 focus:ring-orange-500`}
                  />
                  {errors.breed && (
                    <p className="text-xs text-red-600 mt-1">{errors.breed}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-600">
                      Age
                    </label>
                    <input
                      type="number"
                      value={form.age}
                      onChange={(e) => {
                        setForm({ ...form, age: e.target.value });
                        setErrors((prev) => ({ ...prev, age: undefined }));
                      }}
                      //className="w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500"
                      className={`w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50
    ${errors.age ? "border-red-500" : "border-gray-300"}
    focus:ring-2 focus:ring-orange-500`}
                    />
                    {errors.age && (
                      <p className="text-xs text-red-600 mt-1">{errors.age}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-600">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      value={form.weight}
                      onChange={(e) => {
                        setForm({ ...form, weight: e.target.value });
                        setErrors((prev) => ({ ...prev, weight: undefined }));
                      }}
                      //className="w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500"
                      className={`w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50
    ${errors.weight ? "border-red-500" : "border-gray-300"}
    focus:ring-2 focus:ring-orange-500`}
                    />
                    {errors.weight && (
                      <p className="text-xs text-red-600 mt-1">
                        {errors.weight}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    Aggression Level
                  </label>
                  <select
                    value={form.aggression}
                    onChange={(e) => {
                      setForm({ ...form, aggression: e.target.value });
                      setErrors((prev) => ({ ...prev, aggression: undefined }));
                    }}
                    //className="w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500"
                    className={`w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50
    ${errors.aggression ? "border-red-500" : "border-gray-300"}
    focus:ring-2 focus:ring-orange-500`}
                  >
                    <option value="">Select Level</option>
                    <option value="1">1 - Low</option>
                    <option value="2">2 - Medium</option>
                    <option value="3">3 - High</option>
                  </select>
                  {errors.aggression && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.aggression}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    Special Notes
                  </label>
                  <textarea
                    rows="3"
                    value={form.notes}
                    onChange={(e) =>
                      setForm({ ...form, notes: e.target.value })
                    }
                    placeholder="Behaviour notes, allergies, etc."
                    className="w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    minLength="10"
                    maxLength="10"
                    pattern="[0-9]{10}"
                    value={form.mobile}
                    required
                    title="Only digits are allowed."
                    onChange={(e) =>{
                      setForm({ ...form, mobile: e.target.value })
                      setErrors((prev)=>({...prev, mobile:undefined}))}
                    }
                    className={`w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50
    ${errors.mobile ? "border-red-500" : "border-gray-300"}
    focus:ring-2 focus:ring-orange-500`}
                    //className="w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500"
                  />
                  {errors.mobile && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.mobile}
                    </p>
                  )}
                  
                </div>

                {/* address: input in form*/}
                {/* <div>
      <label className="text-sm font-semibold text-gray-600">Address</label>
      <input
        type="text"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
        className="w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500"
      />
    </div> */}
                {/* <div>
                  <label className="text-sm font-semibold text-gray-600">
                    Service Address
                  </label>

                  <div className="flex gap-2 mt-1">
                    <input
                      type="text"
                      value={form.address}
                      onChange={(e) =>
                        setForm({ ...form, address: e.target.value })
                      }
                      placeholder="House no, area, city"
                      className="flex-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500"
                    />

                    <button
                      type="button"
                      onClick={captureExactLocation}
                      disabled={locLoading}
                      className="px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 disabled:opacity-50"
                    >
                      {locLoading ? "Detecting..." : "Get exact location"}
                    </button>
                  </div>
                </div>

                <div> */}
                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    Service Address
                  </label>

                  <input
                    type="text"
                    value={form.address}
                    onChange={(e) =>{
                      setForm({ ...form, address: e.target.value })
                       setErrors((prev)=>({...prev, address:undefined}))}
                    }
                    placeholder="House no, area, city"
                    //className="w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500"
                  className={`w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50
    ${errors.address ? "border-red-500" : "border-gray-300"}
    focus:ring-2 focus:ring-orange-500`}

                  />
                  {errors.address && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.address}
                    </p>
                  )}

                  {/* GPS helper row */}
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-xs text-gray-500">
                      Helps our groomer reach you easily
                    </p>

                    {!form.lat ? (
                      <button
                        type="button"
                        onClick={captureExactLocation}
                        disabled={locLoading}
                        className="
          flex items-center gap-1.5 
          text-xs font-medium text-orange-600 
          hover:text-orange-700
          disabled:opacity-50
        "
                      >
                        <MapPin size={14} />
                        {locLoading
                          ? "Detecting..."
                          : "Add live location (optional)"}
                      </button>
                    ) : (
                      <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
                        <CheckCircle size={14} />
                        Location added
                      </span>
                    )}
                  </div>
                </div>

                {/*pincode input field*/}
                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    Pincode
                  </label>
                  <input
                    type="number"
                    required
                    value={form.pincode}
                    onChange={(e) =>{
                      setForm({ ...form, pincode: e.target.value })
                       setErrors((prev)=>({...prev, address:undefined}))}
                    }
                    //className="w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500"
                  className={`w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50
    ${errors.pincode ? "border-red-500" : "border-gray-300"}
    focus:ring-2 focus:ring-orange-500`}

                  />
                  {errors.pincode && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.pincode}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    Preferred Time Slot
                  </label>
                  <select
                    value={form.timeSlot}
                    onChange={(e) =>
                      setForm({ ...form, timeSlot: e.target.value })
                    }
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
                    <span className="text-orange-600 font-bold">
                      ₹{selectedPackage?.price}
                    </span>
                  </h4>
                </div>

                {/* pet details */}
                <div className="bg-white p-4 rounded-xl border shadow-sm space-y-1">
                  <h4 className="text-lg font-semibold text-gray-900">
                    Pet Details
                  </h4>
                  <p>
                    <strong>Name:</strong> {form.petName}
                  </p>
                  <p>
                    <strong>Type:</strong> {form.type}
                  </p>
                  <p>
                    <strong>Breed:</strong> {form.breed}
                  </p>
                  <p>
                    <strong>Age:</strong> {form.age}
                  </p>
                  <p>
                    <strong>Weight:</strong> {form.weight} kg
                  </p>
                  <p>
                    <strong>Aggression Level:</strong> {form.aggression || "—"}
                  </p>

                  <hr className="my-2" />
                  <p>
                    <strong>Contact:</strong> {form.mobile}
                  </p>
                  <p>
                    <strong>Address:</strong> {form.address}
                  </p>
                  <p>
                    <strong>Date:</strong> {form.date}
                  </p>
                  <p>
                    <strong>Time Slot:</strong> {form.timeSlot}
                  </p>
                </div>

                {/* addons */}
                <div className="bg-white p-4 rounded-xl border shadow-sm">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Add-Ons
                  </h4>
                  <div className="space-y-2">
                    {addonsList.map((addon) => {
                      const isSelected = form.addons.includes(addon._id);
                      return (
                        <label
                          key={addon._id}
                          className={`flex justify-between items-center p-3 border rounded-lg ${isSelected ? "border-orange-500 bg-orange-50" : "hover:border-orange-400"}`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() =>
                                setForm((prev) => ({
                                  ...prev,
                                  addons: prev.addons.includes(addon._id)
                                    ? prev.addons.filter(
                                        (id) => id !== addon._id,
                                      )
                                    : [...prev.addons, addon._id],
                                }))
                              }
                            />
                            <span className="text-gray-800">{addon.name}</span>
                          </div>

                          <span className="text-orange-600 font-semibold">
                            ₹{addon.price}
                          </span>
                        </label>
                      );
                    })}
                    {form.addons.length === 0 && (
                      <p className="text-gray-500 text-sm">
                        No add-ons selected.
                      </p>
                    )}
                  </div>
                </div>

                {/* coupon responsive */}
                <div className="bg-white p-4 rounded-xl border shadow-sm space-y-3">
                  <h4 className="text-lg font-semibold text-gray-900">
                    Apply Coupon
                  </h4>

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
                      Coupon <strong>{appliedCoupon}</strong> applied — discount
                      ₹{discount.toFixed(0)}
                    </div>
                  )}
                </div>

                {/* price breakdown */}
                <div className="bg-white p-4 rounded-xl border shadow-sm space-y-3">
                  <h4 className="text-lg font-semibold text-gray-900">
                    Price Breakdown
                  </h4>

                  <div className="flex justify-between text-gray-700">
                    <span>Base Package</span>
                    <span className="font-semibold">
                      ₹{selectedPackage?.price}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Add-ons Total</span>
                    <span className="font-semibold">₹{addonsTotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Discount</span>
                    <span className="font-semibold text-green-600">
                      -₹{discount.toFixed(0)}
                    </span>
                  </div>

                  <hr />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Payable</span>
                    <span className="text-orange-600">
                      ₹{finalTotal.toFixed(0)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* footer */}
        <div className="px-5 py-4 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.06)] rounded-b-2xl flex justify-between items-center">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-5 py-2.5 w-full max-w-[120px] rounded-full bg-gray-100 hover:bg-gray-200 font-medium text-sm"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              onClick={handleNext}
              className="px-7 py-2.5 w-full max-w-[150px] rounded-full bg-orange-600 text-white font-semibold hover:bg-orange-700"
            >
              Next
            </button>
          ) : (
            <ProtectedRoute>
              <button
                onClick={handleSubmit}
                className="px-7 py-2.5 w-full max-w-[180px] rounded-full bg-orange-600 text-white font-semibold hover:bg-orange-700"
              >
                Confirm Booking
              </button>
            </ProtectedRoute>
          )}
        </div>
      </div>
    </div>
  );
}
