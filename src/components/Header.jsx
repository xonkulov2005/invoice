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
          <h1>Invoices</h1>
          <p>There are 7 total invoices</p>
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
            className="ml-[100px] w-full min-w-[calc(70%-100px)] min-h-[calc(100%-56px)] overflow-auto"
            side="left"
          >
            <SheetHeader className="sticky w-full bg-white border-b">
              <SheetTitle>Are you absolutely sure?</SheetTitle>
            </SheetHeader>
            <Form />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
