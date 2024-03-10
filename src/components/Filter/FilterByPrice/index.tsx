import { useEffect, useState } from "react";

import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";

import useIdsStore from "../../../store/useIdsStore";
import useProductsStore from "../../../store/useProductsStore";

type FilterByPriceT = {
  isClear: boolean;
};

export default function FilterByPrice({ isClear }: FilterByPriceT) {
  const isLoading = useProductsStore((state) => state.isLoading);
  const setFilteredIds = useIdsStore((state) => state.setFilteredIds);

  const filterName = "price";
  const [filterValue, setFilterValue] = useState("");

  // Обработчик изменений инпута
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFilterValue(value);
  };

  // Обработчик отправки формы
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setFilteredIds(filterName, Number(filterValue));
  };

  //   Очищает поля при "Очистить фильтры"
  useEffect(() => {
    setFilterValue("");
  }, [isClear]);

  return (
    <form className="flex flex-col" onSubmit={(event) => handleSubmit(event)}>
      <label className="flex items-center whitespace-nowrap gap-2 text-sm xl:text-base 2xl:text-lg">
        по цене:
        <Input
          className="w-full lg:w-[150px] xl:w-[250px] rounded-none border-0 border-b text-sm xl:text-base 2xl:text-lg"
          placeholder="999999р"
          value={filterValue}
          onChange={(event) => handleChange(event)}
          required
        />
      </label>
      <Button
        className="border rounded-none mt-4 h-8 xl:h-10 mx-auto text-sm xl:text-base 2xl:text-lg hover:bg-valantis-primary"
        type="submit"
        disabled={filterValue === "" || isLoading}
      >
        Найти
      </Button>
    </form>
  );
}
