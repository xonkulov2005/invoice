import LogoImg from "../assets/logo.svg";
import ThemesToggle from "./ThemesToggle";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import myImg from "../assets/image.png";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useAppStore } from "../lib/zustand";
import Form from "./Form";

function Sidebar() {
  const { sheetOpen, setSheetOpen, editedData } = useAppStore();
  return (
    <>
      <div className="bg-[#373B53] flex items-center justify-between md:flex-col md:h-full md:fixed md:left-0 md:top-0 md:bottom-0 z-[500]  md:rounded-[0px_20px_20px_0px]">
        <img src={LogoImg} />
        <div className="mr-5 md:mr-0">
          <ThemesToggle />
        </div>
        <div>
          <Avatar className="size-11 md:mb-6 responsive-for-img">
            <AvatarImage src={myImg} />
            <AvatarFallback>XM</AvatarFallback>
          </Avatar>
        </div>
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetContent
            className="md:ml-[72px] md:px-14 w-full min-w-[calc(70%-72px)] min-h-[calc(100%-56px)] overflow-auto"
            side="left"
          >
            <SheetHeader className="sticky w-full bg-white border-b">
              <SheetTitle>Are you absolutely sure?</SheetTitle>
            </SheetHeader>
            <Form setSheetOpen={setSheetOpen} info={editedData} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

export default Sidebar;
