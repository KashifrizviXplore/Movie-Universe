import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Browse from "./Components/Browse";
import Movies from "./Components/Movies";
import ViewPage from "./Components/viewPage";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});
  const location = useLocation();
  const isViewPage = location.pathname.startsWith("/viewPage");

  return (
    <div className="w-full min-h-screen bg-[#1d1d1d]">
      <div className="fixed">
        <Navbar />
      </div>
      

      <Routes>
        <Route path="/viewPage/:id_param" element={<ViewPage />} />
        <Route
          path="/"
          element={
            <>
              <Browse
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filters={filters}
                setFilters={setFilters}
              />
              <Movies searchTerm={searchTerm} filters={filters} />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
