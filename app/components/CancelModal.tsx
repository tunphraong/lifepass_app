// // app/components/CancelModal.tsx
// "use client";

// import { useState } from "react";
// // import "react-toastify/dist/ReactToastify.css";

// interface CancelModalProps {
//   bookingId: string;
//   onClose: () => void;
//   // onCancelSuccess: () => void; // Callback for successful cancellation
//   className: string;
//   studioName: string;
//   startTime: string;
//   // endTime: string; // Include endTime if available
//   duration: number;
//   price: number;
// }

// const CancelModal = ({
//   bookingId,
//   onClose,
//   className,
//   studioName,
//   startTime,
//   duration,
//   price,
// }: CancelModalProps) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const newStartTime = new Date(startTime);

//    const formattedDate = newStartTime.toLocaleDateString("vi-VN", {
//      weekday: "long",
//      year: "numeric",
//      month: "numeric",
//      day: "numeric",
//    });

//   // Format the start time
//   const formattedStartTime = newStartTime.toLocaleTimeString("vi-VN", {
//     hour: "numeric",
//     minute: "numeric",
//   });

//   // Calculate the end time based on duration
//   const endTime = new Date(startTime);
//   endTime.setMinutes(endTime.getMinutes() + duration);

//   // Format the end time
//   const formattedEndTime = endTime.toLocaleTimeString("vi-VN", {
//     hour: "numeric",
//     minute: "numeric",
//   });

//   const handleCancel = async () => {
//     setIsLoading(true);
//     setError(null);
//     console.log("booking id handleCancelReservation", bookingId);
//     try {
//       const response = await fetch(`/app/api/bookings/${bookingId}`, {
//         method: "DELETE",
//       });
//       if (response.ok) {
//         onClose("success");
//       } else {
//         const errorData = await response.json(); // Get the error from API response
//         setError(errorData.error || "An error occurred while cancelling."); // Set the error state
//       }
//     } catch (error) {
//       console.error("Error cancelling reservation:", error);
//       setError("An error occurred while cancelling.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div
//       className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50`}
//       onClick={() => onClose()}
//     >
//       <div
//         onClick={(e) => e.stopPropagation()}
//         className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto relative"
//       >
//         <button
//           className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
//           onClick={onClose}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth={1.5}
//             stroke="currentColor"
//             className="w-6 h-6"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M6 18L18 6M6 6l12 12"
//             />
//           </svg>
//         </button>

//         <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">
//           Cancel Reservation?
//         </h2>

//         {/* Class Details */}
//         <div className="py-4">
//           <p className="text-lg font-medium text-gray-800 mb-1">{className}</p>
//           <p className="text-gray-600 text-base mb-1">{studioName}</p>
//           <p className="text-gray-600 text-base">
//             {formattedDate} - {formattedStartTime} to {formattedEndTime} (
//             {duration} min)
//           </p>
//           <p className="text-lg font-semibold text-gray-800 mt-2">
//             We'll refund your{" "}
//             {price.toLocaleString("vi-VN", {
//               style: "currency",
//               currency: "VND",
//             })}
//           </p>
//         </div>

//         {/* Error Message (if any) */}
//         {error && <p className="text-red-500 mt-2">{error}</p>}

//         {/* Buttons */}
//         <div className="flex justify-center mt-4 space-x-2">
//           <button
//             className="px-4 py-2 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-400"
//             onClick={onClose}
//           >
//             No
//           </button>
//           <button
//             className={`px-4 py-2 rounded-md text-white font-bold focus:outline-none focus:ring bg-red-500 hover:bg-red-600 focus:ring-red-400`}
//             onClick={handleCancel}
//             disabled={isLoading}
//           >
//             {isLoading ? "Cancelling..." : "Yes"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CancelModal;
