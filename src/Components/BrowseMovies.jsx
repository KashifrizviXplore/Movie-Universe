import React, { useState } from "react";
import Browse from "./Browse";
import Movies from "./Movies";

function BrowsePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});

  return (
    <div>
      <Browse
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filters={filters}
        setFilters={setFilters}
      />
      <Movies searchTerm={searchTerm} filters={filters} />
    </div>
  );
}

export default BrowsePage;
