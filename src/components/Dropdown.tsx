import React, { useEffect, useRef } from "react";
import { MultiselectOption } from "../interfaces";

export interface DropdownProps {
  options: MultiselectOption[];
  toggleChecked: (index: number) => void;
  clickOutside: () => void;
}

const Dropdown = ({ options, toggleChecked, clickOutside }: DropdownProps) => {
  function useOutsideComponent(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          clickOutside();
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideComponent(wrapperRef);

  const optionList = options.map(({ checked, name }, key) => {
    return (
      <div
        key={key}
        className="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-teal-100"
      >
        <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100">
          <label className="w-full items-center flex">
            <input
              checked={checked}
              onChange={() => toggleChecked(key)}
              type="checkbox"
              className="mx-2 leading-6"
            />
            {name}
          </label>
        </div>
      </div>
    );
  });
  return (
    <div
      id="dropdown"
      className="absolute shadow top-100 bg-white z-40 w-full lef-0 rounded max-h-select overflow-y-auto"
      ref={wrapperRef}
    >
      <div className="flex flex-col w-full">{optionList}</div>
    </div>
  );
};

export default Dropdown;
