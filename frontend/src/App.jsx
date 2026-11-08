import { useState } from "react";
import { Routes, Route } from "react-router-dom";

// App Pages
import Dashboard from "./AppPages/Dashboard";
import Reviewers from "./AppPages/Reviewers";
import Create from "./AppPages/Create";

// Create Pages
import MultipleChoices from "./AppPages/CreatePages/MultipleChoices";

// Reviewer Pages
import MultipleChoicesQuiz from "./AppPages/ReviewerPages/MultipleChoicesQuiz";

// Global Components
import PageContainer from "./AppComponents/PageContainer";

function App() {

  return (
      <Routes>
        <Route
          path="/app"
          element={<PageContainer />}
        >
          {/* App Pages */}
          <Route path="/app/dashboard" element={<Dashboard />} />
          <Route path="/app/reviewers" element={<Reviewers />} />
          <Route path="/app/create" element={<Create />} />

          {/* Create App Pages */}
          <Route
            path="/app/create/multiple-choices"
            element={<MultipleChoices />}
          />

          {/* Review App Pages */}
          <Route
            path="/app/reviewer/multiple-choices/:id"
            element={<MultipleChoicesQuiz />}
          />
        </Route>
      </Routes>
  );
}

export default App;
