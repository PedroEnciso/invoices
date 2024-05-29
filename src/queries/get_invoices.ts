import type { Invoice } from "../types";
import { DUMMY_DATA } from "../data";

export const get_invoices = (): Promise<Invoice[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(DUMMY_DATA);
    }, 1000);
  });
};
