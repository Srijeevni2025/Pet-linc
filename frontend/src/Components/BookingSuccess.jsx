import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function BookingSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => {
      navigate("/");   // redirect home
    }, 2500);

    return () => clearTimeout(t);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999]">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-[90%] max-w-md text-center animate-fadeIn">
        <div className="text-6xl text-green-600 mb-4">✓</div>
        <h2 className="text-2xl font-bold text-gray-800">Booking Confirmed!</h2>
        <p className="text-gray-600 mt-2">
          Thank you. Your grooming booking has been created successfully.
        </p>

        <p className="text-xs text-gray-500 mt-3">
          Redirecting to home...
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-6 w-full py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
}
