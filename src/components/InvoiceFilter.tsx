import { useState } from "react";
import InvoiceFilterList from "./InvoiceFilterList";

function InvoiceFilter({ length, handleToggleStatus, statuses }: Props) {
  const [open, handleToggle] = useOpenClose();
  const inflection = length === 1 ? "invoice" : "invoices";
  const invoiceCount = length === 0 ? "No invoices" : `${length} ${inflection}`;

  return (
    <section>
      <div>
        <h2>Invoices</h2>
        <p>{invoiceCount}</p>
      </div>
      <div>
        <button onClick={handleToggle}>filter</button>
        <button>new</button>
        {open ? (
          <InvoiceFilterList
            handleClick={handleToggleStatus}
            statuses={statuses}
          />
        ) : null}
      </div>
    </section>
  );
}

const useOpenClose = (): [boolean, () => void] => {
  const [open, setOpen] = useState(false);

  function handleToggle() {
    setOpen((prevState) => !prevState);
  }

  return [open, handleToggle];
};

interface Props {
  length: number;
  handleToggleStatus: (status: "paid" | "pending" | "draft") => void;
  statuses: {
    paid: boolean;
    pending: boolean;
    draft: boolean;
  };
}

export default InvoiceFilter;
