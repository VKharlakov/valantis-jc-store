import { useEffect, useState } from "react";

import { Button } from "../../ui/Button";
import { Combobox } from "../../Combobox";

import useIdsStore from "../../../store/useIdsStore";
import useBrandsStore from "../../../store/useBrandsStore";
import useProductsStore from "../../../store/useProductsStore";

type FilterByBrandT = {
  isClear: boolean;
};

export default function FilterByBrand({ isClear }: FilterByBrandT) {
  const brands = useBrandsStore((state) => state.brands);
  const setBrands = useBrandsStore((state) => state.setBrands);

  const isLoading = useProductsStore((state) => state.isLoading);
  const setFilteredIds = useIdsStore((state) => state.setFilteredIds);

  const filterName = "brand";
  const [filterValue, setFilterValue] = useState("");

  //   Обработчик отправки формы
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setFilteredIds(filterName, filterValue);
  };

  //   Получение списка всех брендов при запуска
  useEffect(() => {
    setBrands();
  }, [setBrands]);

  //   Очищает поля при "Очистить фильтры"
  useEffect(() => {
    setFilterValue("");
  }, [isClear]);

  return (
    <form className="flex flex-col" onSubmit={(event) => handleSubmit(event)}>
      <label className="flex items-center whitespace-nowrap gap-2 text-sm xl:text-base 2xl:text-lg">
        по бренду:
        <Combobox
          items={brands}
          title="Нажмите чтобы выбрать"
          setFilterValue={setFilterValue}
          filterValue={filterValue}
        />
      </label>
      <Button
        className="border rounded-none mt-4 mx-auto h-8 xl:h-10 hover:bg-valantis-primary xl:text-base 2xl:text-lg"
        type="submit"
        disabled={filterValue === "" || isLoading}
      >
        Найти
      </Button>
    </form>
  );
}
