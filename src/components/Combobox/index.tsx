"use client";

import { useState } from "react";
import { ChevronsUpDown } from "lucide-react";

import { Button } from "../ui/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/Command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popover";

type ComboboxT = {
  items: string[];
  title: string;
  setFilterValue: React.Dispatch<React.SetStateAction<string>>;
  filterValue: string;
};

export function Combobox({
  items,
  title,
  setFilterValue,
  filterValue,
}: ComboboxT) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full lg:w-[150px] xl:w-[250px] justify-between rounded-none border-0 border-b text-sm xl:text-base 2xl:text-lg"
        >
          <p className="font-normal max-w-full overflow-hidden text-ellipsis">
            {filterValue ? filterValue : title}
          </p>
          <ChevronsUpDown className="ml-2 size-3 sm:size-4 2xl:size-5 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full lg:w-[150px] xl:w-[250px] max-h-[150px] xl:max-h-[200px] p-0 overflow-y-scroll bg-[white] rounded-none">
        <Command>
          <CommandInput
            placeholder="Поиск"
            className="text-sm xl:text-base 2xl:text-lg p-0] h-8 xl:h-10"
          />
          <CommandEmpty className="p-[10px] text-sm xl:text-base 2xl:text-lg">
            Ничего не найдено.
          </CommandEmpty>
          <CommandGroup>
            {items.map((item: string, index: number) => (
              <CommandItem
                key={index}
                value={item}
                onSelect={() => {
                  setFilterValue(item);
                  setOpen(false);
                }}
                className="hover:cursor-pointer hover:bg-valantis-primary text-sm xl:text-base 2xl:text-lg p-1 xl:p-2"
              >
                {item}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
