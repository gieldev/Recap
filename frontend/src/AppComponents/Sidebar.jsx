import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useState, useRef, useEffect } from "react";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);

  const [open, setOpen] = useState(false);
  const popupRef = useRef(null);
  
    useEffect(() => {
      function handleClickOutside(event) {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
          setOpen(false);
        }
      }
  
      document.addEventListener("mousedown", handleClickOutside);
  
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

  return (
    <aside
      className={`top-0 left-0 h-screen w-72 flex flex-col px-4 py-4 gap-4 bg-neutral-bg transition-all duration-300
    ${sidebarOpen ? "fixed -translate-x-full" : "fixed lg:fixed translate-x-0"}`}
    >
      <header className="h-8 flex items-center justify-between">
        <div className="relative h-8 flex cursor-pointer ">
          <div className=" flex items-center p-2 gap-2 rounded-md transition-colors duration-300 hover:bg-highlight" onClick={() => setOpen(!open)}>
            <p className="text-sm font-semibold">{decoded.username}</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              fill="#000000"
              viewBox="0 0 256 256"
            >
              <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
            </svg>
          </div>

          <div
            className={`absolute top-10 left-0 w-48 flex p-1 bg-neutral-bg border border-border rounded-md shadow ${open ? "block" : "hidden"}`}
            ref={popupRef}
          >
            <ul className="w-full flex flex-col">
              <li className="flex w-full">
                <button className="w-full p-2 text-start text-sm rounded-md cursor-pointer hover:bg-highlight">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`absolute w-8 h-8 flex items-center justify-center rounded-md cursor-pointer transition-all duration-300 hover:bg-highlight
      ${sidebarOpen ? "-right-12" : "right-4"}`}
        >
          <svg
            className="lucide lucide-panel-left preview-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M9 3v18" />
          </svg>
        </button>
      </header>

      <div className="w-full flex">
        <Link
          className="w-full h-8 flex items-center p-2 gap-2 text-sm font-medium text-contrast-primary bg-primary rounded-md cursor-pointer"
          to={"/app/create"}
        >
          <svg
            className="fill-contrast-primary rounded-full"
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="#000000"
            viewBox="0 0 256 256"
          >
            <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
          </svg>
          Create Reviewer
        </Link>
      </div>

      <div className="w-full flex">
        <ul className="w-full">
          <li className="w-full">
            <Link
              className="w-full h-8 flex items-center p-2 gap-2 text-sm font-medium rounded-md hover:bg-highlight"
              to={"/app/dashboard"}
            >
              <svg
                className="lucide lucide-layout-dashboard preview-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="7" height="9" x="3" y="3" rx="1" />
                <rect width="7" height="5" x="14" y="3" rx="1" />
                <rect width="7" height="9" x="14" y="12" rx="1" />
                <rect width="7" height="5" x="3" y="16" rx="1" />
              </svg>
              Dashboard
            </Link>
            <Link
              className="w-full h-8 flex items-center p-2 gap-2 text-sm font-medium rounded-md hover:bg-highlight"
              to={"/app/reviewers"}
            >
              <svg
                className="lucide lucide-files preview-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 2h-4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8" />
                <path d="M16.706 2.706A2.4 2.4 0 0 0 15 2v5a1 1 0 0 0 1 1h5a2.4 2.4 0 0 0-.706-1.706z" />
                <path d="M5 7a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 1.732-1" />
              </svg>
              Reviewers
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
