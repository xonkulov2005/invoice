import { Label } from "@radix-ui/react-dropdown-menu";
import ItemList from "./ItemList";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { useAppStore } from "../lib/zustand";
import { addInvoice, updateById } from "../request";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { prepareData } from "../lib/utils";
import { useNavigate } from "react-router-dom";

export default function Form({ info, setSheetOpen }) {
  const { items: zustandItems } = useAppStore();
  const {
    senderAddress,
    clientAddress,
    clientEmail,
    clientName,
    paymentTerms,
    description,
    paymentDue,
    createdAt,
    items,
  } = info || {};
  const { updateInvices } = useAppStore();
  const [sending, setSending] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const result = {};
    if (!info) {
      result.status = e.nativeEvent.submitter.id;
    }
    formData.forEach((value, key) => {
      if (key === "quantity" || key === "price" || key === "paymentTerms") {
        result[key] = Number(value);
      } else {
        result[key] = value;
      }
    });
    result.items = zustandItems;
    const readyData = prepareData(result);
    setSending({
      mode: e.nativeEvent.submitter.id === "edit" ? "edit" : "add",
      data: readyData,
    });
  }

  useEffect(() => {
    if (sending) {
      setLoading(true);
      if (sending.mode === "add") {
        addInvoice(sending)
          .then((res) => {
            updateInvices(res);
            toast.error("Succesfully added ✅");
            setSheetOpen(false);
          })
          .catch((message) => {
            toast.error(message);
          })
          .finally(() => {
            setLoading(false);
            setSending(null);
          });
      } else if (sending.mode === "edit") {
        updateById(info.id, sending.data)
          .then((res) => {
            updateInvices(res);
            toast.success("Succesfully edited ✅");
            navigate(-1);
            setSheetOpen(false);
          })
          .catch((message) => {
            toast.error(message);
          })
          .finally(() => {
            setLoading(false);
            setSending(null);
          });
      }
    }
  }, [sending]);

  return (
    <form onSubmit={handleSubmit} className="p-4 pt-14 ">
      {/*Bill From*/}
      <div className="mb-8">
        <h3 className="text-2xl font-medium mb-4">Bill From</h3>
        <div className="flex flex-col gap-5">
          <div className="grid w-full max-w-full items-center gap-1.5">
            <Label htmlFor="senderAddress-street">Street Address</Label>
            <Input
              defaultValue={info && senderAddress.street}
              type="text"
              id="senderAddress-street"
              placeholder="Street Address"
              name="senderAddress-street"
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-5">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="senderAddress-city">City</Label>
            <Input
              defaultValue={info && senderAddress.city}
              type="text"
              id="senderAddress-city"
              placeholder="City"
              name="senderAddress-city"
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="senderAddress-postCode">Post Code</Label>
            <Input
              defaultValue={info && senderAddress.postCode}
              type="text"
              id="senderAddress-postCode"
              placeholder="Post Code"
              name="senderAddress-postCode"
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="senderAddress-country">Country</Label>
            <Input
              defaultValue={info && senderAddress.country}
              type="text"
              id="senderAddress-country"
              placeholder="Country"
              name="senderAddress-country"
            />
          </div>
        </div>
      </div>
      {/*Bill To*/}
      <div>
        <h3 className="text-2xl font-medium mb-4">Bill To</h3>
        <div className="flex flex-col gap-5 mb-5">
          <div className="grid w-full max-w-full items-center gap-1.5">
            <Label htmlFor="clientName">Client’s Name</Label>
            <Input
              defaultValue={info && clientName}
              type="text"
              id="clientName"
              placeholder="Client’s Name"
              name="clientName"
            />
          </div>
          <div className="grid w-full max-w-full items-center gap-1.5">
            <Label htmlFor="clientEmail">Client’s Email</Label>
            <Input
              defaultValue={info && clientEmail}
              type="text"
              id="clientEmail"
              placeholder="Client’s Email"
              name="clientEmail"
            />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="grid w-full max-w-full items-center gap-1.5">
            <Label htmlFor="clientAddress-street">Street Address</Label>
            <Input
              defaultValue={info && clientAddress.street}
              type="text"
              id="clientAddress-street"
              placeholder="Street Address"
              name="clientAddress-street"
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-5">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="clientAddress-city">City</Label>
            <Input
              defaultValue={info && clientAddress.city}
              type="text"
              id="clientAddress-city"
              placeholder="City"
              name="clientAddress-city"
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="clientAddress-postCode">Post Code</Label>
            <Input
              defaultValue={info && clientAddress.postCode}
              type="text"
              id="clientAddress-postCode"
              placeholder="Post Code"
              name="clientAddress-postCode"
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="clientAddress-country">Country</Label>
            <Input
              defaultValue={info && clientAddress.country}
              type="text"
              id="clientAddress-country"
              placeholder="Country"
              name="clientAddress-country"
            />
          </div>
        </div>
      </div>
      {/*Date */}
      <div className="flex flex-col gap-5 mb-10">
        <div className="flex gap-10 items-end">
          <div className="grid w-full max-w-full items-center gap-1.5">
            <Label htmlFor="createdAt">Invoice Date</Label>
            <Input
              defaultValue={info && createdAt}
              type="date"
              id="createdAt"
              placeholder="Invoice Date"
              name="createdAt"
            />
          </div>
          <Select
            name="paymentTerms"
            defaultValue={info && paymentTerms.toString()}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Payment Terms" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Terms</SelectLabel>
                <SelectItem value="1">Net 1 Day</SelectItem>
                <SelectItem value="7">Net 7 Days</SelectItem>
                <SelectItem value="14">Net 14 Days</SelectItem>
                <SelectItem value="30">Net 30 Days</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="grid w-full max-w-full items-center gap-1.5">
          <Label htmlFor="description">Project Description</Label>
          <Input
            defaultValue={info && description}
            type="text"
            id="description"
            placeholder="Project Description"
            name="description"
          />
        </div>
      </div>

      <ItemList info={info && info.items} />

      {info ? (
        <div className="flex justify-end gap-5 mt-10">
          <Button variant={"outline"}>Cancel</Button>
          <Button disabled={loading}>
            {loading ? "Loading..." : "Save Changes"}
          </Button>
        </div>
      ) : (
        <div className="flex justify-end gap-5 mt-10">
          <Button type="button" variant={"outline"}>
            Discard
          </Button>
          <Button disabled={loading} id="draft" variant={"secondary"}>
            {loading ? "Loading..." : "Save as Draft"}
          </Button>
          <Button disabled={loading} id="pending">
            {loading ? "Loading..." : "Save & Send"}
          </Button>
        </div>
      )}
    </form>
  );
}
