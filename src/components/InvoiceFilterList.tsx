function InvoiceFilterList({ handleClick, statuses }: Props) {
  return (
    <form>
      <label htmlFor="paid">Paid</label>
      <input
        onChange={() => handleClick("paid")}
        type="checkbox"
        name="paid"
        id="paid"
        checked={statuses.paid}
      />
      <label htmlFor="pending">Pending</label>
      <input
        onChange={() => handleClick("pending")}
        type="checkbox"
        name="pending"
        id="pending"
        checked={statuses.pending}
      />
      <label htmlFor="draft">Draft</label>
      <input
        onChange={() => handleClick("draft")}
        type="checkbox"
        name="draft"
        id="draft"
        checked={statuses.draft}
      />
    </form>
  );
}

interface Props {
  handleClick: (status: "paid" | "pending" | "draft") => void;
  statuses: {
    paid: boolean;
    pending: boolean;
    draft: boolean;
  };
}

export default InvoiceFilterList;
