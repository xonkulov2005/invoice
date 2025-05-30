import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "./ui/checkbox";
import { Button, buttonVariants } from "./ui/button";
import { useEffect, useState } from "react";
import { ArrowDown, PlusCircleIcon } from "lucide-react";
import { useAppStore } from "../lib/zustand";
import { queryGenerator } from "../lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Form from "./Form";

// const info = {
//   createdAt: "2021-08-18",
//   paymentDue: "2021-08-19",
//   description: "Re-branding",
//   paymentTerms: 1,
//   clientName: "Jensen Huang",
//   clientEmail: "jensenh@mail.com",
//   status: "paid",
//   senderAddress: {
//     street: "19 Union Terrace",
//     city: "London",
//     postCode: "E1 3EZ",
//     country: "United Kingdom",
//   },
//   clientAddress: {
//     street: "106 Kendell Street",
//     city: "Sharrington",
//     postCode: "NR24 5WQ",
//     country: "United Kingdom",
//   },
//   items: [
//     {
//       name: "Brand Guidelines",
//       quantity: 1,
//       price: 1800.9,
//       total: 1800.9,
//     },
//   ],
//   id: 1,
//   total: 1800.9,
// };

export default function Header() {
  const { setFilter } = useAppStore();
  const [items, setItems] = useState({
    draft: true,
    paid: true,
    pending: true,
  });

  function handleChange(key) {
    setItems((prev) => {
      return { ...prev, [key]: !prev[key] };
    });
  }

  useEffect(() => {
    const query = queryGenerator(items);
    setFilter(query);
  }, [JSON.stringify(items)]);

  return (
    <header>
      <div className="base-container flex items-center justify-between py-10">
        <div>
          <h1 className="text-[32px] font-[700]">Invoices</h1>
          <p className="text-[12px] font-[400] text-[#888EB0]">
            There are 7 total invoices
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className={"ml-auto mr-10"} variant="ghost">
              Filter by status
              <ArrowDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Statuses</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="flex flex-col">
              {Object.entries(items).map(([key, value]) => {
                return (
                  <label
                    key={key}
                    className={`${buttonVariants({
                      variant: "ghost",
                    })} justify-start capitalize`}
                    htmlFor={key}
                  >
                    <Checkbox
                      value={key}
                      checked={value}
                      id={key}
                      onCheckedChange={() => handleChange(key)}
                    />
                    {key}
                  </label>
                );
              })}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <Sheet>
          <SheetTrigger className={buttonVariants({ variant: "default" })}>
            <PlusCircleIcon />
            New Invoices
          </SheetTrigger>
          <SheetContent
            className="md:ml-[72px] md:px-14 w-full min-w-[calc(80%-72px)] min-h-[calc(100%-56px)] overflow-auto"
            side="left"
          >
            <SheetHeader className="sticky w-full bg-white border-b">
              <SheetTitle>Are you absolutely sure?</SheetTitle>
            </SheetHeader>
            <Form info={null} />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
