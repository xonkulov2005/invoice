import { data, useNavigate, useParams } from "react-router-dom";
import { deleteById, getInvoice, updateById } from "../request";
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
import { useAppStore } from "../lib/zustand";

export default function Details() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { updateInvices, setEditedData, setSheetOpen } = useAppStore();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
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

  function handleUpdate(id, data) {
    setUpdateLoading(true);
    updateById(id, data)
      .then((res) => {
        updateInvices([res]);
        navigate(-1);
      })
      .catch(({ message }) => {
        toast.error(message);
      })
      .finally(() => {
        setUpdateLoading(false);
      });
  }

  function handleEdit(data) {
    setSheetOpen();
    setEditedData(data);
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
    <div className="py-5 gap-6">
      <div className="base-container">
        <Card>
          <CardContent className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span>Status:</span>
              <StatusBadge status={invoice.status} />
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => {
                  handleEdit(invoice);
                }}
                variant="ghost"
              >
                Edit
              </Button>

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

              {invoice.status === "pending" && (
                <>
                  <Button
                    onClick={() => handleUpdate(invoice.id, { status: "paid" })}
                  >
                    {updateLoading ? "Loading..." : "Mark as Paid"}
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
        <Card className="p-12 mt-6">
          <div className="flex justify-between mb-5">
            <div>
              <h1 className="text-3xl font-[700]">#{invoice.id}</h1>
              <p className="text-[#7E88C3]">{invoice.description}</p>
            </div>
            <div className="text-[#7E88C3] flex flex-col items-end">
              <p>19 Union Terrace</p>
              <p>London</p>
              <p>E1 3EZ</p>
              <p>United Kingdom</p>
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              <div className="mb-8 gap-3">
                <span className="text-[#7E88C3]">Invoice Date</span>
                <p className="text-xl font-bold">{invoice.createdAt}</p>
              </div>
              <div className="gap-3">
                <span className="text-[#7E88C3]">Payment Due</span>
                <p className="text-xl font-bold">{invoice.paymentDue}</p>
              </div>
            </div>
            <div className="text-[#7E88C3]">
              <p className="">Bill to</p>
              <p className="text-xl text-[#0C0E16] font-bold">
                {invoice.clientName}
              </p>
              <p>84 Church Way</p>
              <p>Bradford </p>
              <p>BD1 9PB</p>
              <p>United Kingdom</p>
            </div>
            <div className="text-[#7E88C3]">
              <p>Sent to</p>
              <p className="text-xl text-[#0C0E16] font-bold">
                {invoice.clientEmail}
              </p>
            </div>
          </div>
          <div className="px-8 pt-8 bg-[#F9FAFE] rounded-xl text-[#7E88C3]">
            <div className="flex justify-between">
              <div>
                <p>Item Name</p>
                <p className="font-bold text-[#0C0E16] my-8">Banner Design</p>
                <p className="font-bold text-[#0C0E16]">Email Design</p>
              </div>
              <div>
                <p>QTY.</p>
                <p className="font-bold my-8">1</p>
                <p className="font-bold">2</p>
              </div>
              <div>
                <p>Price</p>
                <p className="font-bold my-8">£ {invoice.total}</p>
                <p className="font-bold">£ {invoice.total}</p>
              </div>
              <div>
                <p>Total</p>
                <p className="font-bold text-[#0C0E16] my-8">
                  £ {invoice.total}
                </p>
                <p className="font-bold text-[#0C0E16]">£ {invoice.total}</p>
              </div>
            </div>
          </div>
          <div className="bg-[#373B53] text-white flex items-center justify-between rounded-xl p-8">
            <p>Amount Due</p>
            <h2 className="font-[700] text-3xl">£ {invoice.total}</h2>
          </div>
        </Card>
      </div>
    </div>
  );
}
