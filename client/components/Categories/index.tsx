"use client";
import "./category.css";
import { Listbox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/24/solid";
// Utils
import { CategoriesProps } from "@/typings/props";
import useCategories from "@/hooks/useCategories";

function Categories({ category, setCategory, index }: CategoriesProps) {
  const { categories } = useCategories();
  let styles = index ? { zIndex: index } : undefined;
  return (
    <Listbox value={category} onChange={(e) => setCategory(e)} name="category">
      <div className="select__container" style={styles}>
        <Listbox.Button className="select__button">
          <span>{category ? category : "Select Category"}</span>
          <ChevronUpDownIcon className="chevron__icon" />
        </Listbox.Button>
        <Listbox.Options className="select__options">
          {categories.map((option) => (
            <Listbox.Option
              key={option._id}
              value={option.title}
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

export default Categories;
