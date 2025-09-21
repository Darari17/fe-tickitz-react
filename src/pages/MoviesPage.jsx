/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router";
import { fetchMovies, fetchGenres } from "../store/slices/movieSlice";
import { CardMovie } from "../components/global/CardMovie";
import { Subscriber } from "../components/global/Subscriber";

export const MoviesPage = () => {
  const dispatch = useDispatch();
  const { movies, genres, isLoading, error, meta } = useSelector(
    (state) => state.movies
  );

  const [searchParams, setSearchParams] = useSearchParams();

  // page from URL and local currentPage
  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  const [currentPage, setCurrentPage] = useState(pageParam);

  // search input with debounce
  const [debouncedQuery, setDebouncedQuery] = useState(
    searchParams.get("query") || ""
  );

  // fetch genres once on mount
  useEffect(() => {
    dispatch(fetchGenres());
  }, []);

  // keep local currentPage in sync with URL
  useEffect(() => {
    setCurrentPage(pageParam || 1);
  }, [pageParam]);

  // debounce -> update query param (which also resets page to 1)
  useEffect(() => {
    const t = setTimeout(() => {
      updateParam("query", debouncedQuery || null);
    }, 500);
    return () => clearTimeout(t);
  }, [debouncedQuery]);

  // fetch movies when searchParams change
  useEffect(() => {
    const q = searchParams.get("query") || "";
    const genre = parseInt(searchParams.get("genre") || "0", 10);
    const page = parseInt(searchParams.get("page") || "1", 10);
    dispatch(fetchMovies({ page, search: q, genre }));
  }, [searchParams]);

  // Update query params helper (and sync local page)
  const updateParam = (key, value) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (value === null || value === undefined || value === "") {
        newParams.delete(key);
      } else {
        newParams.set(key, String(value));
      }

      // reset page to 1 if changing something other than page
      if (key !== "page") newParams.set("page", "1");
      return newParams;
    });

    if (key === "page") {
      setCurrentPage(Number(value) || 1);
    } else {
      setCurrentPage(1);
    }
  };

  // safe lists
  const safeMovies = Array.isArray(movies) ? movies : [];
  const safeGenres = Array.isArray(genres) ? genres : [];
  const searchQuery = (searchParams.get("query") || "").toLowerCase();

  // pagination helpers: windowed pages with ellipsis
  const totalPages = Number(meta?.total_pages) || 1;
  const getPagination = (cur, total) => {
    const pages = [];
    if (total <= 9) {
      for (let i = 1; i <= total; i++) pages.push(i);
      return pages;
    }
    // always include first
    pages.push(1);

    const left = Math.max(2, cur - 2);
    const right = Math.min(total - 1, cur + 2);

    if (left > 2) pages.push("left-ellipsis");

    for (let i = left; i <= right; i++) pages.push(i);

    if (right < total - 1) pages.push("right-ellipsis");

    pages.push(total);
    return pages;
  };

  const pagesToShow = getPagination(currentPage, totalPages);

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <>
      {/* HERO */}
      <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
        <img
          src="/images/bg-hero.svg"
          alt="Hero Background"
          className="w-full h-full object-cover bg-center relative z-0"
        />
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-24 gap-4 z-20">
          <p className="text-white text-sm font-semibold tracking-wide">
            LIST MOVIE OF THE WEEK
          </p>
          <h1 className="text-white text-4xl md:text-5xl font-medium max-w-[700px] leading-snug">
            Experience the Magic of Cinema: Book Your Tickets Today
          </h1>
        </div>
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
          <img src="/logos/hero-slider.svg" alt="Slider Indicator" />
        </div>
      </section>

      {/* SEARCH + FILTER BAR */}
      <section className="flex flex-col md:flex-row justify-between px-6 lg:px-12 py-8 gap-8">
        {/* LEFT COLUMN: Label di atas, input di bawah (lebih sempit) */}
        <div className="flex flex-col w-full md:w-1/3 max-w-sm">
          <span className="font-medium mb-2">Cari Event</span>
          <input
            type="text"
            placeholder="Cari Event"
            className="border rounded-md px-4 py-2 text-gray-700 placeholder:text-gray-400 w-full md:w-[250px]"
            value={debouncedQuery}
            onChange={(e) => setDebouncedQuery(e.target.value)}
          />
        </div>

        {/* RIGHT COLUMN: Filter lebih lebar */}
        <div className="flex flex-col w-full md:w-2/3 max-w-3xl">
          <span className="text-gray-500 font-medium mb-2">Filter</span>
          <div className="flex flex-row flex-wrap gap-2">
            {safeGenres.map((g) => {
              const active =
                String(searchParams.get("genre") || "") === String(g.id);
              return (
                <button
                  key={g.id}
                  className={`px-4 py-1 rounded-md transition ${
                    active
                      ? "bg-blue-600 text-white"
                      : "bg-transparent text-gray-600"
                  }`}
                  onClick={() => updateParam("genre", active ? null : g.id)}
                >
                  {g.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* MOVIES GRID */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center px-6 lg:px-12 py-6">
        {safeMovies
          .filter((m) => (m.title || "").toLowerCase().includes(searchQuery))
          .map((movie) => (
            <CardMovie
              key={movie.id}
              movie={movie}
              IMAGE_URL={import.meta.env.VITE_TMDB_API_IMAGE_URL}
              genreNames={(movie.genres || []).map((g) => g.name)}
            />
          ))}
      </section>

      {/* PAGINATION: windowed (ellipsis) */}
      <section className="flex items-center justify-center gap-3 mx-25 mb-20">
        {/* Prev */}
        <button
          onClick={() => {
            const newPage = currentPage > 1 ? currentPage - 1 : 1;
            updateParam("page", String(newPage));
          }}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-600 text-white"
          aria-label="Previous page"
        >
          <img src="/logos/arrow-right.svg" alt="" className="rotate-180" />
        </button>

        {/* Page buttons */}
        <div className="flex items-center gap-2">
          {pagesToShow.map((p, idx) =>
            p === "left-ellipsis" || p === "right-ellipsis" ? (
              <span
                key={p + idx}
                className="w-10 h-10 flex items-center justify-center text-gray-500"
              >
                ...
              </span>
            ) : (
              <button
                key={p}
                onClick={() => updateParam("page", String(p))}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                  currentPage === p
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {p}
              </button>
            )
          )}
        </div>

        {/* Next */}
        <button
          onClick={() => {
            const newPage =
              currentPage < totalPages ? currentPage + 1 : totalPages;
            updateParam("page", String(newPage));
          }}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-600 text-white"
          aria-label="Next page"
        >
          <img src="/logos/arrow-right.svg" alt="" />
        </button>
      </section>

      <Subscriber />
    </>
  );
};
