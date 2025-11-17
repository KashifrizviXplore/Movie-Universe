import React, { useState, useEffect } from "react";
import { Pagination, Spinner, Button } from "@heroui/react";
import { Link } from "react-router-dom";
function Movies({ searchTerm = "", filters = {} }) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const getMovies = async (pageNumber = 1) => {
    setLoading(true);

    const {
      genre = "",
      rating = "",
      year = "",
      language = "",
      quality = "",
      order_by = "date_added",
    } = filters;

    let url = `https://yts.mx/api/v2/list_movies.json?page=${pageNumber}`;

    if (searchTerm.trim() !== "") url += `&query_term=${searchTerm}`;
    if (genre !== "") url += `&genre=${genre}`;
    if (rating !== "") url += `&minimum_rating=${rating}`;
    if (year !== "") url += `&year=${year}`;
    if (language !== "") url += `&language=${language}`;
    if (quality !== "") url += `&quality=${quality}`;
    if (order_by !== "") url += `&order_by=${order_by}`;

    try {
      const response = await fetch(url);
      const result = await response.json();
      const data = result.data;

      if (data?.movies) {
        setMovies(data.movies);
        setTotalPages(Math.ceil(data.movie_count / data.limit));
      } else {
        setMovies([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    getMovies(1);
  }, [filters, searchTerm]);

  useEffect(() => {
    getMovies(page);
  }, [page]);

  return (
    <div className="text-white p-6 flex flex-col items-center">
      <Pagination
        page={page}
        total={totalPages}
        onChange={(newPage) => setPage(newPage)}
        color="success"
        showControls
        className="mb-10"
      />
      {loading ? (
        <Spinner label="Loading movies..." color="success" />
      ) : movies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="relative group rounded-2xl overflow-hidden shadow-lg
              bg-gradient-to from-[#111] to-[#1a1a1a]
              hover:scale-[1.04] transition-all duration-500 hover:shadow-[0_10px_30px_rgba(0,255,150,0.2)]"
            >
             
              <img
                src={movie.medium_cover_image}
                alt={movie.title}
                className="rounded-2xl w-full h-72 object-cover group-hover:brightness-75 transition-all duration-500"
              />
              <div
                className="absolute bottom-0 left-0 w-full h-0 opacity-0
                group-hover:h-full group-hover:opacity-100
                bg-gradient-to from-black via-[#0b0b0bcc] to-transparent
                backdrop-blur-md transition-all duration-560 ease-out
                flex flex-col items-center justify-end pb-6 gap-3"
              >
                <div className="text-center transform translate-y-6 group-hover:translate-y-0 transition-all duration-500">
                  <p className="text-sm text-gray-300 mb-2 tracking-wide">
                     {movie.genres?.[0] || "Unknown Genre"}
                  </p>
                  <p className="text-sm  mb-6">Rating : {movie.rating}</p>
                  <div className="flex gap-3 justify-center">
                    <Link   to={`/viewPage/${movie.id}`}>
                    <Button
                      size="sm"
                      color="success"
                      variant="shadow"
                      radius="full"
                      className="text-sm px-4 py-1 bg-green-600/90 hover:bg-green-500 hover:shadow-[0_0_12px_#00ff9d] mb-24 "
                    >
                      View
                    </Button>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 w-full bg-black/70 p-2 text-center">
                <p className="text-sm font-semibold truncate text-gray-100 tracking-wide">
                  {movie.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 mt-10">No movies found.</p>
      )}
    </div>
  );
}

export default Movies;
