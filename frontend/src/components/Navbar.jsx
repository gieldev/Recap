import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar({ setSigningIn }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    {
      to: "/home",
      content: "Home"
    },
    {
      to: "/create",
      content: "Create"
    },
    {
      to: "/about",
      content: "About"
    }
  ]

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  });

  return (
    <header className="fixed w-full h-16 flex items-center justify-between bg-neutral-bg border-b border-border z-1">
      <div 
        className="w-full flex items-center justify-between px-8 py-6
        lg:px-24"
      >
        <div className="flex items-center gap-2">
          <div 
            className="w-12 h-12 flex items-center bg-gray-300
            lg:w-8 lg:h-8"
          ></div>
          <Link className="text-xl font-bold lg:text-lg" to="/">
            RecallIt.
          </Link>
        </div>
        <nav>
          {/* <button className="cursor-pointer" onClick={() => setSigningIn(true)}>
          Sign In
        </button> */}
          <svg
            className="cursor-pointer lg:hidden"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#000000"
            viewBox="0 0 256 256"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path>
          </svg>
          <ul className="gap-4 cursor-pointer hidden lg:flex">
            {links.map((link, index) => (
              <li>
                <Link to={link.to}>{link.content}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* mobile menu */}
      <div
        className={`fixed inset-0 z-50 bg-neutral-bg ${menuOpen ? "" : "hidden"}`}
      >
        <div className="h-24 flex justify-end px-8 py-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#000000"
            viewBox="0 0 256 256"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
          </svg>
        </div>
        <nav>
          <ul className="flex flex-col items-end px-8 py-6 gap-4">
              {links.map((link, index) => (
                <li>
                  <Link className="text-lg" to={link.to}>{link.content}</Link>
                </li>
              ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
