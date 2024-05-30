import type { Invoice } from "../types";
import { DUMMY_DATA } from "../data";

export const get_invoice_detail = (
  id: string | undefined
): Promise<Invoice> => {
  if (!id) {
    throw new Error("ID is not defined");
  }

  const invoice = DUMMY_DATA.find((item) => item.id === id);
  // throw an error if there is not an invoice with the id
  if (!invoice) {
    throw new Error("Does not exist");
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(invoice);
    }, 3000);
  });
};
