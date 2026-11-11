import { useState } from "react";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password, confirmPassword }),
    });

    const data = await res.json();
    localStorage.setItem("token", data.token);

    console.log("Signed up: ", data);
  };

  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={handleSignUp}>
        <div className="flex flex-col">
          <label className="text-sm font-semibold">Username</label>
          <input
            className="w-full px-4 py-3 border border-border rounded-md"
            type="text"
            placeholder="Enter your username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
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
        <div className="flex flex-col">
          <label className="text-sm font-semibold">Confirm Password</label>
          <input
            className="w-full px-4 py-3 border border-border rounded-md"
            type="password"
            placeholder="Confirm your password..."
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button className="px-4 py-3 text-sm text-contrast-primary bg-primary border rounded-md cursor-pointer">
          Sign Up
        </button>
      </form>
    </>
  );
}

export default SignUp;
