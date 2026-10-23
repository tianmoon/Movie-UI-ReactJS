import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import RouteBoundary from "./RouteBoundary";

import {
  HomePage,
  MoviesPage,
  MovieDetailPage,
  SearchPage,
} from "./LazyPages";
const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <RouteBoundary>
            <HomePage />
          </RouteBoundary>
        ),
      },
      {
        path: "/movies",
        element: (
          <RouteBoundary>
            <MoviesPage />
          </RouteBoundary>
        ),
      },
      {
        path: "/movie/:id",
        element: (
          <RouteBoundary>
            <MovieDetailPage />
          </RouteBoundary>
        ),
      },
      {
        path: "/search",
        element: (
          <RouteBoundary>
            <SearchPage />
          </RouteBoundary>
        ),
      },
    ],
  },
]);

export default router;