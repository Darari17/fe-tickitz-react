import { StepOrder } from "../components/orders/StepOrder";
import { CardMovieSelected } from "../components/orders/CardMovieSelected";
import { Seat } from "../components/orders/Seat";
import { SeatingKey } from "../components/orders/SeatingKey";
import { ModalMovieSelected } from "../components/orders/ModalMovieSelected";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedSeats } from "../store/slices/orderSlice";

export const OrderPage = () => {
  const dispatch = useDispatch();

  const {
    selectedMovie = null,
    date = "",
    time = "",
    // location = "",
    cinema = null,
    selectedSeats = [],
  } = useSelector((state) => state.order || {});

  const rows = ["A", "B", "C", "D", "E", "F", "G"];

  const generateSeats = (startCol) => {
    const seats = [];
    for (let row of rows) {
      for (let col = startCol; col < startCol + 7; col++) {
        seats.push(`${row}${col}`);
      }
    }
    return seats;
  };

  const leftSeats = generateSeats(1);
  const rightSeats = generateSeats(8);

  const handleChange = (e) => {
    const name = e?.target?.name;
    if (!name) return;

    const newSeats = selectedSeats.includes(name)
      ? selectedSeats.filter((s) => s !== name)
      : [...selectedSeats, name];

    dispatch(setSelectedSeats(newSeats));
  };

  const pricePerTicket = 10;

  return (
    <div className="bg-[#A0A3BD33] py-10">
      <StepOrder />

      <section className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-5 px-6 lg:px-12 py-10">
        <div className="p-5 bg-white rounded-md flex-2">
          <CardMovieSelected
            poster={
              selectedMovie?.poster_path
                ? `${import.meta.env.VITE_TMDB_API_IMAGE_URL}${
                    selectedMovie.poster_path
                  }`
                : "/images/placeholder-poster.svg"
            }
            title={selectedMovie?.title || "Untitled Movie"}
            date={date || "-"}
            time={time || "-"}
            genres={selectedMovie?.genres || []}
          />

          <Seat
            handleChange={handleChange}
            leftSeats={leftSeats}
            rightSeats={rightSeats}
            rows={rows}
            selectedSeats={selectedSeats}
          />

          <SeatingKey />
        </div>

        <div className="flex-1">
          <ModalMovieSelected
            movieSelected={selectedMovie?.title || "Unknown"}
            date={date || ""}
            time={time || ""}
            seatSelected={selectedSeats}
            cinemaLogo={cinema?.logo || "/images/placeholder-cinema.svg"}
            cinemaName={cinema?.name || "Unknown Cinema"}
            pricePerTicket={pricePerTicket}
          />
        </div>
      </section>
    </div>
  );
};
