// import { useQuery } from "@tanstack/react-query";
// import { GetMyBookings } from "../Features/Booking/queryFunction";
// import { useNavigate } from "react-router-dom";

// export default function MyBookings() {
//   const navigate = useNavigate();

//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["myBookings"],
//     queryFn: GetMyBookings,
//   });

//   if (isLoading) {
//     return (
//       <div className="p-6 text-center text-gray-500">Loading bookings...</div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="p-6 text-center text-red-500">
//         Failed to load bookings.
//       </div>
//     );
//   }

//   const bookings = data?.data || [];

//   return (
//     <div className="p-4 md:p-6 max-w-3xl mx-auto">
//       {/* HEADER */}
//       <h1 className="text-2xl md:text-3xl font-extrabold mb-6 text-gray-900">
//         My Bookings
//       </h1>

//       {/* EMPTY STATE */}
//       {bookings.length === 0 && (
//         <div className="text-center text-gray-600 mt-10">
//           <p>You don’t have any bookings yet.</p>
//           <button
//             onClick={() => navigate("/")}
//             className="mt-4 px-5 py-3 bg-orange-600 text-white rounded-xl"
//           >
//             Book a Grooming Now
//           </button>
//         </div>
//       )}

//       {/* BOOKINGS LIST */}
//       <div className="space-y-5">
//         {bookings.map((booking) => (
//           <div
//             key={booking._id}
//             className="border rounded-2xl p-5 bg-white shadow-sm hover:shadow-md transition"
//           >
//             {/* HEADER */}
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-lg font-semibold text-gray-800">
//                 {booking.package?.name || "Grooming Package"}
//               </h2>

//               {/* STATUS */}
//               <span
//                 className={`px-3 py-1 text-xs rounded-full text-white ${
//                   booking.status === "completed"
//                     ? "bg-green-600"
//                     : booking.status === "cancelled"
//                     ? "bg-red-500"
//                     : "bg-orange-500"
//                 }`}
//               >
//                 {booking.status?.toUpperCase()}
//               </span>
//             </div>

//             {/* INFO */}
//             <div className="text-sm text-gray-700 space-y-1">
//               <p>
//                 <strong>Pet:</strong> {booking.petName} ({booking.breed})
//               </p>
//               <p>
//                 <strong>Date:</strong> {booking.date}
//               </p>
//               <p>
//                 <strong>Time Slot:</strong> {booking.timeSlot}
//               </p>
//               <p>
//                 <strong>Address:</strong> {booking.address}
//               </p>
//               <p>
//                 <strong>Price:</strong>{" "}
//                 <span className="text-orange-600 font-semibold">
//                   ₹{booking.package?.price}
//                 </span>
//               </p>
//             </div>

//             {/* BUTTON */}
//             <button
//               onClick={() => navigate(`/booking/${booking._id}`)}
//               className="mt-4 w-full py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-sm font-medium"
//             >
//               View Details
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import { useQuery } from "@tanstack/react-query";
import { GetMyBookings } from "../Features/Booking/queryFunction";
import { useNavigate } from "react-router-dom";

export default function MyBookings() {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["myBookings"],
    queryFn: GetMyBookings,
  });

  if (isLoading) {
    return (
      <div className="p-6 text-center text-gray-500">Loading bookings...</div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-center text-red-500">
        Failed to load bookings.
      </div>
    );
  }

  const bookings = data?.data || [];

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto">
      {/* HEADER */}
      <h1 className="text-2xl md:text-3xl font-extrabold mb-6 text-gray-900">
        My Bookings
      </h1>

      {/* EMPTY STATE */}
      {bookings.length === 0 && (
        <div className="text-center text-gray-600 mt-10">
          <p>You don’t have any bookings yet.</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-5 py-3 bg-orange-600 text-white rounded-xl"
          >
            Book a Grooming Now
          </button>
        </div>
      )}

      {/* BOOKINGS LIST */}
      <div className="space-y-5">
        {bookings.map((booking) => {
          const addonsTotal = booking.addons?.reduce(
            (sum, addon) => sum + addon.price,
            0
          );

          const basePrice = booking.productId.price?.price || 0;
          const totalPrice = basePrice + addonsTotal;

          return (
            <div
              key={booking._id}
              className="border rounded-2xl p-5 bg-white shadow-sm hover:shadow-md transition"
            >
              {/* HEADER */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {booking.package?.name || "Grooming Package"}
                </h2>

                <span
                  className={`px-3 py-1 text-xs rounded-full text-white ${
                    booking.status === "completed"
                      ? "bg-green-600"
                      : booking.status === "cancelled"
                      ? "bg-red-500"
                      : "bg-orange-500"
                  }`}
                >
                  {booking.status?.toUpperCase()}
                </span>
              </div>

              {/* DETAILS */}
              <div className="text-sm text-gray-700 space-y-1">
                <p>
                  <strong>Pet:</strong> {booking.petName} ({booking.breed})
                </p>
                <p>
                  <strong>Type:</strong> {booking.petType}
                </p>
                <p>
                  <strong>Date:</strong> {new Date(booking.date).toDateString()}
                </p>
                <p>
                  <strong>Time Slot:</strong> {booking.timeSlot}
                </p>
                <p>
                  <strong>Address:</strong> {booking.address}
                </p>
              </div>

              {/* ADD-ONS SECTION */}
              <div className="mt-4 bg-gray-50 p-4 rounded-xl border">
                <h3 className="text-sm font-bold text-gray-900 mb-2">
                  Add-ons Selected
                </h3>

                {booking.addons.length === 0 && (
                  <p className="text-gray-500 text-sm">No add-ons selected.</p>
                )}

                {booking.addons.length > 0 && (
                  <ul className="space-y-2 text-sm">
                    {booking.addons.map((addon) => (
                      <li
                        key={addon._id}
                        className="flex justify-between items-center border-b pb-1"
                      >
                        <span className="text-gray-800">{addon.name}</span>
                        <span className="text-orange-600 font-semibold">
                          ₹{addon.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* PRICE BREAKDOWN */}
              <div className="mt-4 bg-white p-4 border rounded-xl">
                <h3 className="text-sm font-bold text-gray-900 mb-2">
                  Price Breakdown
                </h3>

                <div className="flex justify-between text-sm">
                  <span>Base Package</span>
                  <span className="font-semibold text-gray-700">
                    ₹{booking.productId.price}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span>Add-ons Total</span>
                  <span className="font-semibold text-gray-700">
                    ₹{addonsTotal}
                  </span>
                </div>

                <hr className="my-2" />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total Paid</span>
                  <span className="text-orange-600">₹{totalPrice}</span>
                </div>
              </div>

              {/* BUTTON */}
              <button
                onClick={() => navigate(`/booking/${booking._id}`)}
                className="mt-4 w-full py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-sm font-medium"
              >
                View Full Details
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
