import { useParams } from "react-router-dom";
import { getInvoice } from "../request";
import { useState, useEffect } from "react";

import { Card, CardContent } from "@/components/ui/card";
import StatusBadge from "../components/StatusBadge";
import { Button, buttonVariants } from "../components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";

export default function Details() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [invoice, setInvoice] = useState([]);

  useEffect(() => {
    setLoading(true);
    getInvoice("/invoices", id)
      .then((res) => {
        setInvoice(res);
      })
      .catch(({ message }) => {
        setError(message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="base-container">
        <p>Loading...</p>
      </div>
    );
  }
  if (error) {
    return <p>{error}</p>;
  }
  return (
    <div className="py-5">
      <div className="base-container">
        <Card>
          <CardContent className="flex justify-between gap-2">
            <div className="flex items-center gap-2">
              <span>Status:</span>
              <StatusBadge status={invoice.status} />
            </div>
            <div className="flex gap-3">
              <Button variant="ghost">Edit</Button>

              <Dialog>
                <DialogTrigger
                  className={buttonVariants({ variant: "destructive" })}
                >
                  Delete
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete invoice{" "}
                      {invoice.invoiceId}? This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex gap-3 justify-end">
                    <DialogClose
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      Cancel
                    </DialogClose>
                    <Button variant="destructive">Delete</Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Button>Mark as Paid</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
