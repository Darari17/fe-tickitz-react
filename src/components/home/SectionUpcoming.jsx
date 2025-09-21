import { useRef } from "react";
import { CardMovie } from "../global/CardMovie";

export const SectionUpcoming = ({ movies, mapGenres }) => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section className="px-6 lg:px-12 py-10 flex flex-col my-5 gap-5">
      <div className="flex flex-row justify-between ">
        <div>
          <div className="font-[Mulish] font-bold text-[18px]/[34px] text-[#1D4ED8]">
            UPCOMING MOVIES
          </div>
          <div className="font-[Mulish] font-bold text-[32px]/[45px] text-[#121212]">
            Exciting Movie Coming Soon
          </div>
        </div>

        <div className="flex gap-1 items-end">
          <button
            onClick={scrollLeft}
            className="bg-[#A0A3BD] w-[40px] h-[40px] rounded-full flex justify-center items-center"
          >
            <img src="/logos/arrow-up.svg" alt="Arrow" />
          </button>
          <button
            onClick={scrollRight}
            className="bg-[#1D4ED8] w-[40px] h-[40px] rounded-full rotate-180 flex justify-center items-center"
          >
            <img src="/logos/arrow-up.svg" alt="Arrow" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex flex-row gap-4 overflow-x-hidden overflow-y-hidden h-[520px] border-gray-50"
      >
        {movies?.map((movie, idx) => {
          const genreNames = mapGenres(movie.genres);
          return <CardMovie key={idx} movie={movie} genreNames={genreNames} />;
        })}
      </div>
    </section>
  );
};
