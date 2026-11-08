import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Reviewers() {
  const [reviewers, setReviewers] = useState([]);

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

  return (
    <>
      <header>
        <h1 className="text-2xl font-bold">Reviewers</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {reviewers.map((reviewer, index) => (
          <div
            className="group h-48 flex flex-col justify-between p-2 gap-4 bg-neutral-bg border border-border rounded-md shadow cursor-pointer transition-transform duration-300 hover:scale-101"
            key={index}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium">{reviewer.quizType}</span>
              <svg
                className="lucide lucide-ellipsis preview-icon w-5 h-5 text-transparent rounded-full transition-colors duration-300 group-hover:text-text-secondary"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
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

              <button className="px-2 py-1 text-sm font-base text-transparent bg-transparent rounded-md cursor-pointer transition-colors group-hover:text-contrast-primary group-hover:bg-primary">
                Review
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Reviewers;
