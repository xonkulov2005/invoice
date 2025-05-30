import { create } from "zustand";

export const useAppStore = create((set) => {
  return {
    filter: "",
    themes: ["default", "rose", "blue"],
    items: [],
    setFilter(value) {
      return set(() => {
        return { filter: value };
      });
    },
    setItems(items) {
      return set(() => {
        return { items };
      });
    },
  };
});
