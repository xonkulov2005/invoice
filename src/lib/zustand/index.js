import { create } from "zustand";

export const useAppStore = create((set) => {
  return {
    filter: "",
    invoices: [],
    themes: ["default", "rose", "blue"],
    items: [],
    setInvoices(invoices) {
      return set(() => {
        return { invoices };
      });
    },

    updateInvices(newData) {
      return set((state) => {
        const mapped = state.invoices.map((el) => {
          if (el.id === newData.id) {
            return newData;
          } else {
            return el;
          }
        });
        return { invoices: mapped };
      });
    },

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
