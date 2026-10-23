import { useParams } from "react-router-dom";
import {
  useMovieDetail,
  useMovieCredits,
} from "../../hooks/useMovies";

import styles from "./MovieDetailPage.module.scss";

function MovieDetailPage() {
  const { id } = useParams();

  const {
    data: movie,
    isPending,
    isError,
    error,
  } = useMovieDetail(id);

  const { data: credits } = useMovieCredits(id);

  if (isPending) {
    return <p className="container">Loading movie...</p>;
  }

  if (isError) {
    return <p className="container">{error.message}</p>;
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  return (
    <>
      <section
        className={styles.hero}
        style={{
          backgroundImage: backdropUrl
            ? `linear-gradient(
                rgba(3, 37, 65, 0.85),
                rgba(3, 37, 65, 0.85)
              ), url("${backdropUrl}")`
            : "none",
        }}
      >
        <div className={`container ${styles.heroContent}`}>
          {posterUrl && (
            <img
              className={styles.poster}
              src={posterUrl}
              alt={movie.title}
            />
          )}

          <div className={styles.details}>
            <h1>
              {movie.title}
              {movie.release_date && (
                <span>
                  {" "}({movie.release_date.slice(0, 4)})
                </span>
              )}
            </h1>

            <p>
              {movie.genres.map((genre) => genre.name).join(", ")}
            </p>

            <p>⭐ {movie.vote_average.toFixed(1)} / 10</p>

            {movie.tagline && <em>{movie.tagline}</em>}

            <h2>Overview</h2>
            <p>{movie.overview}</p>
          </div>
        </div>
      </section>

      <section className={`container ${styles.castSection}`}>
        <h2>Top Billed Cast</h2>

        <div className={styles.castList}>
          {credits?.cast?.slice(0, 10).map((person) => (
            <div key={person.cast_id ?? person.credit_id} className={styles.castCard}>
              {person.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                  alt={person.name}
                  loading="lazy"
                />
              ) : (
                <div className={styles.noProfile}>
                  No photo
                </div>
              )}

              <h3>{person.name}</h3>
              <p>{person.character}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default MovieDetailPage;