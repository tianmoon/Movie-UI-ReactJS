import { useSearchParams } from "react-router-dom";
import { useSearchMovies } from "../hooks/useMovies";
import MovieCard from "../components/MovieCard/MovieCard";
import SearchBar from "../components/SearchBar/SearchBar";
import styles from "./MoviesPage/MoviesPage.module.scss";

function SearchPage() {
    const [searchParams, setSearchParams] = useSearchParams();

    const query = searchParams.get("query") ?? "";

    const rawpage = Number(searchParams.get("page"));
    const page = Number.isSafeInteger(rawpage) && rawpage > 0 ? rawpage : 1;

    const {
        data,
        isPending,
        isFetching,
        isError,
        error,
    } = useSearchMovies(query, page);

    const changePage = (newPage) => {
        setSearchParams({
            query,
            page: newPage.toString(),
        });
    }

    return (
    <div className="container">
      <section className={styles.moviesPage}>
        <h1>Search Movies</h1>

        <SearchBar key={query} initialQuery={query} />

        {!query && <p>Enter a movie title to search.</p>}

        {query && isPending && <p>Loading movies...</p>}

        {query && isError && (
          <p>Error: {error.message}</p>
        )}

        {data && (
          <>
            <p style={{ margin: "24px 0" }}>
              Found {data.total_results} results for "{query}"
            </p>

            {data.results.length === 0 ? (
              <p>No movies found.</p>
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

export default SearchPage;