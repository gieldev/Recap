import {useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

// Page imports
import Landing from "./pages/Landing";

import Home from "./pages/Home";

// Tools page imports 
import Tools from "./pages/Tools";
import QuizTool from "./pages/Tools/QuizTool";

import Quiz from "./pages/Quiz";

import AuthModal from "./components/AuthModal";

import Signup from "./pages/Signup";

function App() {
  // State variables for styling
  const [signingIn, setSigningIn] = useState(false);

  return (
    <>
      <BrowserRouter>
        <Navbar signingIn={signingIn} setSigningIn={setSigningIn} />
        <Routes>
          <Route path="/" element={<Landing />} />

          <Route path="/home" element={<Home />} />

          <Route path="/tools" element={<Tools />} />
          <Route path="/tools/quiz-tool" element={<QuizTool />} />

          <Route path="/quiz" element={<Quiz />} />

          <Route path="/signup" element={<Signup />} />
        </Routes>

        <footer className="w-full h-fit flex items-center justify-between px-8 py-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-300"></div>
            <span className="text-sm">RecallIt.</span>
          </div>
        </footer>
        <AuthModal signingIn={signingIn} setSigningIn={setSigningIn} />
      </BrowserRouter>
    </>
  );
}

export default App;
