import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

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
        <Route path="/app/dashboard" element={<Dashboard />} />
        <Route path="/app/reviewers" element={<Reviewers />} />
        <Route path="/app/create" element={<Create />} />
        <Route
          path="/app/create/multiple-choices"
          element={<MultipleChoices />}
        />
      </Routes>
    </div>
  );
}

export default App;
