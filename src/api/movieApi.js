import axiosClient from "./axiosClient";

export const movieApi = {
    getTrending: async (timeWindow = "day") => {
        const response = await axiosClient.get(`/trending/movie/${timeWindow}`,
            {
                params: {
                    language: "en-US",
                }
            }
        );
        return response.data;
    },

    getPopular: async (page = 1) => {
        const response = await axiosClient.get(`/movie/popular`,
            {
                params: {
                    language: "en-US",
                    page: page,
                }
            }
        );
        return response.data;
    },

    getMovieDetail: async (movieId) => {
        const response = await axiosClient.get(
            `/movie/${movieId}`,
            {
                params: { language: "en-US" },
            }
        );

        return response.data;
    },

    getMovieCredits: async (movieId) => {
        const response = await axiosClient.get(
            `/movie/${movieId}/credits`,
            {
                params: { language: "en-US" },
            }
        );

        return response.data;
    },

    getMovieVideos: async (movieId) => {
        const response = await axiosClient.get(
            `/movie/${movieId}/videos`,
            {
                params: {
                    language: "en-US"
                }
            }
        );
        return response.data;
    },

    searchMovies: async (query, page = 1) => {
        const response = await axiosClient.get("/search/movie", {
            params: {
                query,
                page,
                language: "en-US",
                include_adult: false,
            },
        });

        return response.data;
    },

    discoverMovies: async ({
        page = 1,
        genre = "",
        sort = "popularity.desc",
    }) => {
        const response = await axiosClient.get("/discover/movie", {
            params: {
                page,
                language: "en-US",
                include_adult: false,
                sort_by: sort,
                ...(genre ? { with_genres: genre } : {}),
            },
        });

        return response.data;
    },
}