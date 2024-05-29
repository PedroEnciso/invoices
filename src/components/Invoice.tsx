function Invoice({ id, name, dueDate, amountDue, status }: Props) {
  return (
    <li>
      <div>
        <h3>#{id}</h3>
        <p>{name}</p>
      </div>
      <div>
        <div>
          <p>Due {dueDate}</p>
          <p>${amountDue}</p>
        </div>
        <p>{status}</p>
      </div>
    </li>
  );
}

interface Props {
  id: string;
  name: string;
  dueDate: string;
  amountDue: number;
  status: "paid" | "pending" | "draft";
}

export default Invoice;
