import styles from "./MovieCard.module.scss";
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  return (
  <Link to={`/movie/${movie.id}`}>
    <article className={styles.card}>
      {posterUrl ? (
        <img
          src={posterUrl}
          alt={movie.title}
          loading="lazy"
        />
      ) : (
        <div className={styles.noPoster}>
          No poster
        </div>
      )}

      <div className={styles.info}>
        <h3>{movie.title}</h3>
        <p>{movie.release_date || "Unknown"}</p>
        <span>
          ⭐ {movie.vote_average?.toFixed(1) ?? "N/A"}
        </span>
      </div>
    </article>
  </Link>
);
}

export default MovieCard;