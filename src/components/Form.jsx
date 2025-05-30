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

export default function Form() {
  return (
    <form className="p-4 pt-[56px] h-full overflow-y-auto">
      {/*Bill From*/}
      <div className="mb-8">
        <h3 className="text-2xl font-medium mb-4">Bill From</h3>
        <div className="flex flex-col gap-5">
          <div class="grid w-full max-w-full items-center gap-1.5">
            <Label htmlFor="senderAddress-street">Street Address</Label>
            <Input
              type="text"
              id="senderAddress-street"
              placeholder="Street Address"
              name="senderAddress-street"
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-5">
          <div class="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="senderAddress-city">City</Label>
            <Input
              type="text"
              id="senderAddress-city"
              placeholder="City"
              name="senderAddress-city"
            />
          </div>

          <div class="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="senderAddress-postcode">Post Code</Label>
            <Input
              type="text"
              id="senderAddress-postcode"
              placeholder="Post Code"
              name="senderAddress-postcode"
            />
          </div>

          <div class="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="senderAddress-country">Country</Label>
            <Input
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
          <div class="grid w-full max-w-full items-center gap-1.5">
            <Label htmlFor="clientName">Client’s Name</Label>
            <Input
              type="text"
              id="clientName"
              placeholder="Client’s Name"
              name="clientName"
            />
          </div>
          <div class="grid w-full max-w-full items-center gap-1.5">
            <Label htmlFor="clientEmail">Client’s Email</Label>
            <Input
              type="text"
              id="clientEmail"
              placeholder="Client’s Email"
              name="clientEmail"
            />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div class="grid w-full max-w-full items-center gap-1.5">
            <Label htmlFor="clientAddress-street">Street Address</Label>
            <Input
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
              type="text"
              id="clientAddress-city"
              placeholder="City"
              name="clientAddress-city"
            />
          </div>

          <div class="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="clientAddress-postcode">Post Code</Label>
            <Input
              type="text"
              id="clientAddress-postcode"
              placeholder="Post Code"
              name="clientAddress-postcode"
            />
          </div>

          <div class="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="clientAddress-country">Country</Label>
            <Input
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
          <div class="grid w-full max-w-full items-center gap-1.5">
            <Label htmlFor="createdAt">Invoice Date</Label>
            <Input
              type="date"
              id="createdAt"
              placeholder="Invoice Date"
              name="createdAt"
            />
          </div>
          <Select name="paymentTerms">
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

        <div class="grid w-full max-w-full items-center gap-1.5">
          <Label htmlFor="description">Project Description</Label>
          <Input
            type="text"
            id="description"
            placeholder="Project Description"
            name="description"
          />
        </div>
      </div>

      <ItemList />

      <div className="flex justify-end gap-5 mt-10">
        <Button variant={"outline"}>Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </form>
  );
}
