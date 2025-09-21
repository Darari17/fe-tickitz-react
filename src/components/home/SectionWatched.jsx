import { CardMovie } from "../global/CardMovie";

export const SectionWatched = ({ movies, mapGenres }) => {
  return (
    <section className="px-6 lg:px-12 py-10 flex flex-col my-5 gap-5">
      <div className="text-[#1D4ED8] font-bold text-[18px]/[34px] font-[Mulish] text-center">
        Movies
      </div>
      <div className="text-[#121212] font-normal text-[32px]/[45px] font-[Mulish] text-center">
        Exciting Movies That Should Be Watched Today
      </div>

      <div className="flex flex-row gap-4 overflow-x-auto overflow-y-hidden h-[520px] border-gray-50">
        {movies?.map((movie, idx) => {
          const genreNames = mapGenres(movie.genres);
          return <CardMovie key={idx} movie={movie} genreNames={genreNames} />;
        })}
      </div>

      <div className="mt-4 flex flex-row justify-center items-center">
        <button className="flex items-center gap-2 text-blue-600 hover:underline">
          <span>View All</span>
          <img
            src="/logos/view-all-arrow.svg"
            alt="Arrow"
            className="w-4 h-4"
          />
        </button>
      </div>
    </section>
  );
};
