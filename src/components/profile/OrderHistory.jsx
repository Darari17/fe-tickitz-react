import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchHistory } from "../../store/slices/historySlice";

const getCinemaLogo = (cinema) => {
  if (!cinema || !cinema.name) return "/images/placeholder-cinema.svg";
  const logoMap = {
    "ebv.id": "/logos/ebv-id-logo.svg",
    ebv: "/logos/ebv-id-logo.svg",
    hiflix: "/logos/hiflix-logo.svg",
    cineone21: "/logos/cineone-21-logo.svg",
    "cineone 21": "/logos/cineone-21-logo.svg",
    "cinema 21": "/logos/cineone-21-logo.svg",
  };
  const name = String(cinema.name).toLowerCase().trim();
  if (logoMap[name]) return logoMap[name];
  return `/logos/${name.replace(/\s+/g, "-")}-logo.svg`;
};

const CinemaLogo = ({ logoUrl, alt }) => {
  const [finalLogo, setFinalLogo] = useState(logoUrl);
  return (
    <img
      src={finalLogo}
      alt={alt}
      className="h-8 object-contain"
      onError={() => {
        if (finalLogo !== "/images/placeholder-cinema.svg") {
          setFinalLogo("/images/placeholder-cinema.svg");
        }
      }}
    />
  );
};

const formatDate = (d) => {
  if (!d) return "-";
  const dt = new Date(d);
  return isNaN(dt)
    ? d
    : dt.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
};

const DetailsNotPaid = ({ order }) => {
  const total = order.totalPayment ?? order.total ?? 0;
  return (
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
        <span className="font-semibold">${Number(total).toLocaleString()}</span>
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
};

const DetailsPaid = ({ order }) => {
  const seats = order.selectedSeats ?? order.seats ?? [];
  const total = order.totalPayment ?? order.total ?? 0;
  return (
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
          <span className="font-medium">{order.category ?? "Regular"}</span>
          <span className="font-medium">{order.time}</span>
          <span className="font-medium">{seats.join(", ")}</span>
          <span className="text-gray-500">Movie</span>
          <span className="text-gray-500">Date</span>
          <span className="text-gray-500">Count</span>
          <span className="font-medium">{order.movieTitle}</span>
          <span className="font-medium">{formatDate(order.date)}</span>
          <span className="font-medium">{seats.length} pcs</span>
        </div>
        <div className="flex flex-col justify-center items-end min-w-[100px]">
          <span className="text-gray-500">Total</span>
          <span className="font-semibold text-lg">
            ${Number(total).toLocaleString()}
          </span>
        </div>
      </div>
    </section>
  );
};

export const OrderHistory = () => {
  const dispatch = useDispatch();
  const { orders, status, error } = useSelector((state) => state.history);
  const [showDetails, setShowDetails] = useState(null);

  useEffect(() => {
    dispatch(fetchHistory());
  }, [dispatch]);

  const getMovieTitle = (o) =>
    [
      o?.selectedMovie?.title,
      o?.movieTitle,
      o?.movie?.title,
      o?.title,
      o?.name,
    ].find((x) => typeof x === "string" && x.trim()) ?? "-";

  if (status === "loading") {
    return <p className="text-center mt-6">Loading order history...</p>;
  }

  if (status === "failed") {
    return (
      <p className="text-center mt-6 text-red-500">
        Error: {error || "Failed to fetch data"}
      </p>
    );
  }

  if (!orders || orders.length === 0) {
    return <p className="text-center mt-6">No order history available.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {orders.map((o, idx) => {
        const paid = o.paid ?? false;
        const movieTitle = getMovieTitle(o);
        return (
          <div
            key={o.id ?? idx}
            className="bg-white rounded-lg shadow font-[Mulish] p-2"
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-300">
              <div>
                <span className="block text-sm text-gray-500">
                  {formatDate(o.date)} - {o.time}
                </span>
                <span className="block font-semibold">{movieTitle}</span>
                <span className="block text-xs text-gray-500">
                  {o.location ?? "-"} - {o.cinema_name ?? "-"}
                </span>
              </div>
              {(o.cinema_name || o.cinema?.name) && (
                <CinemaLogo
                  logoUrl={getCinemaLogo({
                    name: o.cinema?.name ?? o.cinema_name,
                  })}
                  alt={o.cinema?.name ?? o.cinema_name ?? "cinema"}
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
                <DetailsPaid order={{ ...o, movieTitle }} />
              ) : (
                <DetailsNotPaid order={o} />
              ))}
          </div>
        );
      })}
    </div>
  );
};
