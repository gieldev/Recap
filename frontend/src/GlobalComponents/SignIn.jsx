import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    const res = await fetch(`${import.meta.env.VITE_API_URL}api/auth/signin`, {
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

    navigation("/app/dashboard", { replace: true });
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
        <div>
          <p>
            No account? <Link to={"/auth/signup"}>Sign up</Link>
          </p>
        </div>
      </form>
    </>
  );
}

export default SignIn;
