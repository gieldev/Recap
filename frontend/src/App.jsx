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

// Global App Components
import PageContainer from "./AppComponents/PageContainer";

// Global Pages
import Auth from "./GlobalPages/Auth";

// Global Components
import SignUp from "./GlobalComponents/SignUp";
import SignIn from "./GlobalComponents/SignIn";

function App() {

  return (
      <Routes>
        <Route path="/auth" element={<Auth />}>
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/auth/signin" element={<SignIn />} />
        </Route>
        
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
