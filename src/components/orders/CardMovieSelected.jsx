export const CardMovieSelected = ({
  poster,
  title,
  date,
  time,
  genres = [],
}) => {
  return (
    <div className="flex flex-col lg:flex-row max-w-3xl gap-4 p-4 border border-gray-200 rounded-md px-6 lg:px-12 py-10">
      <img
        src={poster || "/placeholder.jpg"}
        alt={title}
        className="object-cover w-24 rounded-md h-36"
      />

      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="mb-2 text-lg font-semibold text-black">
              {title || "Untitled Movie"}
            </h3>

            <div className="flex gap-2 mb-2 flex-wrap">
              {Array.isArray(genres) && genres.length > 0 ? (
                genres.map((g) => (
                  <span
                    key={g.id || g.name}
                    className="px-3 py-1 text-sm text-gray-500 bg-gray-100 rounded-full"
                  >
                    {g.name || g}
                  </span>
                ))
              ) : (
                <span className="px-3 py-1 text-sm text-gray-400 bg-gray-100 rounded-full">
                  No Genre
                </span>
              )}
            </div>

            <p className="text-sm text-gray-700">
              {date || "No date"} - {time || "No time"}
            </p>
          </div>
        </div>

        <div className="flex items-end">
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
            Change
          </button>
        </div>
      </div>
    </div>
  );
};
