import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SearchBar.module.scss";

function SearchBar({ initialQuery = "" }) {
  const [keyword, setKeyword] = useState(initialQuery);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const query = keyword.trim();

    if (!query) return;

    navigate(`/search?${new URLSearchParams({
      query,
      page: "1",
    })}`);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchBar}>
      <input
        type="search"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search for a movie..."
        aria-label="Search movies"
      />

      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;