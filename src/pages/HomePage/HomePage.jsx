import { useState } from "react";
import { useTrendingMovies } from "../../hooks/useMovies";
import MovieCard from "../../components/MovieCard/MovieCard";
import styles from "./HomePage.module.scss";
import HeroSection from "../../components/HeroSection/HeroSection";

function HomePage() {
  const [timeWindow, setTimeWindow] = useState("day");

  const {
    data,
    isPending,
    isError,
    error,
  } = useTrendingMovies(timeWindow);
  return (
    <>
    <HeroSection />
    <div className="container">
      <section className={styles.trending}>
        <div className={styles.heading}>
          <h2>Trending</h2>

          <div className={styles.tabs}>
            <button
              onClick={() => setTimeWindow("day")}
              className={
                timeWindow === "day"
                  ? styles.active
                  : ""
              }
            >
              Today
            </button>

            <button
              onClick={() => setTimeWindow("week")}
              className={
                timeWindow === "week"
                  ? styles.active
                  : ""
              }
            >
              This Week
            </button>
          </div>
        </div>

        {isPending && <p>Loading movies...</p>}

        {isError && (
          <p>Error: {error.message}</p>
        )}

        {data && (
          <div className={styles.movieList}>
            {data.results.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
              />
            ))}
          </div>
        )}
      </section>
    </div>
    </>
  );
}

export default HomePage;