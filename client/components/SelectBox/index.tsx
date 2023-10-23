"use client";
import "./select.css";
import { SelectBoxProps } from "@/typings/props";
import { Listbox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/24/solid";
function SelectBox({ value, setValue, options, title }: SelectBoxProps) {
  return (
    <Listbox
      value={value}
      onChange={(e) => {
        setValue(e);
      }}
    >
      <div className="select__container">
        <Listbox.Button className="select__button">
          <span>{value ? value : title}</span>
          <ChevronUpDownIcon className="chevron__icon"/>
        </Listbox.Button>

        <Listbox.Options className="select__options">
          {options.map((option) => (
            <Listbox.Option
              key={option.value}
              value={option.value}
              className={({ active }) =>
                `select__option ${active ? "active" : ""}`
              }
            >
              {({ selected }) => (
                <span className={`${selected ? "selected" : ""}`}>
                  {option.title}
                </span>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
}

export default SelectBox;
