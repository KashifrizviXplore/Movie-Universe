import React, { useState } from 'react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";

function DropDown({ head, options, value, onChange }) {
  const [selected, setSelected] = useState(value || "All");

  const handleSelect = (key) => {
    const selectedOption = options.find((opt) => opt.value === key);
    setSelected(selectedOption ? selectedOption.label : "All");
    if (onChange) onChange(key);
  };

  return (
    <div>
      <p className="text-white mb-3">{head} :</p>
      <Dropdown>
        <DropdownTrigger>
          <Button className="capitalize text-white w-24"   color="success" 
          variant="bordered">
            {selected}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Static Actions"
          disallowEmptySelection
          selectionMode="single"
          onSelectionChange={(keys) => handleSelect([...keys][0])}
          color="success" 
          variant="bordered"
        >
          {options.map((opt) => (
            <DropdownItem key={opt.value} value={opt.value}>
              {opt.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default DropDown;
