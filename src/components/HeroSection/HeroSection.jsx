import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HeroSection.module.scss";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    const keyword = query.trim();

    if (!keyword) return;

    navigate(`/search?query=${encodeURIComponent(keyword)}`);
  };

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1>Welcome.</h1>

        <h2>
          Millions of movies, TV shows and people to discover.
          Explore now.
        </h2>

        <form className={styles.search} onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for a movie, TV show, person..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <button type="submit">Search</button>
        </form>
      </div>
    </section>
  );
};

export default HeroSection;