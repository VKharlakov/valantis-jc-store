import md5 from "md5";
import type { ProductT } from "../../types/types";

// const baseUrl = "http://api.valantis.store:40000/";
const baseUrl = "https://api.valantis.store:41000/";

// Функция составления актуальной даты
const currentDate = () => {
  const date = new Date();
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = day < 10 ? `0${day}` : day;
  const timestamp = `${year}${formattedMonth}${formattedDay}`;
  return timestamp;
};

const returnResults = (res: Response) => {
  if (!res.ok) {
    throw new Error(`Ошибка ${res.status}`);
  }
  return res.json();
};

// API
const api = {
  // Получение списка всех id
  getAllIds: async () => {
    const authString = md5(`Valantis_${currentDate()}`);
    console.log(authString);

    return fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth": authString,
      },
      body: JSON.stringify({
        action: "get_ids",
        params: {},
      }),
    })
      .then((res) => returnResults(res))
      .then((data) => {
        const unfilteredArr: string[] = data.result;
        const filteredArr: string[] = [...new Set(unfilteredArr)];

        return filteredArr;
      });
  },

  // Получение информации о продуктах из списка id
  getItems: async (idList: string[]) => {
    const authString = md5(`Valantis_${currentDate()}`);

    return fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth": authString,
      },
      body: JSON.stringify({
        action: "get_items",
        params: {
          ids: idList,
        },
      }),
    })
      .then((res) => returnResults(res))
      .then((data) => {
        const unfilteredArr: ProductT[] = data.result;
        const filteredArr: ProductT[] = [];
        const existingIds: string[] = [];

        // Фильтруем список товаров по Id
        unfilteredArr.forEach((product) => {
          if (!existingIds.includes(product.id) && existingIds.length < 50) {
            existingIds.push(product.id);
            filteredArr.push(product);
          }
        });

        return filteredArr;
      });
  },

  // Получение списка всех значений полей brand
  getAllBrands: async () => {
    const authString = md5(`Valantis_${currentDate()}`);

    return fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth": authString,
      },
      body: JSON.stringify({
        action: "get_fields",
        params: {
          field: "brand",
        },
      }),
    })
      .then((res) => returnResults(res))
      .then((data) => {
        const unfilteredArr: string[] = data.result.filter(
          (string: string) => string != null
        );
        const filteredArr: string[] = [...new Set(unfilteredArr)];

        return filteredArr;
      });
  },

  // Получение списка id по фильтру
  getIdsFilteredBy: async (
    filterName: string,
    filterValue: string | number
  ) => {
    const authString = md5(`Valantis_${currentDate()}`);

    return fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth": authString,
      },
      body: JSON.stringify({
        action: "filter",
        params: {
          [filterName]: filterValue,
        },
      }),
    })
      .then((res) => returnResults(res))
      .then((data) => {
        const unfilteredArr: string[] = data.result;
        const filteredArr: string[] = [...new Set(unfilteredArr)];

        return filteredArr;
      });
  },
};

export { api };
