import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { resetOrder } from "../../store/slices/orderSlice";

export const SectionResultRight = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    selectedMovie,
    date,
    time,
    selectedSeats = [],
  } = useSelector((state) => state.order || {});

  const pricePerTicket = 10;
  const totalPayment = selectedSeats.length * pricePerTicket;

  const onDone = () => {
    dispatch(resetOrder());
    navigate("/profile");
  };

  const onDownload = () => {
    console.log("🎫 Download ticket data:", {
      movie: selectedMovie?.title,
      category: selectedMovie?.category,
      date,
      time,
      seats: selectedSeats,
      totalPayment,
    });
  };

  return (
    <section className="flex-1 flex flex-col justify-center items-center w-full bg-[#A0A3BD33] font-[Mulish]">
      <div className="flex flex-col justify-start items-center bg-white lg:my-10 mx-2 md:mx-6 rounded-lg p-0 w-full lg:w-auto">
        <div className="flex flex-col items-center w-full">
          {/* QR Code */}
          <div className="relative border-b border-dashed border-[#dedede] w-full flex justify-center">
            <img
              src="/images/qr-code.svg"
              alt="QR Code"
              className="w-[100px] h-[100px] md:w-[140px] md:h-[140px] m-2 md:m-5"
            />
            <div className="absolute top-full left-0 w-8 h-8 bg-[#ecedf2] border-2 border-[#ecedf2] rounded-full -translate-y-1/2 -translate-x-1/2"></div>
            <div className="absolute right-0 top-full w-8 h-8 bg-[#ecedf2] border-2 border-[#ecedf2] rounded-full -translate-y-1/2 translate-x-1/2"></div>
          </div>
        </div>

        {/* Detail tiket */}
        <div className="grid gap-5 w-full py-[30px] grid-cols-1 lg:grid-cols-2 px-4">
          <div className="flex flex-col items-start justify-center">
            <div className="text-xs text-[#aaaaaa]">Movie</div>
            <div className="font-semibold text-sm text-[#14142b]">
              {selectedMovie?.title || "-"}
            </div>
          </div>

          <div className="flex flex-col items-start justify-center">
            <div className="text-xs text-[#aaaaaa]">Category</div>
            <div className="font-semibold text-sm text-[#14142b]">
              {selectedMovie?.category || "-"}
            </div>
          </div>

          <div className="flex flex-col items-start justify-center">
            <div className="text-xs text-[#aaaaaa]">Date</div>
            <div className="font-semibold text-sm text-[#14142b]">
              {date || "-"}
            </div>
          </div>

          <div className="flex flex-col items-start justify-center">
            <div className="text-xs text-[#aaaaaa]">Time</div>
            <div className="font-semibold text-sm text-[#14142b]">
              {time || "-"}
            </div>
          </div>

          <div className="flex flex-col items-start justify-center">
            <div className="text-xs text-[#aaaaaa]">Count</div>
            <div className="font-semibold text-sm text-[#14142b]">
              {selectedSeats.length} pcs
            </div>
          </div>

          <div className="flex flex-col items-start justify-center">
            <div className="text-xs text-[#aaaaaa]">Seats</div>
            <div className="font-semibold text-sm text-[#14142b]">
              {selectedSeats.join(", ") || "-"}
            </div>
          </div>
        </div>

        {/* Total */}
        <div className="flex flex-col md:flex-row justify-around items-center border border-[#dedede] w-full md:w-[80%] h-auto md:h-[50px] rounded mb-[30px] px-4 gap-1 md:gap-0 py-2 md:py-0">
          <div className="text-base font-normal">Total</div>
          <div className="text-base font-bold">${totalPayment.toFixed(2)}</div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col justify-center items-center gap-[15px] w-full px-2 lg:px-6 my-5">
        <button
          onClick={onDownload}
          className="flex flex-row justify-center items-center border border-blue-700 rounded-lg w-full max-w-[400px] h-[44px] md:h-[50px] gap-3"
        >
          <img src="/logos/download-icon.svg" alt="Download" />
          <span className="text-[16px] font-bold text-blue-700 leading-[28px]">
            Download
          </span>
        </button>

        <button
          onClick={onDone}
          className="flex justify-center items-center bg-blue-700 text-white rounded w-full max-w-[400px] h-[44px] lg:h-[50px] font-bold text-[16px]"
        >
          Done
        </button>
      </div>
    </section>
  );
};
