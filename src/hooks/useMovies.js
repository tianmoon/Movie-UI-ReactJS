import { 
    useQuery, 
    keepPreviousData
 } from "@tanstack/react-query";
import { movieApi } from "../api/movieApi";

export const useTrendingMovies = (timeWindow = "day") => {
    return useQuery({
        queryKey: ["trendingMovies", timeWindow],
        
        queryFn: () => movieApi.getTrending(timeWindow),

        staleTime: 1000 * 60 * 5, // 5 minutes
    })
}

export const usePopularMovies = (page = 1) => {
    return useQuery({
        queryKey: ["popularMovies", page],

        queryFn: () => movieApi.getPopular(page),

        placeholderData: keepPreviousData,

        staleTime: 1000 * 60 * 5, // 5 minutes
    })
}

export const useMovieDetail = (movieId) => {
    return useQuery({
        queryKey: ["movieDetail", movieId],

        queryFn: () => movieApi.getMovieDetail(movieId),

        enabled: !!movieId, // Kiểm tra có movieId trước khi thực hiện truy vấn

        staleTime: 1000 * 60 * 5, // 5 minutes
    })
}       

export const useMovieCredits = (movieId) => {
    return useQuery({
        queryKey: ["movieCredits", movieId],

        queryFn: () => movieApi.getMovieCredits(movieId),

        enabled: !!movieId, // Kiểm tra có movieId trước khi thực hiện truy vấn

        staleTime: 1000 * 60 * 5, // 5 minutes
    })
}
export const useMovieVideos = (movieId) => {
    return useQuery({
        queryKey: ["movieVideos", movieId],

        queryFn: () => movieApi.getMovieVideos(movieId),
        
        enabled: !!movieId, // Kiểm tra có movieId trước khi thực hiện truy vấn
        staleTime: 1000 * 60 * 5, // 5 minutes
    })
}

export function useSearchMovies(query, page = 1) {
  return useQuery({
    queryKey: ["searchMovies", query, page],
    queryFn: () => movieApi.searchMovies(query, page),
    enabled: query.trim().length > 0,
    staleTime: 1000 * 60 * 5,
  });
}

export function useDiscoverMovies(filters) {
  return useQuery({
    queryKey: [
      "discoverMovies",
      filters.page,
      filters.genre,
      filters.sort,
    ],
    queryFn: () => movieApi.discoverMovies(filters),
    staleTime: 1000 * 60 * 5,
  });
}

