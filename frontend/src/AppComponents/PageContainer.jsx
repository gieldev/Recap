import { useState } from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";

import Sidebar from "./Sidebar";
import PrivacyModal from "./modals/PrivacyModal";

function PageContainer() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const isAppRoute = location.pathname.startsWith("/app");
  const token = localStorage.getItem("token");

  const [active, setActive] = useState(false);

  if (!token) {
    return <Navigate to={"/auth/signin"} replace />
  }

  return (
    <>
      <div className="min-h-screen flex">
        {isAppRoute && (
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} active={active} setActive={setActive} />
        )}
        
        <main
          className={`min-h-screen h-full flex-1 flex flex-col px-16 py-16 gap-8 bg-contrast-bg transition-all duration-300 ${sidebarOpen ? "ml-0" : "lg:ml-72"}`}
        >
          <Outlet />
        </main>

        <PrivacyModal active={active} setActive={setActive} />
      </div>
    </>
  );
}

export default PageContainer;