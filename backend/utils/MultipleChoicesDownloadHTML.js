function MultipleChoicesDownloadHTML(reviewer) {
  const quizData = JSON.stringify({
    topic: reviewer.topic,
    description: reviewer.description || "",
    questions: reviewer.questions.map((question) => ({
      question: question.question,
      options: question.options,
      answer: Number(question.answer),
      explanation: question.explanation || "",
    })),
  }).replace(/</g, "\\u003c");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHTML(reviewer.topic)}</title>

  <style>
    :root {
      --color-primary: #4F46E5;
      --color-secondary: #818cf8;
      --color-accent: #000000;

      --color-neutral-bg: #ffffff;
      --color-contrast-bg: #f5f6f8;
      --color-surface-bg: #ffffff;

      --color-text-primary: #111827;
      --color-text-secondary: #64748b;
      --color-text-muted: #000000;
      --color-contrast-primary: #ffffff;

      --color-border: #e2e8f0;
      --color-highlight: #F3F4F6;
    }

    * {
      box-sizing: border-box;
    }

    body {
      font-family: 'Poppins', Arial, sans-serif;
      color: var(--color-text-primary);
      margin: 0;
      background: var(--color-contrast-bg);
    }

    .reviewer {
      width: 100%;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      padding: 64px;
      gap: 32px;
      background: var(--color-neutral-bg);
      border-radius: 16px;
    }

    h1 {
      font-size: 24px;
      font-weight: 700;
      margin: 0;
    }

    h2 {
      font-size: 20px;
      font-weight: 600;
      margin: 0;
    }

    .content {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .question-info {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .question-progress {
      font-size: 14px;
      color: var(--color-text-secondary);
      margin: 0;
    }

    .answer-feedback {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .answer-feedback p,
    .answer-feedback h3 {
      margin: 0;
    }

    .options {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-top: 16px;
    }

    button {
      font-family: inherit;
      cursor: pointer;
    }

    .option {
      padding: 8px 16px;
      border: 1px solid var(--color-border);
      border-radius: 12px;
      background: transparent;
      color: var(--color-text-primary);
      text-align: left;
      font-size: 16px;
    }

    .option.selected {
      background: var(--color-primary);
      color: var(--color-neutral-bg);
    }

    .option.correct {
      background: #16a34a;
      color: white;
    }

    .option.incorrect {
      background: #dc2626;
      color: white;
    }

    .navigation {
      display: flex;
      justify-content: space-between;
      margin-top: 24px;
    }

    .navigation-actions {
      display: flex;
      gap: 8px;
    }

    .nav-button {
      font-size: 16px;
      padding: 4px 8px;
      border: 1px solid var(--color-border);
      border-radius: 12px;
      background: transparent;
      color: var(--color-text-primary);
    }

    button:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .finished {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    @media (max-width: 768px) {
      .reviewer {
        padding: 24px;
      }

      .navigation {
        gap: 12px;
        flex-wrap: wrap;
      }
    }
  </style>
</head>

<body>

  <div class="reviewer">

    <header>
      <h1 id="topic"></h1>
    </header>

    <main id="quizContent" class="content">

      <section class="question-info">

        <p id="progress" class="question-progress"></p>

        <h2 id="question"></h2>

        <div id="feedback" class="answer-feedback"></div>

        <div id="options" class="options"></div>

      </section>

      <div class="navigation">

        <button id="previous" class="nav-button">
          Previous
        </button>

        <div class="navigation-actions">

          <button id="submit" class="nav-button">
            Submit
          </button>

          <button id="next" class="nav-button">
            Next Question
          </button>

        </div>

      </div>

    </main>

    <section id="finished" class="finished" hidden>
      <h2>Quiz Completed!</h2>
      <p id="score"></p>
    </section>

  </div>

  <script>
    const quizData = ${quizData};

    let currentQuestion = 0;
    let score = 0;
    let selected = null;

    const userQuizData = [];

    const topic = document.getElementById("topic");
    const progress = document.getElementById("progress");
    const question = document.getElementById("question");
    const feedback = document.getElementById("feedback");
    const options = document.getElementById("options");

    const previous = document.getElementById("previous");
    const submit = document.getElementById("submit");
    const next = document.getElementById("next");

    const quizContent = document.getElementById("quizContent");
    const finished = document.getElementById("finished");
    const scoreDisplay = document.getElementById("score");

    topic.textContent = quizData.topic;

    function renderQuestion() {
      const current = quizData.questions[currentQuestion];
      const result = userQuizData[currentQuestion];

      selected = null;

      progress.textContent =
        "Question " + (currentQuestion + 1) +
        " of " + quizData.questions.length;

      question.textContent = current.question;

      feedback.innerHTML = "";

      if (result) {
        const resultText = document.createElement("p");

        resultText.textContent = result.isCorrect
          ? "Correct"
          : "Wrong";

        const correctAnswer = document.createElement("h3");

        correctAnswer.textContent =
          "Correct answer: " + current.options[result.currentCorrectAnswer];

        const explanation = document.createElement("p");

        explanation.textContent = current.explanation;

        feedback.append(resultText, correctAnswer, explanation);
      }

      options.innerHTML = "";

      current.options.forEach((option, index) => {
        const button = document.createElement("button");

        button.className = "option";
        button.textContent = option;

        if (result) {
          if (index === result.currentCorrectAnswer) {
            button.classList.add("correct");
          } else if (index === result.finalSelected) {
            button.classList.add("incorrect");
          }

          button.disabled = true;
        } else {
          button.addEventListener("click", () => {
            selected = index;
            renderOptions();
          });
        }

        options.appendChild(button);
      });

      previous.disabled = currentQuestion === 0;
      submit.disabled = selected === null || result != null;
      next.disabled = result == null;
    }

    function renderOptions() {
      const current = quizData.questions[currentQuestion];

      options.innerHTML = "";

      current.options.forEach((option, index) => {
        const button = document.createElement("button");

        button.className =
          "option" + (selected === index ? " selected" : "");

        button.textContent = option;

        button.addEventListener("click", () => {
          selected = index;
          renderOptions();
        });

        options.appendChild(button);
      });

      submit.disabled = selected === null;
    }

    submit.addEventListener("click", () => {
      if (selected === null) return;

      const current = quizData.questions[currentQuestion];

      const currentCorrectAnswer = Number(current.answer);

      const isCorrect = currentCorrectAnswer === selected;

      userQuizData[currentQuestion] = {
        currentCorrectAnswer,
        finalSelected: selected,
        isCorrect,
      };

      if (isCorrect) {
        score++;
      }

      renderQuestion();
    });

    previous.addEventListener("click", () => {
      if (currentQuestion === 0) return;

      currentQuestion--;
      renderQuestion();
    });

    next.addEventListener("click", () => {
      if (currentQuestion === quizData.questions.length - 1) {
        showFinished();
        return;
      }

      currentQuestion++;
      renderQuestion();
    });

    function showFinished() {
      quizContent.hidden = true;
      finished.hidden = false;

      scoreDisplay.textContent =
        "Score: " + score + " / " + quizData.questions.length;
    }

    renderQuestion();
  </script>

</body>
</html>`;
}

function escapeHTML(value = "") {
  return String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char],
  );
}

module.exports = { MultipleChoicesDownloadHTML };
