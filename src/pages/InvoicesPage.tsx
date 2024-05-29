import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import InvoiceFilter from "../components/InvoiceFilter";
import InvoiceList from "../components/InvoiceList";
import { get_invoices } from "../queries/get_invoices";
import type { Invoice } from "../types";

function InvoicesPage() {
  const [filteredStatus, toggleStatus] = useFilteredStatus();
  const { data, isLoading, error } = useQuery({
    queryKey: ["invoices"],
    queryFn: get_invoices,
  });
  const displayData = useDisplayData(data, filteredStatus);
  const length = data?.length || 0;

  return (
    <>
      <InvoiceFilter
        length={length}
        handleToggleStatus={toggleStatus}
        statuses={filteredStatus}
      />
      {error ? <p>There was an error. Please refresh the page.</p> : null}
      {isLoading ? <p>loading invoices...</p> : null}
      {displayData && displayData.length > 0 ? (
        <InvoiceList invoices={displayData} />
      ) : null}
      {displayData && displayData.length === 0 ? (
        <p>There is nothing here</p>
      ) : null}
    </>
  );
}

const useFilteredStatus = (): [
  filteredStatusState,
  (status: Status) => void
] => {
  const [filteredStatus, setFilteredStatus] = useState<filteredStatusState>({
    paid: true,
    pending: true,
    draft: true,
  });

  function toggleStatus(status: Status) {
    const newStatus = filteredStatus[status] ? false : true;
    const filteredStatusCopy = { ...filteredStatus };
    filteredStatusCopy[status] = newStatus;
    setFilteredStatus(filteredStatusCopy);
  }

  return [filteredStatus, toggleStatus];
};

const useDisplayData = (
  data: Invoice[] | undefined,
  filteredStatus: filteredStatusState
) => {
  return data?.filter((invoice) => {
    if (filteredStatus.paid && invoice.status === "paid") {
      return true;
    } else if (filteredStatus.pending && invoice.status === "pending") {
      return true;
    } else if (filteredStatus.draft && invoice.status === "draft") {
      return true;
    }
    return false;
  });
};

type Status = "paid" | "pending" | "draft";
interface filteredStatusState {
  paid: boolean;
  pending: boolean;
  draft: boolean;
}

export default InvoicesPage;
