import React, { useEffect, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Detail } from "../components/movie-details/Details.jsx";
import { fetchMovieDetails } from "../store/slices/movieSlice";
import {
  setDate,
  setTime,
  setLocation,
  setSelectedMovie,
  setCinema,
  fetchSchedules,
  fetchLocations,
  fetchTimes,
  fetchCinemas,
  setScheduleId,
} from "../store/slices/orderSlice";

export const MovieDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { movieDetails, isLoading, error } = useSelector(
    (state) => state.movies
  );
  const { isLogin, user } = useSelector((state) => state.auth);

  const {
    date,
    timeId,
    locationId,
    cinema,
    schedules = [],
    locations = [],
    times = [],
    cinemas = [],
    scheduleId,
  } = useSelector((state) => state.order);

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieDetails(id));
      dispatch(fetchSchedules(id));
      dispatch(fetchLocations());
      dispatch(fetchTimes());
      dispatch(fetchCinemas());
    }
  }, [id, dispatch]);

  // Helper function to format date
  const getFormattedDate = useCallback((iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });
  }, []);

  // Helper function to get director
  const getDirector = useCallback((m) => {
    if (!m) return "";
    return m.director || m.director_name || "";
  }, []);

  // Helper function to get cinema logo
  const getCinemaLogo = useCallback((c) => {
    if (!c || !c.name) return "/images/placeholder-cinema.svg";

    // Mapping cinema names to their specific logos
    const logoMap = {
      "ebv.id": "/logos/ebv-id-logo.svg",
      ebv: "/logos/ebv-id-logo.svg",
      hiflix: "/logos/hiflix-logo.svg",
      cineone21: "/logos/cineone-21-logo.svg",
      "cineone 21": "/logos/cineone-21-logo.svg",
      "cinema 21": "/logos/cineone-21-logo.svg",
    };

    // Convert cinema name to lowercase for matching
    const cinemaName = String(c.name).toLowerCase().trim();

    // Check if logo is provided directly from API
    if (c.logo) {
      return c.logo;
    }

    // Check mapping first
    if (logoMap[cinemaName]) {
      return logoMap[cinemaName];
    }

    // Fallback: generate path from name
    const generatedPath = `/logos/${cinemaName.replace(/\s+/g, "-")}-logo.svg`;
    return generatedPath;
  }, []);

  // Memoized function to update schedule ID
  const updateScheduleId = useCallback(
    (selectedDate, selectedTime, selectedLocation, selectedCinema) => {
      if (
        !selectedDate ||
        !selectedTime ||
        !selectedLocation ||
        !selectedCinema
      ) {
        dispatch(setScheduleId(null));
        return;
      }

      const found = schedules.find((s) => {
        const scheduleDate = (s.date || "").split("T")[0];
        return (
          String(scheduleDate) === String(selectedDate) &&
          String(s.time_id) === String(selectedTime) &&
          String(s.location_id) === String(selectedLocation) &&
          String(s.cinema_id) === String(selectedCinema.id)
        );
      });

      dispatch(setScheduleId(found ? found.id : null));
    },
    [schedules, dispatch]
  );

  // Auto-update schedule ID when dependencies change
  useEffect(() => {
    updateScheduleId(date, timeId, locationId, cinema);
  }, [date, timeId, locationId, cinema, updateScheduleId]);

  // Handle date change
  const handleDateChange = useCallback(
    (e) => {
      const selectedDate = e.target.value;
      dispatch(setDate(selectedDate));
      // Reset dependent selections
      if (timeId) {
        dispatch(setTime(null));
      }
      if (locationId) {
        dispatch(setLocation(null));
      }
      if (cinema) {
        dispatch(setCinema(null));
      }
    },
    [dispatch, timeId, locationId, cinema]
  );

  // Handle time change
  const handleTimeChange = useCallback(
    (e) => {
      const selectedId = Number(e.target.value) || null;
      dispatch(setTime(selectedId));
      // Reset dependent selections
      if (locationId) {
        dispatch(setLocation(null));
      }
      if (cinema) {
        dispatch(setCinema(null));
      }
    },
    [dispatch, locationId, cinema]
  );

  // Handle location change
  const handleLocationChange = useCallback(
    (e) => {
      const selectedId = Number(e.target.value) || null;
      dispatch(setLocation(selectedId));
      // Reset cinema if not available for new location
      if (cinema) {
        dispatch(setCinema(null));
      }
    },
    [dispatch, cinema]
  );

  // Handle cinema selection
  const handleCinemaClick = useCallback(
    (c) => {
      const newCinema = cinema?.id === c.id ? null : c;
      dispatch(setCinema(newCinema));
    },
    [cinema, dispatch]
  );

  // Handle book now action
  const handleBookNow = useCallback(() => {
    if (!isLogin) {
      navigate("/login");
      return;
    }

    if (!movieDetails) {
      return;
    }

    if (!date || !timeId || !locationId || !cinema || !scheduleId) {
      alert("Mohon pilih Date, Time, Location, dan Cinema terlebih dahulu");
      return;
    }

    dispatch(
      setSelectedMovie({
        id: movieDetails.id,
        title: movieDetails.title,
        poster_path: movieDetails.poster_path,
        genres: movieDetails.genres,
        release_date: movieDetails.release_date,
        runtime: movieDetails.duration,
        cinema_id: cinema.id,
        user_id: user?.id,
        schedule_id: scheduleId,
      })
    );

    navigate("/order");
  }, [
    isLogin,
    movieDetails,
    date,
    timeId,
    locationId,
    cinema,
    scheduleId,
    user,
    dispatch,
    navigate,
  ]);

  // Memoized filtered options
  const availableDates = useMemo(() => {
    return [
      ...new Set(schedules.map((s) => (s.date || "").split("T")[0])),
    ].sort();
  }, [schedules]);

  const availableTimes = useMemo(() => {
    if (!date) return [];
    return times.filter((t) =>
      schedules.some(
        (s) => (s.date || "").split("T")[0] === date && s.time_id === t.id
      )
    );
  }, [times, schedules, date]);

  const availableLocations = useMemo(() => {
    if (!date || !timeId) return [];
    return locations.filter((l) =>
      schedules.some(
        (s) =>
          (s.date || "").split("T")[0] === date &&
          String(s.time_id) === String(timeId) &&
          s.location_id === l.id
      )
    );
  }, [locations, schedules, date, timeId]);

  const availableCinemas = useMemo(() => {
    if (!date || !timeId || !locationId) return [];
    return cinemas.filter((c) =>
      schedules.some(
        (s) =>
          (s.date || "").split("T")[0] === date &&
          String(s.time_id) === String(timeId) &&
          String(s.location_id) === String(locationId) &&
          s.cinema_id === c.id
      )
    );
  }, [cinemas, schedules, date, timeId, locationId]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!movieDetails) return null;

  const director = getDirector(movieDetails);
  const formattedReleaseDate = getFormattedDate(movieDetails.release_date);

  return (
    <section className="w-full ">
      <img
        src={
          movieDetails.backdrop_path
            ? `${import.meta.env.VITE_TMBD_API_HERO_URL}${
                movieDetails.backdrop_path
              }`
            : "/images/placeholder-backdrop.svg"
        }
        alt={movieDetails.title}
        className="h-[415px] w-full object-cover bg-center"
      />

      <Detail
        poster={movieDetails.poster_path}
        title={movieDetails.title}
        genres={movieDetails.genres}
        release_date={formattedReleaseDate}
        duration={movieDetails.duration}
        director={director}
        casts={movieDetails.casts}
      />

      <div className="px-6 lg:px-12 py-10">
        <div className="flex flex-col items-start justify-center w-full my-5 lg:w-3/4">
          <h2 className="mb-2 text-xl font-semibold">Synopsis</h2>
          <p className="text-base text-gray-700 leading-relaxed">
            {movieDetails.overview}
          </p>
        </div>

        <div className="flex flex-col items-start justify-center w-full gap-4 my-8">
          <h3 className="text-[#121212] font-normal text-[32px]/[45px]">
            Book Tickets
          </h3>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-5">
          {/* Date */}
          <div className="flex-1 w-full">
            <label className="block mb-1 text-sm font-medium">
              Choose Date
            </label>
            <select
              className="w-full px-3 py-2 rounded bg-[#EFF0F6]"
              value={date}
              onChange={handleDateChange}
            >
              <option value="">-- Select Date --</option>
              {availableDates.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Time */}
          <div className="flex-1 w-full">
            <label className="block mb-1 text-sm font-medium">
              Choose Time
            </label>
            <select
              className="w-full px-3 py-2 rounded bg-[#EFF0F6]"
              value={timeId || ""}
              onChange={handleTimeChange}
            >
              <option value="">-- Select Time --</option>
              {availableTimes.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.time}
                </option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div className="flex-1 w-full">
            <label className="block mb-1 text-sm font-medium">
              Choose Location
            </label>
            <select
              className="w-full px-3 py-2 rounded bg-[#EFF0F6]"
              value={locationId || ""}
              onChange={handleLocationChange}
            >
              <option value="">-- Select Location --</option>
              {availableLocations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>

          {/* Filter Button */}
          <div className="flex justify-start w-full lg:w-auto">
            <button className="px-6 py-2 text-white bg-blue-600 rounded w-full lg:w-36 hover:bg-blue-700 mt-6">
              Filter
            </button>
          </div>
        </div>

        {/* Cinemas */}
        {/* Cinemas */}
        <div className="my-8">
          <h4 className="mb-4 text-lg font-semibold">Choose Cinema</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {availableCinemas.map((c) => (
              <div
                key={c.id}
                onClick={() => handleCinemaClick(c)}
                className={`flex items-center justify-center h-24 border rounded cursor-pointer ${
                  cinema?.id === c.id
                    ? "bg-blue-600 border-blue-600"
                    : "bg-white"
                }`}
              >
                <img
                  src={getCinemaLogo(c)}
                  alt={c.name}
                  className="max-h-12"
                  onError={(e) => {
                    // Fallback to placeholder if image fails to load
                    if (e.target.src !== "/images/placeholder-cinema.svg") {
                      e.target.src = "/images/placeholder-cinema.svg";
                    }
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 my-6">
          {[1, 2, 3, 4].map((page) => (
            <button
              key={page}
              className={`px-3 py-1 rounded ${
                page === 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Book Now */}
        <div className="flex justify-center mb-12">
          <button
            onClick={handleBookNow}
            className="px-8 py-3 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Book Now
          </button>
        </div>
      </div>
    </section>
  );
};
