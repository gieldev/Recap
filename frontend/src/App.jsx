import {useState } from "react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import AuthModal from "./components/AuthModal";
import Signup from "./pages/Signup";

function App() {
  // State variables for styling
  const [signingIn, setSigningIn] = useState(false);

  return (
    <>
      <Navbar signingIn={signingIn} setSigningIn={setSigningIn} />
      <Signup />
      <AuthModal signingIn={signingIn} setSigningIn={setSigningIn} />
    </>
  );
}

export default App;
