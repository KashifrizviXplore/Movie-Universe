import React from "react";
import { Input, Button } from "@heroui/react";
import DropDown from "./DropDown";
import {
  orderByData,
  qualityData,
  genreData,
  ratingData,
  yearData,
  languageData,
} from "../data/Option";

function Browse({ searchTerm, setSearchTerm, filters, setFilters }) {
  const [inputValue, setInputValue] = React.useState(searchTerm || "");

  const dropdowns = [
    { head: "Quality", name: "quality", options: qualityData },
    { head: "Genre", name: "genre", options: genreData },
    { head: "Rating", name: "rating", options: ratingData },
    { head: "Year", name: "year", options: yearData },
    { head: "Language", name: "language", options: languageData },
    { head: "Order By", name: "order_by", options: orderByData },
  ];

  const handleSearch = () => {
    setSearchTerm(inputValue);
  };

  const updateFilter = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className="bg-[#171717] h-[250px] w-full p-5 flex gap-2 flex-col justify-center items-center mt-16 ">
      <div className="flex w-[700px] gap-4 mt-6 ">
        <Input
          label="Search"
          type="search"
          size="sm"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <Button
          color="success"
          className="font-semibold text-white h-12 w-24"
          onPress={handleSearch}
        >
          Search
        </Button>
      </div>

      <div className="flex gap-3 mt-5 flex-wrap">
        {dropdowns.map((item, index) => (
          <DropDown
            key={index}
            head={item.head}
            name={item.name}
            options={item.options.map((opt) => ({
              value: opt.key,
              label: opt.label,
            }))}
            value={filters[item.name] || ""}
            onChange={updateFilter}
          />
        ))}
      </div>
    </div>
  );
}

export default Browse;
