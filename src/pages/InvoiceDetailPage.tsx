import { useQuery } from "@tanstack/react-query";
import { get_invoice_detail } from "../queries/get_invoice_detail";
import { useParams, Link } from "react-router-dom";

function InvoiceDetailPage() {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["invoices"],
    queryFn: () => get_invoice_detail(id),
  });

  if (isLoading) {
    return <p>Loading data of invoice #{id}...</p>;
  }

  if (error) {
    return (
      <div>
        <p>There was an error loading invoice #{id}. It may not exist</p>
        <Link to="/invoices">Back to invoices</Link>
      </div>
    );
  }

  if (data) {
    return (
      <>
        <section>
          <div className="flex justify-between items-center">
            <p>Status</p>
            <p>{data.status}</p>
          </div>
        </section>
        <section className="mt-4 flex flex-col gap-4">
          <div>
            <p>
              #<span>{data.id}</span>
            </p>
            <p>{data.description}</p>
          </div>

          <div>
            <p>{data.senderAddress.street}</p>
            <p>{data.senderAddress.city}</p>
            <p>{data.senderAddress.postCode}</p>
            <p>{data.senderAddress.country}</p>
          </div>

          <div className="flex">
            <div className="flex flex-col justify-between w-1/2">
              <div>
                <p>Invoice date</p>
                <p>{data.createdAt}</p>
              </div>
              <div>
                <p>Payment Due</p>
                <p>{data.paymentDue}</p>
              </div>
            </div>
            <div className="w-1/2">
              <p>Bill to</p>
              <p>{data.clientName}</p>
              <p>{data.clientAddress.street}</p>
              <p>{data.clientAddress.city}</p>
              <p>{data.clientAddress.postCode}</p>
              <p>{data.clientAddress.country}</p>
            </div>
          </div>

          <div>
            <p>sent to</p>
            <p>{data.clientEmail}</p>
          </div>

          <div>
            <ul>
              {data.items.map((item) => (
                <li
                  key={item.name}
                  className="flex justify-between items-center"
                >
                  <div>
                    <p>{item.name}</p>
                    <p>
                      {item.quantity} x ${item.price}
                    </p>
                  </div>
                  <p>{item.total}</p>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center">
              <p>Amount due</p>
              <p>$ {data.total}</p>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default InvoiceDetailPage;
