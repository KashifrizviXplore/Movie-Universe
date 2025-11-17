import React, { useEffect, useState } from "react";
import { getSimilarMovie } from "../data/Api";
import { Link } from "react-router-dom";
import { Spinner } from '@heroui/react';

function Suggestion({ movieId }) {
  const [similarMovies, setSimilarMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSimilarMovie = async () => {
    setIsLoading(true);
    try {
      const moviesData = await getSimilarMovie(movieId);
      setSimilarMovies(moviesData?.movies || []);
      console.log("Similar Movies: ", moviesData);
    } catch (error) {
      console.error("Error fetching similar movies:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (movieId) {
      fetchSimilarMovie();
    }
  }, [movieId]);

  

  return (
<div className="mt-5 mb-10 ml-[180px]">
  <h2 className="mb-1 text-xl font-semibold text-white">Similar Movies</h2>
  {
    isLoading ? <div className="flex items-center justify-center text-white mt-[180px] ml-[100px]">
      <Spinner label="Loading movies..." color="success" />
    </div> : 
    <div className="grid grid-cols-2 gap-2">
    {similarMovies.map((movie) => (
      <div
        key={movie.id}
        className="p-3  hover:scale-105 group rounded-2xl overflow-hidden shadow-lg
              bg-gradient-to from-[#111] to-[#1a1a1a]
              hover:scale-[1.04] transition-all duration-500 hover:shadow-[0_10px_30px_rgba(0,255,150,0.2)]"
            >"
      
        <Link 
          to={`/viewPage/${movie.id}`}
        >
        <img
          src={movie.medium_cover_image}
          alt={movie.title}
          className=" w-full h-[150px] object-cover rounded-lg"
        />
        </Link>
        
        <h3 className="mt-2 text-sm text-white line-clamp-1">{movie.title}</h3>
      </div>
    ))}
  </div>
  }
  
</div>

  );
}

export default Suggestion;
