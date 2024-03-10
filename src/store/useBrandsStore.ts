import { create } from "zustand";
import { api } from "../utils/api/api";

type BrandsStoreT = {
  brands: string[];
  isLoading: boolean;
  setBrands: () => void;
};

const useBrandsStore = create<BrandsStoreT>((set) => ({
  brands: [],
  isLoading: false,

  //   Получение списка всех брендов и запись в brands
  setBrands: async () => {
    set({ isLoading: true });
    try {
      const brands = await api.getAllBrands();

      set({ brands });
      set({ isLoading: false });
    } catch (err) {
      console.log(err);
      retrySetBrands();
    }
  },
}));

// Рекурсивная функция для повторного вызова setBrands в случае ошибки
async function retrySetBrands() {
  await useBrandsStore.getState().setBrands();
}

export default useBrandsStore;
