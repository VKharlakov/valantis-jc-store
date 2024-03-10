import { useEffect, useRef, useState } from "react";

import { Button } from "../ui/Button";
import ProductCard from "../ProductCard";

import useIdsStore from "../../store/useIdsStore";
import useProductsStore from "../../store/useProductsStore";
import {
  checkIfFirstPage,
  checkIfLastPage,
  pageExists,
} from "../../utils/utils";

export default function ProductList() {
  const products = useProductsStore((state) => state.products);
  const isLoading = useProductsStore((state) => state.isLoading);
  const setProducts = useProductsStore((state) => state.setProducts);

  const ids = useIdsStore((state) => state.ids);
  const pages = useIdsStore((state) => state.pages);

  const ref = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isFirstPage, setIsFirstPage] = useState(true);

  // Получение подробной информации о товарах постранично
  useEffect(() => {
    if (pageExists(pages, currentPage)) setProducts(pages[currentPage]);
  }, [setProducts, currentPage, pages]);

  // Проверка на последнюю/первую страницу
  useEffect(() => {
    if (pageExists(pages, currentPage)) {
      setIsLastPage(checkIfLastPage(pages, currentPage));
      setIsFirstPage(checkIfFirstPage(currentPage));
    }
  }, [currentPage, pages]);

  // При изменении списка ids перекидывать на первую страницу
  useEffect(() => {
    setCurrentPage(1);
  }, [ids]);

  // Прокрутка страницы наверх при переключении страниц
  const scrollUp = () => {
    if (ref.current) {
      ref.current.scrollIntoView();
    }
  };

  return (
    <div className="flex flex-col py-6 md:py-12 relative" ref={ref}>
      <p className="text-sm lg:text-base 2xl:text-xl mb-4">{`Найдено ${ids.length} товаров`}</p>
      {isLoading && (
        <span className="bg-[white] opacity-60 absolute inset-0 z-20" />
      )}
      <ul className="grid min-h-screen auto-rows-max grid-cols-[repeat(auto-fill,_minmax(150px,_1fr))] md:grid-cols-3 lg:grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] 2xl:grid-cols-[repeat(auto-fill,_minmax(350px,_1fr))] gap-6 2xl:gap-x-8 2xl:gap-y-6 w-full text-[black]">
        {products.length > 0 &&
          products.map((item, index) => (
            <li key={index}>
              <ProductCard
                product={item.product}
                brand={item.brand}
                price={item.price}
                id={item.id}
              />
            </li>
          ))}
      </ul>
      <div className="mt-16 lg:mt-20 mx-auto flex gap-2 md:gap-4 2xl:gap-6">
        <Button
          className="hover:bg-valantis-primary text-xs lg:text-base h-8 lg:h-10 2xl:h-12 rounded-none border"
          disabled={isFirstPage || isLoading}
          onClick={() => {
            setCurrentPage(currentPage - 1);
            scrollUp();
          }}
        >
          Назад
        </Button>
        <Button
          className="hover:bg-valantis-primary text-xs lg:text-base h-8 lg:h-10 2xl:h-12"
          style={{
            visibility: isFirstPage ? "hidden" : "visible",
          }}
          disabled={isLoading}
          onClick={() => {
            setCurrentPage(currentPage - 1);
            scrollUp();
          }}
        >
          {currentPage - 1}
        </Button>
        <Button
          className="bg-valantis-primary text-xs lg:text-base h-8 lg:h-10 2xl:h-12"
          disabled={isLoading}
        >
          {currentPage}
        </Button>
        <Button
          className="hover:bg-valantis-primary text-xs lg:text-base h-8 lg:h-10 2xl:h-12"
          style={{
            visibility: isLastPage ? "hidden" : "visible",
          }}
          disabled={isLoading}
          onClick={() => {
            setCurrentPage(currentPage + 1);
            scrollUp();
          }}
        >
          {currentPage + 1}
        </Button>
        <Button
          className="hover:bg-valantis-primary rounded-none border text-xs lg:text-base h-8 lg:h-10 2xl:h-12"
          disabled={isLastPage || isLoading}
          onClick={() => {
            setCurrentPage(currentPage + 1);
            scrollUp();
          }}
        >
          Вперед
        </Button>
      </div>
    </div>
  );
}
