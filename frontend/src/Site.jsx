import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

function Site() {
  const [signingIn, setSigningIn] = useState(false);
  const location = useLocation();

  const isAppRoute = location.pathname.startsWith("/app");

  return (
    <>
      {!isAppRoute && (
        <Navbar signingIn={signingIn} setSigningIn={setSigningIn} />
      )}

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/tools/quiz-tool" element={<QuizTool />} />
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

      {!isAppRoute && (
        <>
          <footer>{/* Your footer */}</footer>
          <AuthModal signingIn={signingIn} setSigningIn={setSigningIn} />
        </>
      )}
    </>
  );
}
