import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function RootLayout() {
  return (
    <>
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
