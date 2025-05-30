import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function queryGenerator(obj) {
  let result = "";
  Object.entries(obj).forEach(([key, value]) => {
    if (value) {
      if (result === "") {
        result += `${key}`;
      } else {
        result += `|${key}`;
      }
    }
  });
  return result;
}

// export function prepareData(obj) {
//   const senderAddressKey = "senderAddress-";
//   const clientAddressKey = "clientAddress-";
//   const senderAddress = {};
//   const clientAddress = {};
//   const result = { clientAddress, senderAddress };

//   for (const key in obj) {
//     if (key.startsWith(senderAddressKey)) {
//       senderAddress[key.replace(senderAddress, "")] = obj[key];
//     }
//     if (key.startsWith(clientAddress)) {
//       clientAddressKey[key.replace(clientAddress, "")] = obj[key];
//     }
//   }
//   for (const key in obj) {
//     if (!key.startsWith(senderAddressKey) || key.startsWith(clientAddressKey)) {
//       result[key] = obj[key];
//     }
//   }
//   const total = obj.items.reduce((value, currentValue) => {
//     return value + currentValue.total;
//   }, 0);
//   result.total = total;
//   return result;
// }
// utils.js fayliga qo'shing
export function prepareData(formData) {
  const senderAddress = {};
  const clientAddress = {};
  const result = {};
  
  // Ma'lumotlarni qayta ishlash
  for (const key in formData) {
    if (key.startsWith('senderAddress-')) {
      senderAddress[key.replace('senderAddress-', '')] = formData[key];
    } else if (key.startsWith('clientAddress-')) {
      clientAddress[key.replace('clientAddress-', '')] = formData[key];
    } else {
      result[key] = formData[key];
    }
  }
  
  result.senderAddress = senderAddress;
  result.clientAddress = clientAddress;
  
  return result;
}