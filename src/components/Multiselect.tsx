import React, { useState } from "react";
import { MultiselectOption } from "../interfaces";
import Dropdown from "./Dropdown";

export interface MultiSelectProps {
  options: MultiselectOption[];
  handleChangeSelected: (selected: MultiselectOption[]) => void;
}

const Multiselect = ({ options, handleChangeSelected }: MultiSelectProps) => {
  const [dropdown, setDropdown] = useState(false);
  const [items, setItems] = useState<MultiselectOption[]>(options);

  const toogleDropdown = (e) => {
    e.preventDefault();
    setDropdown(!dropdown);
  };
  // adds new item to multiselect
  const toggleCheck = (index: number) => {
    const copyItems = [...items];
    copyItems[index].checked = !copyItems[index].checked;
    setItems(copyItems);
    handleChangeSelected(copyItems);
  };

  const selected = items
    .filter(({ checked }) => checked)
    .map((tag, index) => {
      return (
        <div
          key={index}
          className="flex justify-center items-center m-1 font-medium py-1 px-2 rounded-full text-teal-700 bg-white border border-teal-300"
        >
          <span className="text-xs font-normal leading-none max-w-full flex-initial">
            {tag.name}
          </span>
        </div>
      );
    });

  return (
    <>
      <div className="flex flex-col items-center relative">
        <div className="w-full">
          <div
            onClick={toogleDropdown}
            className="my-2 p-1 flex border border-gray-200 bg-white rounded "
          >
            <div className="flex h-8">{selected}</div>
          </div>
          {dropdown ? (
            <Dropdown
              options={items}
              toggleChecked={toggleCheck}
              clickOutside={() => setDropdown(false)}
            />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Multiselect;
