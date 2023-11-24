import { SearchParamsType } from "./types";
import { Dispatch, SetStateAction } from "react";

export interface HomeProps {
  searchParams: SearchParamsType;
}

export interface CategoriesProps {
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
  index? : number
}
export interface SelectBoxProps {
  title: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  options: options[];
  index?: number;
}

interface options {
  title: string;
  value: string;
}

export interface AdminCardProps {
  title: string;
  count: number;
  Icon: React.ElementType;
}
