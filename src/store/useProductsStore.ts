import { create } from "zustand";
import { api } from "../utils/api/api";
import type { ProductT } from "../types/types";

type ProductsStoreT = {
  products: ProductT[];
  isLoading: boolean;
  errors: any[];
  setProducts: (idArray: string[]) => void;
};

const useProductsStore = create<ProductsStoreT>((set) => ({
  products: [],
  isLoading: false,
  errors: [],

  //   Получение подробной информации по idArray и запись в products
  setProducts: async (idArray) => {
    set({ isLoading: true });

    try {
      const data = await api.getItems(idArray);

      set({ products: data });
      set({ isLoading: false });
    } catch (err) {
      console.log(err);
      retrySetProducts(idArray);
    }
  },
}));

// Рекурсивная функция для повторного вызова setProducts в случае ошибки
async function retrySetProducts(idArray: string[]) {
  await useProductsStore.getState().setProducts(idArray);
}

export default useProductsStore;
