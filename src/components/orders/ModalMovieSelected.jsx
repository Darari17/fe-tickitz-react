import { Link } from "react-router";

export const ModalMovieSelected = ({
  movieSelected,
  date,
  time,
  seatSelected = [],
  cinemaLogo,
  cinemaName,
  pricePerTicket = 10,
}) => {
  const seats = Array.isArray(seatSelected) ? seatSelected : [];
  const totalPrice = seats.length * pricePerTicket;

  return (
    <div className="w-175 lg:w-full">
      <section className="p-6 bg-white rounded-lg shadow-md">
        <div className="mb-4 text-center">
          <img
            src={cinemaLogo || "/images/placeholder-cinema.svg"}
            alt={cinemaName || "Cinema"}
            className="h-6 mx-auto mb-2"
          />
          <h3 className="font-sans text-xl font-semibold">
            {cinemaName || "Unknown Cinema"}
          </h3>
        </div>

        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex justify-between">
            <span className="text-gray-500">Movie selected</span>
            <span className="font-medium text-right">
              {movieSelected || "Unknown"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">
              {date || "Tuesday, 07 July 2020"}
            </span>
            <span className="font-medium">{time || "13:00pm"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">One ticket price</span>
            <span className="font-medium">${pricePerTicket}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Seat choosed</span>
            <span className="font-medium">
              {seats.length > 0 ? seats.join(", ") : "-"}
            </span>
          </div>
        </div>

        <div className="my-4 border-b border-gray-200"></div>

        <div className="flex items-center justify-between">
          <span className="text-base font-semibold">Total Payment</span>
          <span className="text-lg font-semibold text-blue-600">
            ${totalPrice}
          </span>
        </div>
      </section>

      <Link
        to={seats.length > 0 ? "/payment" : "#"}
        className={`block w-full py-3 mt-4 font-medium text-center text-white rounded-md 
          ${
            seats.length > 0
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
      >
        {seats.length > 0 ? "Checkout now" : "Select seats first"}
      </Link>
    </div>
  );
};
