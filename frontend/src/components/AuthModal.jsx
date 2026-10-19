import { useState } from "react";

function AuthModal({ signingIn, setSigningIn }) {
  // State variables for email and password input fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    const handleSignIn = async (e) => {
      e.preventDefault();
  
      const res = await fetch("http://localhost:3000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await res.json();
  
      console.log("Signed in: ", data);
    };

  return (
    <div
      className={`fixed bottom-0 left-0 w-full h-full flex items-center justify-center bg-black/50 ${signingIn ? "block" : "hidden"}`}
    >
      <div className="flex flex-col items-center justify-center px-8 py-6 bg-white">
        <h1>Sign In</h1>
        <button className="cursor-pointer" onClick={() => setSigningIn(false)}>
          X
        </button>
        <form className="flex flex-col gap-4" onSubmit={handleSignIn}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="border cursor-pointer" type="submit">
            Sign In
          </button>
          <p>
            No account? <a className="cursor-pointer">Create one!</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default AuthModal;