import { create } from "zustand";
import { api } from "../utils/api/api";
import type { PageT } from "../types/types";

type IdsStoreT = {
  ids: string[];
  pages: PageT;
  isLoading: boolean;
  errors: any[];
  setAllIds: () => void;
  setFilteredIds: (filterName: string, filterValue: string | number) => void;
  setPages: (ids: string[]) => void;
};

const useIdsStore = create<IdsStoreT>((set) => ({
  ids: [],
  pages: {},
  isLoading: false,
  errors: [],

  //   Получение всех id и запись в ids
  setAllIds: async () => {
    set({ isLoading: true });
    try {
      const allIds = await api.getAllIds();

      set({ ids: allIds });
    } catch (err) {
      console.log(err);
      retrySetAllIds();
    } finally {
      set({ isLoading: false });
    }
  },

  //   Получение id подходящих по фильтру и запись в ids
  setFilteredIds: async (filterName, filterValue) => {
    set({ isLoading: true });

    try {
      const ids = await api.getIdsFilteredBy(filterName, filterValue);
      set({ ids });
      set({ isLoading: false });
    } catch (err) {
      console.log(err);
      retrySetFilteredIds(filterName, filterValue);
    }
  },

  //   Генерация страниц по 50 из массива строк id
  setPages: async (ids) => {
    set({ isLoading: true });

    try {
      const pageSize = 50;
      const pages: PageT = {};

      for (let i = 0; i < ids.length; i += pageSize) {
        const idsPerPage = ids.slice(i, i + pageSize);
        pages[i / pageSize + 1] = idsPerPage;
      }

      set({ pages });
      set({ isLoading: false });
    } catch (err) {
      console.log(err);
    }
  },
}));

// Рекурсивная функция для повторного вызова setAllIds в случае ошибки
async function retrySetAllIds() {
  await useIdsStore.getState().setAllIds();
}

// Рекурсивная функция для повторного вызова setFilteredIds в случае ошибки
async function retrySetFilteredIds(
  filterName: string,
  filterValue: string | number
) {
  await useIdsStore.getState().setFilteredIds(filterName, filterValue);
}

export default useIdsStore;
