import { useEffect } from "react";

import Filter from "../../components/Filter/Filter";
import ProductList from "../../components/ProductList";
import NothingFound from "../../components/NothingFound";

import useIdsStore from "../../store/useIdsStore";

export default function StorefrontPage() {
  const ids = useIdsStore((state) => state.ids);
  const setPages = useIdsStore((state) => state.setPages);
  const setAllIds = useIdsStore((state) => state.setAllIds);

  // Получение всех id при запуске
  useEffect(() => {
    setAllIds();
  }, [setAllIds]);

  // Генерация страниц при изменении списка id
  useEffect(() => {
    setPages(ids);
  }, [setPages, ids]);

  return (
    <section className="py-6 2xl:py-16 px-4 md:px-16 2xl:px-40 w-full max-w-[1920px] bg-[white]">
      <Filter />
      {ids.length > 0 ? <ProductList /> : <NothingFound />}
    </section>
  );
}
