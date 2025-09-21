import { SeatInput } from "./SeatInput";

export const Seat = ({
  selectedSeats = [],
  rows = [],
  leftSeats = [],
  rightSeats = [],
  handleChange,
}) => {
  return (
    <>
      <div className="font-[Mulish] font-bold text-[24px]">
        Choose Your Seat
      </div>

      <div className="p-4 space-y-4 overflow-x-auto">
        <div className="font-semibold text-center text-gray-500">Screen</div>

        <div className="flex justify-center gap-2">
          <div className="flex flex-col gap-1 mr-1">
            {rows.map((row) => (
              <div
                key={row}
                className="flex items-center justify-center w-8 h-8 text-sm text-gray-700"
              >
                {row}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {leftSeats.map((seatId) => (
              <SeatInput
                key={seatId}
                id={seatId}
                name={seatId}
                selectedSeats={selectedSeats}
                onChange={handleChange}
              />
            ))}
          </div>

          <div className="w-6"></div>

          <div className="grid grid-cols-7 gap-2">
            {rightSeats.map((seatId) => (
              <SeatInput
                key={seatId}
                id={seatId}
                name={seatId}
                selectedSeats={selectedSeats}
                onChange={handleChange}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-2">
          <div className="w-8"></div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 7 }, (_, i) => (
              <div
                key={`L-${i}`}
                className="w-8 h-8 text-sm text-center text-gray-700"
              >
                {i + 1}
              </div>
            ))}
          </div>

          <div className="w-4"></div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 7 }, (_, i) => (
              <div
                key={`R-${i}`}
                className="w-8 h-8 text-sm text-center text-gray-700"
              >
                {i + 8}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
