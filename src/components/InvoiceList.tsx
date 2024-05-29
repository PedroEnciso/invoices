import Invoice from "./Invoice";
import type { Invoice as InvoiceType } from "../types";

function InvoiceList({ invoices }: Props) {
  return (
    <ul>
      {invoices.map((invoice) => (
        <Invoice
          key={invoice.id}
          id={invoice.id}
          name={invoice.clientName}
          dueDate={invoice.paymentDue}
          amountDue={invoice.total}
          status={invoice.status}
        />
      ))}
    </ul>
  );
}

interface Props {
  invoices: InvoiceType[];
}

export default InvoiceList;
