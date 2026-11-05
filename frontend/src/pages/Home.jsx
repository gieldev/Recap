import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [reviewers, setReviewers] = useState([]);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3000/data/user/reviewers", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response) {
        console.log("No find mannn");
      }

      const reviewers = await response.json();
      setReviewers(reviewers.reviewers);

      console.log(reviewers);

    } catch (error) {

    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      <main className="min-h-screen flex flex-col pt-24 gap-24">
        {/* List of learning tools */}
        <section className="w-full h-fit flex flex-col px-8 py-6 gap-8">
          <div className="flex items-center justify-between px-4 py-2 gap-2 border-2 border-dashed rounded-xl">
            <h2 className="text-md">
              Start making your <br /> reviewers
            </h2>
            <Link
              className="w-fit px-4 py-2 text-sm text-contrast-primary bg-primary rounded-xl"
              to={"/tools"}
            >
              See Tools
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold">Recent Reviewers</h2>
            <div className="flex flex-col gap-2">
              {reviewers.map((reviewer, index) => (
                <Link
                  className="flex px-2 py-2 gap-2 border rounded-xl cursor-pointer"
                  key={index}
                  to={`/quiz/${reviewer._id}`}
                >
                  <div className="w-10 h-12 bg-gray-300"></div>
                  <div className="flex items-center">
                    <h3 className="text-xl font-semibold">{reviewer.topic}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;
