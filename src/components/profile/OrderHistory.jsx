import { useState } from "react";
import { useSelector } from "react-redux";

const DetailsNotPaid = ({ order }) => (
  <section className="p-4 text-gray-400">
    <h5 className="font-semibold mb-4 text-black">Ticket Information</h5>

    <div className="mb-3 flex justify-between items-center">
      <span>No.Rekening Virtual :</span>
      <div className="flex items-center gap-2">
        <span className="font-bold">12321328913829724</span>
        <button className="px-2 py-1 text-xs border rounded">Copy</button>
      </div>
    </div>

    <div className="mb-3 flex justify-between items-center">
      <span>Total Payment :</span>
      <span className="font-semibold">${order.total.toLocaleString()}</span>
    </div>

    <p className="text-gray-500 mt-2">
      Pay this payment bill before it is due, on{" "}
      <span className="text-red-500">June 23, 2023</span>. If the bill has not
      been paid by the specified time, it will be forfeited.
    </p>
    <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded">
      Check Payment
    </button>
  </section>
);

const formatDate = (dateStr) => {
  const dateObj = new Date(dateStr);
  return dateObj.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const DetailsPaid = ({ order }) => (
  <section className="p-4">
    <h5 className="font-semibold mb-4">Ticket Information</h5>

    <div className="flex items-start justify-between">
      <div className="flex-shrink-0">
        <img src="/images/qr-code.svg" alt="QR Code" className="w-24 h-24" />
      </div>

      <div className="grid grid-cols-3 gap-x-8 gap-y-2 text-sm flex-1 px-8">
        <span className="text-gray-500">Category</span>
        <span className="text-gray-500">Time</span>
        <span className="text-gray-500">Seats</span>

        <span className="font-medium">{order.category}</span>
        <span className="font-medium">{order.time}</span>
        <span className="font-medium">{order.seats.join(", ")}</span>

        <span className="text-gray-500">Movie</span>
        <span className="text-gray-500">Date</span>
        <span className="text-gray-500">Count</span>

        <span className="font-medium">{order.movieTitle}</span>
        <span className="font-medium">{formatDate(order.date)}</span>
        <span className="font-medium">{order.count} pcs</span>
      </div>

      <div className="flex flex-col justify-center items-end min-w-[100px]">
        <span className="text-gray-500">Total</span>
        <span className="font-semibold text-lg">
          ${order.total.toLocaleString()}
        </span>
      </div>
    </div>
  </section>
);

export const OrderHistory = () => {
  const { orders } = useSelector((state) => state.history);
  const [showDetails, setShowDetails] = useState(null);

  if (!orders || orders.length === 0) {
    return <p className="text-center mt-6">No order history available.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {orders.map((order, idx) => {
        // const paid = order.paid || true;
        const paid = order.paid ?? false;

        return (
          <div
            key={idx}
            className="bg-white rounded-lg shadow font-[Mulish] p-2"
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-300">
              <div>
                <span className="block text-sm text-gray-500">
                  {order.date} - {order.time}
                </span>
                <span className="block font-semibold">
                  {order.selectedMovie?.title || "-"}
                </span>
                <span className="block text-xs text-gray-500">
                  {order.location} - {order.cinema?.name || "-"}
                </span>
              </div>
              {order.cinema?.logo && (
                <img
                  src={order.cinema.logo}
                  alt="cinema logo"
                  className="h-8"
                />
              )}
            </div>

            <div className="flex justify-between items-center p-4">
              <div className="flex gap-2">
                <span
                  className={`min-w-[140px] text-center px-4 py-2 text-sm font-semibold rounded ${
                    paid
                      ? "bg-gray-200 text-gray-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  Ticket {paid ? "Used" : "In Active"}
                </span>

                <span
                  className={`min-w-[140px] text-center px-4 py-2 text-sm font-semibold rounded ${
                    paid
                      ? "bg-blue-100 text-blue-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {paid ? "Paid" : "Not Paid"}
                </span>
              </div>

              <button
                onClick={() => setShowDetails(showDetails === idx ? null : idx)}
                className="text-gray-400"
              >
                {showDetails === idx ? "Hide Details" : "Show Details"}
              </button>
            </div>

            {showDetails === idx &&
              (paid ? (
                <DetailsPaid
                  order={{
                    category: "Regular",
                    time: order.time,
                    seats: order.selectedSeats || [],
                    movieTitle: order.selectedMovie?.title || "-",
                    date: order.date,
                    location: order.location,
                    cinema: order.cinema?.name || "-",
                    count: order.selectedSeats?.length || 0,
                    total: order.totalPayment ?? 0,
                  }}
                />
              ) : (
                <DetailsNotPaid order={{ total: order.totalPayment ?? 0 }} />
              ))}
          </div>
        );
      })}
    </div>
  );
};
