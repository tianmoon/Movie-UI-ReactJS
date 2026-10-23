import { lazy } from "react";

export const HomePage = lazy(() =>
  import("../pages/HomePage/HomePage")
);

export const MoviesPage = lazy(() =>
  import("../pages/MoviesPage/MoviesPage")
);

export const MovieDetailPage = lazy(() =>
  import("../pages/MovieDetailPage/MovieDetailPage")
);

export const SearchPage = lazy(() =>
  import("../pages/SearchPage")
);