import { useState } from "react";

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const fakeQuiz = {
    questions: [
      {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        correctIndex: 0,
        AnswerIndex: null,
      },
      {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correctIndex: 1,
        AnswerIndex: null,
      },
    ],
  };

  function handleFinished() {
    for (let i = 0; i < fakeQuiz.questions.length; i++) {
      if (fakeQuiz.questions[i].AnswerIndex === fakeQuiz.questions[i].correctIndex) {
        setScore((prevScore) => prevScore + 1);
      }
    }
  }

  return (
    <>
      <main>
        {finished ? (
          <div>
            <h1>Quiz Finished</h1>
            <p>Score: {score}</p>
          </div>
        ) : (
          <div>
            <header>
              <h1>Quiz</h1>
            </header>

            <div>
              <span>
                Question {currentQuestion} out of {fakeQuiz.questions.length}
              </span>
              <p>{fakeQuiz.questions[currentQuestion - 1].question}</p>

              <div>
                {fakeQuiz.questions[currentQuestion - 1].options.map(
                  (option, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        (fakeQuiz.questions[currentQuestion - 1].AnswerIndex =
                          index)
                      }
                    >
                      {option}
                    </button>
                  ),
                )}
              </div>
            </div>

            <button
              onClick={() => {
                currentQuestion != fakeQuiz.questions.length
                  ? setCurrentQuestion(currentQuestion + 1)
                  : setFinished(true);
                handleFinished();
              }}
            >
              {currentQuestion == fakeQuiz.questions.length ? "Finish" : "Next"}
            </button>
          </div>
        )}
      </main>
    </>
  );
}

export default Quiz;
