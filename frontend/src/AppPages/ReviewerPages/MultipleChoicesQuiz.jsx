import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const LETTERS = ["A", "B", "C", "D", "E", "F"];

function MultipleChoicesQuiz() {
  const { id } = useParams();

  const [quiz, setQuiz] = useState(null);
  const [error, setError] = useState(null);

  const [current, setCurrent] = useState(0); // 0-based
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]); // { selected, correct, isCorrect }
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}data/user/find/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            signal: controller.signal,
          },
        );

        if (!response.ok) throw new Error("Failed to fetch quiz.");

        const data = await response.json();
        setQuiz(data.quiz);
      } catch (err) {
        if (err.name !== "AbortError") setError("Couldn't load this quiz.");
      }
    })();

    return () => controller.abort();
  }, [id]);

  if (error) return <p className="text-red-600">{error}</p>;
  if (!quiz) return <p className="text-text-secondary">Loading quiz…</p>;

  const questions = quiz.questions;
  const total = questions.length;
  const score = answers.filter((a) => a?.isCorrect).length;

  const question = questions[current];
  const result = answers[current];
  const isAnswered = result != null;
  const isLast = current === total - 1;

  const checkAnswer = () => {
    if (selected === null) return;
    const correct = Number(question.answer);
    setAnswers((prev) => {
      const next = [...prev];
      next[current] = { selected, correct, isCorrect: selected === correct };
      return next;
    });
  };

  const goNext = () => {
    if (isLast) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  };

  const goPrevious = () => {
    setCurrent((c) => c - 1);
    setSelected(null);
  };

  const restart = () => {
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setFinished(false);
  };

  /* ---------- Results ---------- */
  if (finished) {
    const missed = questions
      .map((q, i) => ({ q, a: answers[i], i }))
      .filter(({ a }) => a && !a.isCorrect);

    return (
      <div className="w-full max-w-xl mx-auto flex flex-col gap-10 px-6 py-12">
        <header className="flex flex-col gap-2">
          <p className="text-sm text-text-secondary">{quiz.topic}</p>
          <h1 className="text-5xl font-bold">
            {score} / {total}
          </h1>
          <p className="text-text-secondary">
            {score === total
              ? "Perfect score."
              : `You got ${Math.round((score / total) * 100)}% right.`}
          </p>
        </header>

        {missed.length > 0 && (
          <section className="flex flex-col gap-6">
            <h2 className="text-lg font-semibold">Review what you missed</h2>
            <ul className="flex flex-col gap-6">
              {missed.map(({ q, a, i }) => (
                <li key={i} className="flex flex-col gap-1">
                  <p className="font-medium">{q.question}</p>
                  <p className="text-sm text-red-600">
                    Your answer: {q.options[a.selected]}
                  </p>
                  <p className="text-sm text-green-600">
                    Correct answer: {q.options[a.correct]}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}

        <button
          onClick={restart}
          className="self-start px-5 py-2.5 rounded-xl bg-primary text-neutral-bg font-medium cursor-pointer"
        >
          Try again
        </button>
      </div>
    );
  }

  /* ---------- Question ---------- */
  const optionStyle = (index) => {
    const base =
      "w-full flex items-center gap-4 text-left px-4 py-3 rounded-xl border-2 transition-colors";

    if (isAnswered) {
      if (index === result.correct)
        return `${base} border-green-600 bg-green-500/10`;
      if (index === result.selected)
        return `${base} border-red-600 bg-red-500/10`;
      return `${base} border-transparent opacity-50`;
    }

    return selected === index
      ? `${base} border-primary bg-primary/5 cursor-pointer`
      : `${base} border-neutral-300/60 hover:border-primary/50 cursor-pointer`;
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-8 px-6 py-12 bg-neutral-bg rounded-xl">
      {/* Progress */}
      <header className="flex flex-col gap-3">
        <div className="flex justify-between text-sm text-text-secondary">
          <span>{quiz.topic}</span>
          <span>
            Question {current + 1} of {total}
          </span>
        </div>
        <div
          className="h-1 w-full rounded-full bg-neutral-300/40 overflow-hidden"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={current + (isAnswered ? 1 : 0)}
        >
          <div
            className="h-full bg-primary transition-all"
            style={{
              width: `${((current + (isAnswered ? 1 : 0)) / total) * 100}%`,
            }}
          />
        </div>
      </header>

      {/* Question + options */}
      <main className="flex flex-col gap-6">
        <h2 className="text-2xl font-semibold leading-snug">
          {question.question}
        </h2>

        <div role="radiogroup" className="flex flex-col gap-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              role="radio"
              aria-checked={
                isAnswered ? result.selected === index : selected === index
              }
              className={optionStyle(index)}
              onClick={() => setSelected(index)}
              disabled={isAnswered}
            >
              <span className="w-6 shrink-0 text-sm font-medium text-text-secondary">
                {LETTERS[index]}
              </span>
              <span className="flex-1">{option}</span>
              {isAnswered && index === result.correct && (
                <span aria-hidden className="text-green-600">
                  ✓
                </span>
              )}
              {isAnswered &&
                index === result.selected &&
                index !== result.correct && (
                  <span aria-hidden className="text-red-600">
                    ✕
                  </span>
                )}
            </button>
          ))}
        </div>

        {/* Feedback */}
        <p
          aria-live="polite"
          className={`min-h-6 text-sm font-medium ${
            isAnswered
              ? result.isCorrect
                ? "text-green-600"
                : "text-red-600"
              : ""
          }`}
        >
          {isAnswered &&
            (result.isCorrect
              ? "Correct"
              : `Incorrect. The answer is ${question.options[result.correct]}.`)}
        </p>
      </main>

      {/* Actions */}
      <footer className="flex items-center justify-between">
        <button
          onClick={goPrevious}
          disabled={current === 0}
          className="text-sm text-text-secondary cursor-pointer disabled:invisible"
        >
          Back
        </button>

        {isAnswered ? (
          <button
            onClick={goNext}
            className="px-5 py-2.5 rounded-xl bg-primary text-neutral-bg font-medium cursor-pointer"
          >
            {isLast ? "See results" : "Next question"}
          </button>
        ) : (
          <button
            onClick={checkAnswer}
            disabled={selected === null}
            className="px-5 py-2.5 rounded-xl bg-primary text-neutral-bg font-medium cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Check answer
          </button>
        )}
      </footer>
    </div>
  );
}

export default MultipleChoicesQuiz;
