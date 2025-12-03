import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../Store/Context";
import { CreateBooking } from "../Features/Booking/mutationFunction";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { GetAddOns } from "../Features/Packages/queryFunction";

export default function BookingModal() {
  const navigate = useNavigate();
  const { setShowBookingModal, selectedPackage, setSelectedPackage } =
    useContext(GlobalContext);
    
  const [form, setForm] = useState({
    productId: "",
    petName: "Bruno",
    type: "Dog",
    breed: "Labrador",
    age: "2",
    weight: "3",
    notes: "Very aggressive",
    address: "Ruby park, Kolkata",
    date: "",
    timeSlot: "",
    addons: [],
  });

  const { data:addonsList , isPending} = useQuery({
    queryKey: ["addonsList"],
    queryFn: GetAddOns,
  });
  // const addonsList = [
  //   { id: "AD01", name: "Anti Tick & Flea (Ridd)", price: 250 },
  //   { id: "AD02", name: "Anti Tick & Flea (Spot On)", price: 500 },
  //   { id: "AD03", name: "Oil Massage", price: 300 },
  //   { id: "AD04", name: "Anal Gland Cleaning", price: 300 },
  //   { id: "AD05", name: "De-shedding", price: 400 },
  //   { id: "AD06", name: "De-matting", price: 500 },
  // ];

  useEffect(() => {
    setForm((form) => ({ ...form, productId: selectedPackage?._id }));
  }, [selectedPackage]);

  const [step, setStep] = useState(1);

  const { mutate } = useMutation({
    mutationFn: CreateBooking,
    onSuccess: async () => {
      toast.success("Booking created successfully.");
      setShowBookingModal(false);
      setSelectedPackage(null);
      navigate("/booking-success"); // 🟧 go to success page
    },
    onError: async () => {
      setShowBookingModal(false);
      setSelectedPackage(null);
      toast.error("You are not logged in!!! Please login.");
      navigate("/signin");
    },
  });
  const closeModal = () => {
    setShowBookingModal(false);
    setSelectedPackage(null);
  };

  function handleSubmit() {
    console.log(form);
    mutate(form);
  }

  const addonsTotal = form.addons
    .map((id) => addonsList.find((a) => a._id === id)?.price || 0)
    .reduce((a, b) => a + b, 0);

  const grandTotal = (selectedPackage?.price * 1 || 0) + addonsTotal * 1;
 if(isPending){
  return <h1>loading</h1>
  
 }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex justify-center items-center z-[999] p-2 md:p-4 animate-fadeIn">
      {/* MODAL CONTAINER */}
      <div
        className="
    bg-white 
    rounded-2xl 
    w-full 
    max-w-xl 
    shadow-2xl 
    relative 
    animate-slideUp 
    flex 
    flex-col
    max-h-[90vh] 
    overflow-hidden
  "
      >
        {/* SCROLL AREA */}
        <div className="overflow-y-auto px-5 py-6 md:px-8 md:py-8">
          {/* CLOSE BUTTON */}
          <button
            onClick={closeModal}
            className="absolute top-3 right-3 md:top-4 md:right-4 text-gray-500 hover:text-gray-700 transition text-xl md:text-2xl"
          >
            ✖
          </button>

          {/* HEADER */}
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
              Book Grooming
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {selectedPackage?.name}
            </p>
          </div>

          {/* STEP PROGRESS */}
          <div className="flex items-center justify-between mb-8 md:mb-10 px-3 md:px-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex-1 flex items-center">
                <div
                  className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-bold 
              ${
                step >= s
                  ? "bg-orange-600 text-white"
                  : "bg-gray-200 text-gray-500"
              }
            `}
                >
                  {s}
                </div>

                {s < 3 && (
                  <div
                    className={`flex-1 h-[2px] mx-1 md:mx-2 transition-all ${
                      step > s ? "bg-orange-500" : "bg-gray-200"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>

          {/* CONTENT AREA */}
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
                    onChange={(e) =>
                      setForm({ ...form, petName: e.target.value })
                    }
                    className="w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500 outline-none"
                    placeholder="e.g. Bruno"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    Pet Type
                  </label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500 outline-none"
                  >
                    <option value="">Select Type</option>
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    Breed
                  </label>
                  <input
                    type="text"
                    value={form.breed}
                    onChange={(e) =>
                      setForm({ ...form, breed: e.target.value })
                    }
                    className="w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500 outline-none"
                    placeholder="e.g. Labrador"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-600">
                      Age
                    </label>
                    <input
                      value={form.age}
                      onChange={(e) =>
                        setForm({ ...form, age: e.target.value })
                      }
                      className="w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500 outline-none"
                      placeholder="2 years"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-600">
                      Weight (kg)
                    </label>
                    <input
                      value={form.weight}
                      onChange={(e) =>
                        setForm({ ...form, weight: e.target.value })
                      }
                      className="w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500 outline-none"
                      placeholder="10 kg"
                    />
                  </div>
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
                    placeholder="Allergies, behaviour notes, etc."
                    className="w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500 outline-none"
                  ></textarea>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    Address
                  </label>
                  <input
                    type="text"
                    value={form.address}
                    onChange={(e) =>
                      setForm({ ...form, address: e.target.value })
                    }
                    className="w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500 outline-none"
                    placeholder="House no, area, city"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500 outline-none"
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
                    className="w-full mt-1 px-4 py-2.5 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500 outline-none"
                  >
                    <option value="">Select Slot</option>
                    <option>10 AM - 12 PM</option>
                    <option>12 PM - 2 PM</option>
                    <option>2 PM - 4 PM</option>
                    <option>4 PM - 6 PM</option>
                  </select>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {/* {step === 3 && (
              <div className="space-y-3 text-gray-700 bg-gray-50 p-5 rounded-2xl border">
                <p>
                  <strong>Pet Name:</strong> {form.petName}
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
                  <strong>Weight:</strong> {form.weight}
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

                <hr />

                <p className="text-lg font-semibold">
                  Package:{" "}
                  <span className="text-orange-600">
                    {selectedPackage?.name}
                  </span>
                </p>
                <p className="text-lg font-bold">
                  Price:{" "}
                  <span className="text-orange-600">
                    {selectedPackage?.price}
                  </span>
                </p>
              </div>
            )} */}
            {step === 3 && (
              <div className="space-y-6 bg-gray-50 p-5 rounded-2xl border">
                {/* SECTION TITLE */}
                <h3 className="text-xl font-bold text-gray-900">
                  Review Your Booking
                </h3>

                {/* PACKAGE INFO */}
                <div className="bg-white p-4 rounded-xl shadow-sm border">
                  <h4 className="text-lg font-semibold text-gray-900 flex justify-between">
                    {selectedPackage?.name}
                    <span className="text-orange-600 font-bold">
                      ₹{selectedPackage?.price}
                    </span>
                  </h4>
                  <p className="text-gray-500 text-sm mt-1">
                    Base grooming package selected
                  </p>
                </div>

                {/* PET DETAILS */}
                <div className="bg-white p-4 rounded-xl shadow-sm border space-y-1">
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

                  <hr className="my-2" />

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

                {/* ADDONS SECTION */}
                <div className="bg-white p-4 rounded-xl shadow-sm border">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Add-Ons
                  </h4>

                  {addonsList.map((addon) => {console.log("addon:", addon)
                    const isSelected = form.addons.includes(addon._id);

                    return (
                      <label
                        key={addon._id}
                        className={`flex justify-between items-center p-3 rounded-lg border mb-2 cursor-pointer transition 
                        ${
                          isSelected
                            ? "border-orange-500 bg-orange-50"
                            : "hover:border-orange-400"
                        }
                      `}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => {
                              setForm((prev) => ({
                                ...prev,
                                addons: prev.addons.includes(addon._id)
                                  ? prev.addons.filter((a) => a !== addon._id)
                                  : [...prev.addons, addon._id],
                              }));
                            }}
                            className="w-5 h-5 text-orange-600"
                          />
                          <span className="text-gray-800 font-medium">
                            {addon.name}
                          </span>
                        </div>

                        <span className="text-orange-600 font-semibold">
                          ₹{addon.price}
                        </span>
                      </label>
                    );
                  })}

                  {/* Nothing selected */}
                  {form.addons.length === 0 && (
                    <p className="text-gray-500 text-sm">
                      No add-ons selected.
                    </p>
                  )}
                </div>

                {/* PRICE BREAKDOWN */}
                <div className="bg-white p-4 rounded-xl shadow-sm border space-y-3">
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

                  {/* Add-ons detailed lines */}
                  {form.addons.length > 0 && (
                    <ul className="ml-4 text-sm text-gray-600 space-y-1">
                      {form.addons.map((id) => {
                        const addon = addonsList.find((i) => i._id === id);
                        return (
                          <li key={id} className="flex justify-between">
                            <span>- {addon.name}</span>
                            <span>₹{addon.price}</span>
                          </li>
                        );
                      })}
                    </ul>
                  )}

                  <hr />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Payable</span>
                    <span className="text-orange-600">₹{grandTotal}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* FOOTER BUTTONS — STICKY */}
        <div
          className="
        px-5 py-4 
        bg-white 
        shadow-[0_-4px_20px_rgba(0,0,0,0.06)] 
        rounded-b-2xl 
        flex 
        justify-between 
        items-center
      "
        >
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-5 py-2.5 w-full max-w-[120px] rounded-full bg-gray-100 hover:bg-gray-200 transition text-gray-700 font-medium text-sm"
            >
              Back
            </button>
          ) : (
            <div></div>
          )}

          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-7 py-2.5 w-full max-w-[150px] rounded-full bg-orange-600 text-white text-sm font-semibold hover:bg-orange-700 shadow-md transition"
            >
              Next
            </button>
          ) : (
            <button
              onClick={() => {
                // TODO: Send to backend

                handleSubmit();
              }}
              className="px-7 py-2.5 w-full max-w-[180px] rounded-full bg-orange-600 text-white text-sm font-semibold hover:bg-orange-700 shadow-md transition"
            >
              Confirm Booking
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
