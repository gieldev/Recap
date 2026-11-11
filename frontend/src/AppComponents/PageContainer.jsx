import { useState } from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";

import Sidebar from "./Sidebar";

function PageContainer() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const isAppRoute = location.pathname.startsWith("/app");
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to={"/"} replace />
  }

  return (
    <>
      <div className="h-screen flex">
        {isAppRoute && (
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        )}
        
        <main
          className={`flex-1 flex flex-col min-h-screen h-full px-16 py-16 gap-8 bg-contrast-bg transition-all duration-300 ${sidebarOpen ? "ml-0" : "lg:ml-72"}`}
        >
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default PageContainer;