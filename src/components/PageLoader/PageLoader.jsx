import styles from "./PageLoader.module.scss";

function PageLoader() {
  return (
    <div
      className={styles.loaderContainer}
      role="status"
      aria-label="Loading page"
    >
      <div className={styles.spinner} />
      <p>Loading page...</p>
    </div>
  );
}

export default PageLoader;