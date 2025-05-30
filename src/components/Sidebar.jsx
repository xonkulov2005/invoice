import LogoImg from "../assets/logo.svg";
import ThemesToggle from "./ThemesToggle";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import myImg from "../assets/image.png";
function Sidebar() {
  return (
    <div className="bg-[#373B53] flex items-center justify-between md:flex-col md:h-full md:fixed md:left-0 md:top-0 md:bottom-0 z-[500]">
      <img src={LogoImg} />
      <div className="mr-5 md:mr-0 md:mb-5">
        <ThemesToggle />
      </div>
      <Avatar className="mb-3 size-11">
        <AvatarImage src={myImg} />
        <AvatarFallback>XM</AvatarFallback>
      </Avatar>
    </div>
  );
}

export default Sidebar;
