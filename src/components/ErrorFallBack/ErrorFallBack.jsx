import styles from "./ErrorFallback.module.scss";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className={styles.container} role="alert">
      <h2>Something went wrong!</h2>

      <p>
        We couldn't display this page.
        Please try again.
      </p>

      {import.meta.env.DEV && (
        <p className={styles.errorMessage}>
          {error instanceof Error
            ? error.message
            : String(error)}
        </p>
      )}

      <button
        type="button"
        onClick={resetErrorBoundary}
      >
        Try Again
      </button>
    </div>
  );
}

export default ErrorFallback;