import React, { useState } from "react";
import { FaDownload, FaMagnet } from "react-icons/fa";

export default function Download({ torrents = [] }) {
  const [open, setOpen] = useState(false);

  const handleDownload = (url) => {
    window.open(url, "_blank");
    setOpen(false);
  };

  const getMonitorIcon = (quality) => {
    switch (quality) {
      case "720p":
        return "/src/assets/720p-quality.svg";
      case "1080p":
        return "/src/assets/1080p-quality.svg";
      case "2160p":
        return "/src/assets/2160p-quality.svg";
        case "3D":
        return "/src/assets/3D-quality.svg";
      default:
        return "/assets/720p-quality.svg";
    }
  };

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="bg-[#6AC045] hover:bg-[#59A63B] text-white font-semibold py-2 px-4 rounded-md w-full transition"
      >
        Download
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/70"
            onClick={() => setOpen(false)}
          ></div>

          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="bg-white w-[90%] max-w-[500px] rounded-lg shadow-2xl p-4 text-center relative mt-8 "
              onClick={(e) => e.stopPropagation()}
            >
            
              <button
                onClick={() => setOpen(false)}
                className="absolute text-xl font-bold text-gray-600 top-2 right-3 hover:text-black"
              >
                ×
              </button>
              <h2 className="text-lg font-semibold text-[#6AC045] mb-4">
                Select movie quality
              </h2>

              <div
                className={`grid ${
                  torrents.length === 1 ? "grid-cols-1" : "grid-cols-2"
                } divide-x divide-gray-300`}
              >
                {torrents.map((torrent, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-1 py-2"
                  >
                    <img
                      src={getMonitorIcon(torrent.quality)}
                      alt={torrent.quality}
                      className="mb-1 h-14"
                    />
                    <p className="text-xs font-semibold text-gray-800">
                      {torrent.type.toUpperCase()}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-1">File size</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {torrent.size}
                    </p>
                    <button
                      onClick={() => handleDownload(torrent.url)}
                      className="flex items-center justify-center gap-1 bg-[#6AC045] hover:bg-[#59A63B] text-white font-semibold py-1.5 px-3 text-sm rounded-md mt-1"
                    >
                      <FaDownload size={12} /> Download
                    </button>
                    <FaMagnet className="mt-1 text-lg text-red-600" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
