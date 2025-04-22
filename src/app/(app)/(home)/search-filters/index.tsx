import Categories from "@/components/Categories";
import SearchInput from "@/components/SearchInput";
import { CustomCategory } from "@/types";
import React from "react";

interface Props {
  data: CustomCategory[];
}

const SearchFilters = ({ data }: Props) => {
  return (
    <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full">
      <SearchInput data={data} />
      <div className="hidden lg:block">
        <Categories data={data} />
      </div>
    </div>
  );
};

export default SearchFilters;
