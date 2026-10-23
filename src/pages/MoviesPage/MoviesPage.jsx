import { useSearchParams } from "react-router-dom";

import { useDiscoverMovies } from "../../hooks/useMovies";
import MovieCard from "../../components/MovieCard/MovieCard";
import styles from "./MoviesPage.module.scss";

const genres = [
  { id: "", name: "All Genres" },
  { id: "28", name: "Action" },
  { id: "35", name: "Comedy" },
  { id: "27", name: "Horror" },
  { id: "18", name: "Drama" },
  { id: "878", name: "Science Fiction" },
];

const sortOptions = [
  { value: "popularity.desc", label: "Most Popular" },
  { value: "popularity.asc", label: "Least Popular" },
  { value: "vote_average.desc", label: "Highest Rated" },
  { value: "primary_release_date.desc", label: "Newest Releases" },
];

function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const rawPage = Number(searchParams.get("page"));
  const page = Number.isSafeInteger(rawPage) && rawPage > 0
    ? rawPage
    : 1;

  const requestedGenre = searchParams.get("genre") ?? "";
  const genre = genres.some((item) => item.id === requestedGenre)
    ? requestedGenre
    : "";

  const requestedSort = searchParams.get("sort");
  const sort = sortOptions.some((item) => item.value === requestedSort)
    ? requestedSort
    : "popularity.desc";

  const {
    data,
    isPending,
    isError,
    error,
    isFetching,
  } = useDiscoverMovies({ page, genre, sort });

  const updateFilters = (changes) => {
    setSearchParams((previous) => {
      const params = new URLSearchParams(previous);

      Object.entries(changes).forEach(([key, value]) => {
        if (value) {
          params.set(key, String(value));
        } else {
          params.delete(key);
        }
      });

      return params;
    });
  };

  const changePage = (newPage) => {
    updateFilters({ page: newPage });
  };

  return (
    <div className="container">
      <section className={styles.moviesPage}>
        <h1>Discover Movies</h1>

        <div className={styles.filters}>
          <label>
            Genre
            <select
              value={genre}
              onChange={(e) =>
                updateFilters({
                  genre: e.target.value,
                  page: 1,
                })
              }
            >
              {genres.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Sort by
            <select
              value={sort}
              onChange={(e) =>
                updateFilters({
                  sort: e.target.value,
                  page: 1,
                })
              }
            >
              {sortOptions.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {isPending && <p>Loading movies...</p>}

        {isError && <p>Error: {error.message}</p>}

        {data && (
          <>
            {data.results.length === 0 ? (
              <p>No movies match these filters.</p>
            ) : (
              <div className={styles.movieGrid}>
                {data.results.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            )}

            {data.total_pages > 1 && (
              <div className={styles.pagination}>
                <button
                  disabled={page <= 1 || isFetching}
                  onClick={() => changePage(page - 1)}
                >
                  Previous
                </button>

                <span>
                  Page {page} / {data.total_pages}
                </span>

                <button
                  disabled={
                    page >= data.total_pages || isFetching
                  }
                  onClick={() => changePage(page + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}

export default MoviesPage;