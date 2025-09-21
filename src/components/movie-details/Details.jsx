import React from "react";

export const Detail = ({
  poster,
  title,
  genres,
  release_date,
  duration,
  director,
  casts,
}) => {
  const posterUrl = poster
    ? `${import.meta.env.VITE_TMDB_API_IMAGE_URL}${poster}`
    : "/images/placeholder-poster.svg";

  return (
    <section className="relative font-[Mulish] bg-white ">
      <div className="flex flex-col lg:flex-row px-6 lg:px-12 py-10 lg:items-center">
        {/* Poster */}
        <div className="flex-shrink-0 -mt-70 lg:-mt-50 mx-auto lg:mx-0">
          <img
            src={posterUrl}
            alt={title}
            className="w-80 sm:w-96 lg:w-64 h-auto rounded shadow-lg"
          />
        </div>

        {/* Info */}
        <div className="mt-6 lg:mt-0 lg:ml-10">
          <h2 className="mb-3 text-2xl font-bold">{title}</h2>

          {/* Genres */}
          <div className="flex flex-row flex-wrap gap-2 mb-4">
            {genres?.map((genre) => (
              <span
                key={genre.id}
                className="bg-[#A0A3BD1A] rounded-[20px] text-[#A0A3BD] px-3 py-1 text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-y-4">
            <div>
              <p className="text-[#8692A6] text-sm">Release date</p>
              <p className="text-[#121212]">{release_date}</p>
            </div>

            <div>
              <p className="text-[#8692A6] text-sm">Directed by</p>
              <p className="text-[#121212]">{director || "—"}</p>
            </div>

            <div>
              <p className="text-[#8692A6] text-sm">Duration</p>
              <p className="text-[#121212]">
                {Math.floor((duration || 0) / 60)} hours {(duration || 0) % 60}{" "}
                minutes
              </p>
            </div>

            <div>
              <p className="text-[#8692A6] text-sm">Casts</p>
              <p className="text-[#121212]">
                {casts?.slice(0, 3).map((actor, index) => (
                  <span key={actor.id}>
                    {actor.name}
                    {index < 2 && ", "}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
