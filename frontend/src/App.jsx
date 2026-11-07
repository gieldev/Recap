import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// App Pages
import Dashboard from "./AppPages/Dashboard";
import Reviewers from "./AppPages/Reviewers";
import Create from "./AppPages/Create";

// Global Components
import Sidebar from "./AppComponents/Sidebar";
import MultipleChoices from "./AppPages/CreatePages/MultipleChoices";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <Routes>
          <Route path="/app/dashboard" element={<Dashboard />} />
          <Route path="/app/reviewers" element={<Reviewers />} />
          <Route path="/app/create" element={<Create />} />

          <Route path="/app/create/multiple-choices" element={<MultipleChoices />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
