import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetail } from "../data/Api";
import { Spinner } from "@heroui/react";
import Download from "./Download";
import Suggestion from "./Suggestion";
import { FaHeart } from "react-icons/fa";

function viewPage() {
  const { id_param } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fetchMovieDetail = async () => {
    setIsLoading(true);
    try {
      const moviesData = await getMovieDetail(id_param);
      setMovie(moviesData.movie);
      console.log("Selected Movie: ", moviesData);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchMovieDetail();
  }, [id_param]);
  if (!movie) {
    return (
      <div className="p-5 mt-12 h-[1000px] flex justify-center items-center bg-black text-gray-400">
        <Spinner label="Loading movies..." color="success" />
      </div>
    );
  }
  if (isLoading || !movie) {
    return (
      <div className="p-5 mt-[49px] h-[600px] flex justify-center items-center bg-black text-gray-400">
        <Spinner label="Loading movies..." color="success" />
      </div>
    );
  }
  return (
    <>
      <div className="p-3 mt-[49px] h-auto bg-black text-white">
        {/* MAIN CONTAINER */}
        <div className="flex flex-col lg:flex-row">
          {/* LEFT IMAGE + DOWNLOAD */}
          <div className="flex flex-col gap-3 mt-5 lg:ml-5 items-center lg:items-start">
            <img
              src={movie.medium_cover_image}
              alt={movie.title}
              className="rounded-lg shadow-lg h-72 w-48 md:h-96 md:w-[250px]"
            />
            <Download torrents={movie.torrents} />
          </div>

          {/* MOVIE DETAILS */}
          <div className="flex flex-col gap-3 mt-6 lg:ml-16 text-center lg:text-left">
            <h1 className="text-2xl md:text-4xl font-semibold">
              {movie.title}
            </h1>

            <div className="mt-3 text-base md:text-lg font-semibold">
              <h3>{movie.year}</h3>
              <h3>{movie.genres?.join(" / ")}</h3>
            </div>

            {/* QUALITY BUTTONS */}
            <div className="mt-2">
              <div className="flex gap-2 justify-center lg:justify-start flex-wrap">
                <p className="text-base italic font-semibold">Available in:</p>

                <button className="bg-[#2E3030] px-2 py-1 border rounded-sm text-sm">
                  720p.WEB
                </button>
                <button className="bg-[#2E3030] px-2 py-1 border rounded-sm text-sm">
                  1080p.WEB
                </button>
              </div>

              <p className="text-xs font-bold text-[#2D312F] mt-1 text-center lg:text-left">
                WEB: same quality as BluRay
              </p>
            </div>

            <button className="bg-[#2E3030] px-3 py-2 border rounded-sm text-sm w-full md:w-40 mt-3">
              Download Subtitle
            </button>

            {/* LIKES */}
            <div className="flex gap-3 mt-3 items-center justify-center lg:justify-start">
              <FaHeart style={{ color: "green", fontSize: "20px" }} />
              <p className="text-lg font-bold">{movie.like_count}</p>
            </div>

            {/* RATING */}
            <div className="flex justify-center lg:justify-start mt-2">
              <p className="font-semibold flex items-center gap-2">
                <img
                  className="h-6 w-12"
                  src="/images/pngwing.com.png"
                  alt=""
                />
                {movie.rating} / 10
              </p>
            </div>
          </div>

          {/* SUGGESTION SECTION */}
          <div className="lg:ml-10 mt-5 lg:mt-0">
            <Suggestion movieId={id_param} />
          </div>
        </div>

        {/* TRAILER + IMAGES */}
        <div className="flex flex-col md:flex-row gap-4 p-4 items-center md:items-start">
          {movie.yt_trailer_code ? (
            <iframe
              width="100%"
              height="220"
              src={`https://www.youtube.com/embed/${movie.yt_trailer_code}`}
              title="YouTube trailer"
              allowFullScreen
              className="rounded-lg md:w-[421px]"
            ></iframe>
          ) : (
            <p className="text-green-400 font-bold">No trailer available</p>
          )}

          <img
            className="h-40 md:h-48 rounded-lg"
            src={movie.medium_screenshot_image1}
            alt="screenshot 1"
          />

          <img
            className="h-40 md:h-48 rounded-lg"
            src={movie.medium_screenshot_image2}
            alt="screenshot 2"
          />
        </div>
      </div>
    </>
  );
}

export default viewPage;
