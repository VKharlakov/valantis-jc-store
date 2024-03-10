import { useEffect, useState } from "react";

import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";

import useIdsStore from "../../../store/useIdsStore";
import useProductsStore from "../../../store/useProductsStore";

type FilterByProductT = {
  isClear: boolean;
};

export default function FilterByProduct({ isClear }: FilterByProductT) {
  const isLoading = useProductsStore((state) => state.isLoading);
  const setFilteredIds = useIdsStore((state) => state.setFilteredIds);

  const filterName = "product";
  const [filterValue, setFilterValue] = useState("");

  //   Обработчик изменений инпута
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFilterValue(value);
  };

  //   Обработчик отправки формы
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setFilteredIds(filterName, filterValue);
  };

  //   Очищает поля при "Очистить фильтры"
  useEffect(() => {
    setFilterValue("");
  }, [isClear]);

  return (
    <form className="flex flex-col" onSubmit={(event) => handleSubmit(event)}>
      <label className="flex items-center gap-2 whitespace-nowrap text-sm xl:text-base 2xl:text-lg">
        по названию:
        <Input
          className="rounded-none w-full lg:w-[150px] xl:w-[250px] border-0 border-b text-sm xl:text-base 2xl:text-lg"
          placeholder="Введите название"
          value={filterValue}
          onChange={(event) => handleChange(event)}
          required
        />
      </label>
      <Button
        className="border rounded-none text-sm h-8 xl:h-10 xl:text-base 2xl:text-lg mt-4 mx-auto hover:bg-valantis-primary"
        type="submit"
        disabled={filterValue === "" || isLoading}
      >
        Найти
      </Button>
    </form>
  );
}
