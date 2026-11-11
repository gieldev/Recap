import { useState } from "react";

function SignIn() {
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

    if (!res.ok) {
      console.log("Sign in failed: ", data.message);
      return;
    }

    localStorage.setItem("token", data.token);

    console.log("Signed in: ", data);
  };

  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={handleSignIn}>
        <div className="flex flex-col">
          <label className="text-sm font-semibold">Email</label>
          <input
            className="w-full px-4 py-3 border border-border rounded-md"
            type="email"
            placeholder="Enter your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold">Password</label>
          <input
            className="w-full px-4 py-3 border border-border rounded-md"
            type="password"
            placeholder="Enter your password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="px-4 py-3 text-sm text-contrast-primary bg-primary border rounded-md cursor-pointer">
          Sign In
        </button>
      </form>
    </>
  );
}

export default SignIn;
