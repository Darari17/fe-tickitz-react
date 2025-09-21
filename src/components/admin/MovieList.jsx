import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../../store/slices/movieSlice";
import { FaEye, FaPen, FaTrash } from "react-icons/fa";
import { AddNewMovie } from "./AddNewMovie";

export const MovieList = () => {
  const dispatch = useDispatch();
  const { movies, isLoading, error } = useSelector((state) => state.movies);
  const [showAddMovie, setShowAddMovie] = useState(false);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  if (isLoading) return <p className="text-center py-5">Loading...</p>;
  if (error) return <p className="text-center py-5 text-red-500">{error}</p>;

  if (showAddMovie) {
    return (
      <div
        className="bg-gray-300 min-h-screen w-full flex justify-center items-start py-10 px-4"
        onClick={() => setShowAddMovie(false)}
      >
        <div className="w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
          <AddNewMovie />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">List Movie</h2>
          <div className="flex gap-5">
            <input type="date" className="bg-gray-200 rounded-lg px-4" />
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer"
              onClick={() => setShowAddMovie(true)}
            >
              Add Movies
            </button>
          </div>
        </div>

        <div className="overflow-x-auto lg:overflow-x-visible">
          <table className="w-full border-collapse font-[Mulish] px-6 lg:px-12 py-10 rounded-md">
            <thead>
              <tr className="bg-gray-100 text-center text-[#1F4173]">
                <th className="p-3">No</th>
                <th className="p-3">Thumbnail</th>
                <th className="p-3">Movie Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Released Date</th>
                <th className="p-3">Duration</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {movies.slice(0, 10).map((movie, index) => (
                <tr key={movie.id} className="border-t border-gray-300">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt={movie.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="p-3 text-blue-600 cursor-pointer">
                    {movie.title}
                  </td>
                  <td className="p-3">Action, Adventure</td>
                  <td className="p-3">
                    {new Date(movie.release_date).toLocaleString("en-US", {
                      dateStyle: "short",
                    })}
                  </td>
                  <td className="p-3">2 Hours 15 Minute</td>
                  <td className="p-3 flex gap-2">
                    <button className="bg-blue-500 text-white p-2 rounded-md cursor-pointer">
                      <FaEye />
                    </button>
                    <button className="bg-purple-500 text-white p-2 rounded-md cursor-pointer">
                      <FaPen />
                    </button>
                    <button className="bg-red-500 text-white p-2 rounded-md cursor-pointer">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {[1, 2, 3, 4].map((page) => (
            <button
              key={page}
              className={`px-3 py-1 rounded-md ${
                page === 1
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-gray-300 "
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
