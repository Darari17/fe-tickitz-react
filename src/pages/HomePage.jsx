import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchUpcomingMovies,
  fetchPopularMovies,
} from "../store/slices/movieSlice";
import { SectionHero } from "../components/home/SectionHero";
import { SectionChoose } from "../components/home/SectionChoose";
import { SectionWatched } from "../components/home/SectionWatched";
import { SectionUpcoming } from "../components/home/SectionUpcoming";
import { Subscriber } from "../components/global/Subscriber";

export const HomePage = () => {
  const dispatch = useDispatch();
  const { upcoming, popular, isLoading, error } = useSelector(
    (state) => state.movies
  );

  useEffect(() => {
    dispatch(fetchUpcomingMovies({ page: 1 }));
    dispatch(fetchPopularMovies({ page: 1 }));
  }, [dispatch]);

  const mapGenres = (genresArray) => {
    if (!genresArray) return [];
    return genresArray.map((g) => g.name);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <SectionHero />
      <SectionChoose />
      <SectionWatched
        key={"Movie Watched"}
        mapGenres={mapGenres}
        movies={popular}
      />
      <SectionUpcoming
        key={"Movie Upcoming"}
        mapGenres={mapGenres}
        movies={upcoming}
      />
      <Subscriber />
    </>
  );
};
