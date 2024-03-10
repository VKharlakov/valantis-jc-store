import { useState } from "react";

import FilterByPrice from "./FilterByPrice";
import FilterByBrand from "./FilterByBrand";
import FilterByProduct from "./FilterByProduct";
import { Button } from "../ui/Button";
import { ChevronDown, ChevronUp, FilterX } from "lucide-react";

import useIdsStore from "../../store/useIdsStore";

export default function Filter() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClear, setIsClear] = useState(false);

  const setAllIds = useIdsStore((state) => state.setAllIds);

  // Очистка полей фильтров и запрос списка всех id
  const clearFilters = () => {
    setIsClear(!isClear);
    setAllIds();
  };

  return (
    <>
      <div
        className="flex flex-col gap-2 pb-8"
        style={{ display: isOpen ? "flex" : "none" }}
      >
        <Button
          className="font-normal p-0 text-xs ml-auto hover:underline text-valantis-secondary 2xl:text-base"
          onClick={clearFilters}
        >
          Очистить фильтры
          <FilterX className="size-4 xl:size-5 2xl:size-6 ml-1" />
        </Button>
        <div className="flex flex-col lg:flex-row justify-between gap-4">
          <FilterByPrice isClear={isClear} />
          <FilterByProduct isClear={isClear} />
          <FilterByBrand isClear={isClear} />
        </div>
      </div>
      <Button
        className="w-full text-sm xl:text-base 2xl:text-lg xl:h-12 2xl:h-14 bg-valantis-primary rounded-none hover:opacity-70 font-normal text-valantis-secondary"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <>
            <p className="mr-2">Скрыть фильтры</p>
            <ChevronUp />
          </>
        ) : (
          <>
            <p className="mr-2">Показать фильтры</p>
            <ChevronDown />
          </>
        )}
      </Button>
    </>
  );
}
