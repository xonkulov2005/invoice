import { useNavigate, useParams } from "react-router-dom";
import { deleteById, getInvoice } from "../request";
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
import { toast } from "sonner";

export default function Details() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [invoice, setInvoice] = useState([]);

  useEffect(() => {
    setLoading(true);
    getInvoice(id)
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

  function handleDelete(id) {
    setDeleteLoading(true);
    deleteById(id)
      .then((res) => {
        navigate("/");
      })
      .catch(({ message }) => {
        toast.error(message);
      })
      .finally(() => {
        setDeleteLoading(false);
      });
  }

  if (loading) {
    return (
      <div className="base-container">
        <p className="base-container text-3xl font-extrabold text-blue-950 mt-7">
          Loading...
        </p>
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
          <CardContent className="flex justify-between items-center">
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
                      Are you sure you want to delete invoice
                      {invoice.id}? This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex gap-3 justify-end">
                    <DialogClose
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      Cancel
                    </DialogClose>
                    <Button
                      onClick={() => handleDelete(invoice.id)}
                      variant="destructive"
                      disabled={deleteLoading}
                    >
                      {deleteLoading ? "Loading" : "Delete"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              {invoice.status === "pending" && <Button>Mark as Paid</Button>}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
