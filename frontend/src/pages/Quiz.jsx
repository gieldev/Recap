import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Quiz() {
  const [quizData, setQuizData] = useState(null);

  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [score, setScore] = useState(0);

  const [selected, setSelected] = useState(null);
  const [userQuizData, setUserQuizData] = useState([]);

  const [finished, setFinished] = useState(false);

  const { id } = useParams();

  const fetchQuizData = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3000/data/user/find/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch quiz.");
      }

      const quiz = await response.json();
      setQuizData(quiz.quiz);

      console.log(quiz);
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    }
  };

  const handleSubmit = (finalSelected) => {
    if (finalSelected === null) return;

    const currentCorrectAnswer = Number(
      quizData.questions[currentQuestion - 1].answer,
    );

    const isCorrect = currentCorrectAnswer === finalSelected;

    setUserQuizData((prev) => {
      const updated = [...prev];
      updated[currentQuestion - 1] = {
        currentCorrectAnswer,
        finalSelected,
        isCorrect,
      };
      return updated;
    });

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setSelected(null);
  };

  useEffect(() => {
    fetchQuizData();
  }, [id]);

  useEffect(() => {
    console.log("Score after update:", score);
  }, [score]);

  return (
    <>
      <main className="min-h-screen flex flex-col pt-24 gap-24">
        <section className="w-full h-fit flex flex-col px-8 py-6 gap-8">
          {finished ? (
            <div>
              {quizData ? (
                <div className="flex flex-col gap-4">
                  <h1 className="text-2xl font-bold">{quizData.topic}</h1>

                  <p>Score: {score}</p>
                </div>
              ) : (
                <p>Loading quiz...</p>
              )}
            </div>
          ) : (
            <div>
              {quizData ? (
                <div className="flex flex-col gap-4">
                  <h1 className="text-2xl font-bold">{quizData.topic}</h1>

                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-text-secondary">
                      Question {currentQuestion} of {quizData.questions.length}
                    </p>

                    <h2 className="text-xl font-semibold">
                      {quizData.questions[currentQuestion - 1].question}
                    </h2>

                    <div>
                      {userQuizData[currentQuestion - 1] && (
                        <p>
                          {userQuizData[currentQuestion - 1].isCorrect
                            ? "Correct"
                            : "Wrong"}
                        </p>
                      )}
                      {userQuizData[currentQuestion - 1] != null && (
                        <h3>
                          Correct answer:{" "}
                          {
                            quizData.questions[currentQuestion - 1].options[
                              userQuizData[currentQuestion - 1]
                                .currentCorrectAnswer
                            ]
                          }
                        </h3>
                      )}
                    </div>

                    <div className="flex flex-col gap-2 mt-4">
                      {quizData.questions[currentQuestion - 1].options.map(
                        (option, index) => {
                          const result = userQuizData[currentQuestion - 1];

                          const isAnswered = result != null;
                          const isCorrect =
                            result?.currentCorrectAnswer === index;
                          const isSelected = result?.finalSelected === index;

                          return (
                            <button
                              key={index}
                              className={`px-4 py-2 border rounded-xl cursor-pointer ${
                                isAnswered
                                  ? isCorrect
                                    ? "bg-green-600"
                                    : isSelected
                                      ? "bg-red-600"
                                      : ""
                                  : selected === index
                                    ? "bg-primary text-neutral-bg"
                                    : ""
                              }`}
                              onClick={() => setSelected(index)}
                              disabled={isAnswered}
                            >
                              {option}
                            </button>
                          );
                        },
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between mt-6">
                    <button
                      className="text-md px-2 py-1 border rounded-xl"
                      onClick={() => {
                        setCurrentQuestion((prev) => prev - 1);
                        setSelected(null);
                      }}
                      disabled={currentQuestion === 1}
                    >
                      Previous
                    </button>

                    <div className="flex gap-2">
                      <button
                        className="text-md px-2 py-1 border rounded-xl"
                        onClick={() => handleSubmit(selected)}
                        disabled={
                          selected === null ||
                          userQuizData[currentQuestion - 1] != null
                        }
                      >
                        Submit
                      </button>

                      <button
                        className="text-md px-2 py-1 border rounded-xl"
                        onClick={() => {
                          setCurrentQuestion((prev) => prev + 1);
                          setSelected(null);

                          if (currentQuestion == quizData.questions.length) {
                            setFinished(true);
                          }
                        }}
                        disabled={
                          userQuizData[currentQuestion - 1] == null
                        }
                      >
                        Next Question
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <p>Loading quiz...</p>
              )}
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default Quiz;
