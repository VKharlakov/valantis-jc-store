import { PageT } from "../types/types";
import { twMerge } from "tailwind-merge";
import { blueWhaleFacts } from "./constants";
import { clsx, type ClassValue } from "clsx";

// Функция назначения классов
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Функция назначения случайного изображение для товаров
export function setRandomImg() {
  const index = Math.floor(Math.random() * 6) + 1;
  return `jc-${index}.webp`;
}

// Функция проверки если страница есть в объекте pages
export function pageExists(obj: PageT, pageNumber: number) {
  return obj[pageNumber];
}

// Функция форматирования цены
export function formatPrice(price: number) {
  let formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  formattedPrice += "р.";
  return formattedPrice;
}

// Функция проверки является ли страница первой
export function checkIfFirstPage(pageNumber: number) {
  return pageNumber - 1 === 0;
}

// Функция проверки является ли страница последней
export function checkIfLastPage(obj: PageT, pageNumber: number) {
  return obj[pageNumber].length < 50;
}

// Функция вывода случайного факта о синих китах
export function setRandomFact() {
  const randIndex = Math.floor(Math.random() * blueWhaleFacts.length);
  return blueWhaleFacts[randIndex];
}
