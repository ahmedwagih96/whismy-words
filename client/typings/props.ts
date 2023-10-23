import { SearchParamsType } from "./types";
import { Dispatch, SetStateAction } from "react";

export interface HomeProps {
  searchParams: SearchParamsType;
}

export interface CategoriesProps {
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
}
export interface SelectBoxProps {
  title: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  options: options[];
}

interface options {
  title: string;
  value: string;
}
