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
import { addInvoice } from "../request";
import { useEffect, useState } from "react";

export default function Form({ info }) {
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

  const [sending, setSending] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const result = { status: e.nativeEvent.submitter.id };
    formData.forEach((value, key) => {
      if (key === "quantity" || key === "price" || key === "paymentTerms") {
        result[key] = Number(value);
      } else {
        result[key] = value;
      }
    });
    result.items = zustandItems;
    const readyData = prepareData(result);
  }
  useEffect(() => {
    if (sending) {
      setLoading(true);
      addInvoice(sending)
        .then((res) => {})
        .catch((message) => {})
        .finally(() => {});
    }
  }, []);
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

// import { Label } from "@/components/ui/label";
// import ItemList from "./ItemList";
// import { Input } from "./ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Button } from "./ui/button";
// import { useAppStore } from "../lib/zustand";
// import { addInvoice, updateById } from "../request";
// import { useEffect, useState } from "react";
// import { prepareData } from "../lib/utils";
// import { toast } from "sonner";

// export default function Form({ info, onSuccess }) {
//   const { items: zustandItems, setItems } = useAppStore();
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState(null);

//   useEffect(() => {
//     return () => setItems([]); // Reset items when form unmounts
//   }, [setItems]);

//   useEffect(() => {
//     const submitData = async () => {
//       if (!formData) return;

//       try {
//         setLoading(true);
//         let response;

//         if (info?.id) {
//           response = await updateById(info.id, formData);
//           toast.success("Invoice updated successfully");
//         } else {
//           response = await addInvoice(formData);
//           toast.success("Invoice created successfully");
//         }

//         if (onSuccess) onSuccess();
//       } catch (error) {
//         toast.error(error.message || "Something went wrong");
//       } finally {
//         setLoading(false);
//         setFormData(null);
//       }
//     };

//     submitData();
//   }, [formData, info, onSuccess]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const result = {
//       status: e.nativeEvent.submitter.id || "pending",
//       items: zustandItems,
//     };

//     formData.forEach((value, key) => {
//       result[key] = value;
//     });

//     const readyData = prepareData(result);
//     setFormData(readyData);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-4 space-y-6">
//       {/* Bill From Section */}
//       <div>
//         <h3 className="text-lg font-medium mb-4">Bill From</h3>
//         <div className="space-y-4">
//           <div>
//             <Label htmlFor="senderAddress-street">Street Address</Label>
//             <Input
//               id="senderAddress-street"
//               name="senderAddress-street"
//               defaultValue={info?.senderAddress?.street}
//               required
//             />
//           </div>

//           <div className="grid grid-cols-3 gap-4">
//             <div>
//               <Label htmlFor="senderAddress-city">City</Label>
//               <Input
//                 id="senderAddress-city"
//                 name="senderAddress-city"
//                 defaultValue={info?.senderAddress?.city}
//                 required
//               />
//             </div>
//             <div>
//               <Label htmlFor="senderAddress-postCode">Post Code</Label>
//               <Input
//                 id="senderAddress-postCode"
//                 name="senderAddress-postCode"
//                 defaultValue={info?.senderAddress?.postCode}
//                 required
//               />
//             </div>
//             <div>
//               <Label htmlFor="senderAddress-country">Country</Label>
//               <Input
//                 id="senderAddress-country"
//                 name="senderAddress-country"
//                 defaultValue={info?.senderAddress?.country}
//                 required
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Bill To Section */}
//       <div>
//         <h3 className="text-lg font-medium mb-4">Bill To</h3>
//         <div className="space-y-4">
//           <div>
//             <Label htmlFor="clientName">Client's Name</Label>
//             <Input
//               id="clientName"
//               name="clientName"
//               defaultValue={info?.clientName}
//               required
//             />
//           </div>
//           <div>
//             <Label htmlFor="clientEmail">Client's Email</Label>
//             <Input
//               id="clientEmail"
//               name="clientEmail"
//               type="email"
//               defaultValue={info?.clientEmail}
//               required
//             />
//           </div>
//           <div>
//             <Label htmlFor="clientAddress-street">Street Address</Label>
//             <Input
//               id="clientAddress-street"
//               name="clientAddress-street"
//               defaultValue={info?.clientAddress?.street}
//               required
//             />
//           </div>

//           <div className="grid grid-cols-3 gap-4">
//             <div>
//               <Label htmlFor="clientAddress-city">City</Label>
//               <Input
//                 id="clientAddress-city"
//                 name="clientAddress-city"
//                 defaultValue={info?.clientAddress?.city}
//                 required
//               />
//             </div>
//             <div>
//               <Label htmlFor="clientAddress-postCode">Post Code</Label>
//               <Input
//                 id="clientAddress-postCode"
//                 name="clientAddress-postCode"
//                 defaultValue={info?.clientAddress?.postCode}
//                 required
//               />
//             </div>
//             <div>
//               <Label htmlFor="clientAddress-country">Country</Label>
//               <Input
//                 id="clientAddress-country"
//                 name="clientAddress-country"
//                 defaultValue={info?.clientAddress?.country}
//                 required
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Invoice Details */}
//       <div className="space-y-4">
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <Label htmlFor="createdAt">Invoice Date</Label>
//             <Input
//               id="createdAt"
//               name="createdAt"
//               type="date"
//               defaultValue={info?.createdAt}
//               required
//             />
//           </div>
//           <div>
//             <Label htmlFor="paymentTerms">Payment Terms</Label>
//             <Select
//               name="paymentTerms"
//               defaultValue={info?.paymentTerms?.toString() || "30"}
//             >
//               <SelectTrigger>
//                 <SelectValue placeholder="Select terms" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectGroup>
//                   <SelectLabel>Payment Terms</SelectLabel>
//                   <SelectItem value="1">Net 1 Day</SelectItem>
//                   <SelectItem value="7">Net 7 Days</SelectItem>
//                   <SelectItem value="14">Net 14 Days</SelectItem>
//                   <SelectItem value="30">Net 30 Days</SelectItem>
//                 </SelectGroup>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>

//         <div>
//           <Label htmlFor="description">Project Description</Label>
//           <Input
//             id="description"
//             name="description"
//             defaultValue={info?.description}
//             placeholder="e.g. Graphic Design Service"
//             required
//           />
//         </div>
//       </div>

//       {/* Item List */}
//       <ItemList info={info?.items} />

//       {/* Form Actions */}
//       <div className="flex justify-end gap-2 pt-4">
//         {info ? (
//           <>
//             <Button type="button" variant="outline" onClick={onSuccess}>
//               Cancel
//             </Button>
//             <Button type="submit" disabled={loading}>
//               {loading ? "Saving..." : "Save Changes"}
//             </Button>
//           </>
//         ) : (
//           <>
//             <Button type="button" variant="outline" onClick={onSuccess}>
//               Discard
//             </Button>
//             <Button
//               type="submit"
//               id="draft"
//               variant="secondary"
//               disabled={loading}
//             >
//               {loading ? "Saving..." : "Save as Draft"}
//             </Button>
//             <Button type="submit" id="pending" disabled={loading}>
//               {loading ? "Sending..." : "Save & Send"}
//             </Button>
//           </>
//         )}
//       </div>
//     </form>
//   );
// }
