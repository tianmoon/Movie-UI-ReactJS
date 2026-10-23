import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

function Header() {
  return (
    <header className={styles.header}>
      <div className="container">
        <nav className={styles.nav}>
          <Link to="/" className={styles.logo}>
            TMDB
          </Link>

          <div className={styles.menu}>
            <Link to="/movies">Movies</Link>
            <Link to="/tv">TV Shows</Link>
            <Link to="/people">People</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;