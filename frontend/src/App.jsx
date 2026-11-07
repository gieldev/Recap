import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// App Pages
import Dashboard from "./AppPages/Dashboard";
import Reviewers from "./AppPages/Reviewers";
import Create from "./AppPages/Create";

// Global Components
import Sidebar from "./AppComponents/Sidebar";
import MultipleChoices from "./AppPages/CreatePages/MultipleChoices";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const isAppRoute = location.pathname.startsWith("/app");

  return (
    <div className="flex">
      {isAppRoute && (
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      )}

      <Routes>
        <Route path="/app/dashboard" element={<Dashboard sidebarOpen={sidebarOpen} />} />
        <Route path="/app/reviewers" element={<Reviewers sidebarOpen={sidebarOpen} />} />
        <Route path="/app/create" element={<Create sidebarOpen={sidebarOpen} />} />

        <Route
          path="/app/create/multiple-choices"
          element={<MultipleChoices />}
        />
      </Routes>
    </div>
  );
}

export default App;
