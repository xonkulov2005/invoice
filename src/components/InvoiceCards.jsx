import { useEffect, useState } from "react";
import { getInvoices } from "../request";
import CardSkeleton from "./CardSkeleton";
import MyCard from "./MyCard";
import { useAppStore } from "../lib/zustand";
import NotFoundPage from "./NotFoundPage";

export default function InvoiceCards() {
  const { filter, invoices, setInvoices } = useAppStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    getInvoices(filter)
      .then((res) => {
        setInvoices(res);
      })
      .catch(({ message }) => {
        setError(message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [filter]);

  if (loading) {
    return <CardSkeleton />;
  }
  if (error) {
    return <p>{error}</p>;
  }
  if (invoices.length === 0) {
    return <NotFoundPage />;
  }

  return (
    <div className="base-container flex flex-col gap-4">
      {invoices.map((el, index) => {
        const { createdAt, clientName, status, id, total } = el;

        return (
          <MyCard
            createdAt={createdAt}
            clientName={clientName}
            price={total}
            status={status}
            key={id}
            id={id}
          />
        );
      })}
    </div>
  );
}
