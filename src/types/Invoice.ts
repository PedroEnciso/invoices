import type { Address } from "./Address";
import type { InvoiceItem } from "./InvoiceItem";

export interface Invoice {
  id: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: "paid" | "pending" | "draft";
  senderAddress: Address;
  clientAddress: Address;
  items: InvoiceItem[];
  total: number;
}
