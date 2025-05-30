import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// export function queryGenerator(obj) {
//   let result = "";
//   Object.entries(obj).forEach(([key, value]) => {
//     if (value) {
//       if (result === "") {
//         result += `|${key}`;
//       } else {
//         result += `${key}`;
//       }
//     }
//   });
//   return result;
// }
export function queryGenerator(obj) {
  const activeFilters = Object.entries(obj)
    .filter(([_, value]) => value)
    .map(([key]) => key);

  return activeFilters.join("|");
}
