import { Link } from "react-router-dom";

function Navbar({ setSigningIn }) {
  return (
    <header className="flex items-center justify-between px-8 py-6">
      <Link to="/">Recap</Link>
      <nav>
        <button className="cursor-pointer" onClick={() => setSigningIn(true)}>
          Sign In
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
