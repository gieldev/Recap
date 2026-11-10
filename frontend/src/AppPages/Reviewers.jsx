import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function Reviewers() {
  const [reviewers, setReviewers] = useState([]);
  const [visible, setVisible] = useState(null);
  const popupRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setVisible(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:3000/data/user/reviewers",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response) {
        console.log("No find mannn");
      }

      const reviewers = await response.json();
      setReviewers(reviewers.reviewers);

      console.log(reviewers);
    } catch (error) {}
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const deleteReviewer = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:3000/data/user/reviewers/delete",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id,
          }),
        },
      );

      const res = await response.json();

      console.log(res);
      window.location.reload();
    } catch (error) {}
  };

  const downloadReviewer = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:3000/data/user/reviewers/download",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id,
          }),
        },
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to download reviewer");
      }

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "reviewer.html";

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
    }
  };

  return (
    <>
      <header>
        <h1 className="text-2xl font-bold">Reviewers</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4" ref={popupRef}>
        {reviewers.map((reviewer, index) => (
          <Link
            className="group h-48 flex flex-col justify-between p-2 gap-4 bg-neutral-bg border border-border rounded-md shadow cursor-pointer transition-transform duration-300 hover:scale-101"
            key={index}
            to={`/app/reviewer/${reviewer.quizType}/${reviewer._id}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium">{reviewer.quizType}</span>
              <div className="relative">
                <svg
                  className="w-5 h-5 text-text-secondary transition-colors duration-300 group-hover:text-text-secondary"
                  onClick={(event) => {
                    if (visible != index) {
                      setVisible(index);
                    } else {
                      setVisible(null);
                    }
                    event.preventDefault();
                    event.stopPropagation();
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="19" cy="12" r="1" />
                  <circle cx="5" cy="12" r="1" />
                </svg>

                <div
                  className={`absolute top-full right-0 flex flex-col p-2 gap-1 bg-neutral-white border border-border rounded-md shadow z-10 ${visible === index ? "block" : "hidden"}`}
                >
                  <button
                    className="text-start text-sm cursor-pointer"
                    onClick={(event) => {
                      deleteReviewer(reviewer._id);
                      event.preventDefault();
                      event.stopPropagation();
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="text-start text-sm cursor-pointer"
                    onClick={(event) => {
                      downloadReviewer(reviewer._id);
                      event.preventDefault();
                      event.stopPropagation();
                    }}
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-semibold">{reviewer.topic}</h2>
              <p
                className={`text-sm text-text-secondary ${
                  reviewer.description ? "block" : "block"
                }`}
              >
                {reviewer.description ? reviewer.description : "No Description"}
              </p>
              <p className="text-xs font-normal text-text-secondary">
                Date Created
              </p>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-text-secondary">
                {reviewer.questions.length} items
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Reviewers;
