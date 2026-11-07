import { useState, useRef } from "react";
import { pdfjs } from "react-pdf";
import { Link, useNavigate } from "react-router-dom";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

function MultipleChoices() {
  // State variables for file input, selected file, number of pages, and extracted reference text
  const [topic, setTopic] = useState("");
  const [numItems, setNumItems] = useState("");
  const [quizType, setQuizType] = useState("");
  const [reference, setReference] = useState("");
  const [instructions, setInstructions] = useState("");

  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const navigation = useNavigate();

  const handleFile = async (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedFile(file);
    }

    const buffer = await file.arrayBuffer();

    const pdf = await pdfjs.getDocument({
      data: buffer,
    }).promise;

    let text = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();

      const pageText = content.items.map((item) => item.str).join(" ");

      text += pageText + "\n";
    }

    setReference(text);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!topic) {
      return alert("Please enter a topic.");
    }

    if (!numItems) {
      return alert("Please enter the number of items.");
    }

    if (!quizType) {
      return alert("Please select a quiz type.");
    }

    if (!reference) {
      return alert("Please upload a PDF file.");
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3000/api/ai/create/quiz/${quizType}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            topic,
            numItems,
            quizType,
            learningMaterial: reference,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to generate quiz.");
      }

      const quiz = await response.json();

      console.log("Generated Quiz:", quiz);
      alert("Quiz generated successfully! Check the console for details.");

      navigation(`/quiz/${quiz.quizId}`, { replace: true });
    } catch (error) {
      console.error(error);
      return alert("Failed to generate quiz.");
    }
  };

  return (
    <>
      <main className="flex-1 flex flex-col min-h-screen h-fit px-16 py-16 gap-8 bg-contrast-bg">
        <header className="flex items-center gap-4">
          <Link to={"/app/create"}>
            <svg
              className="lucide lucide-layout-dashboard preview-icon flex items-center justify-center rounded-md cursor-pointer transition-colors duration-300 hover:bg-highlight"
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
              <path d="m15 18-6-6 6-6" />
            </svg>
          </Link>
          <h2 className="text-2xl font-bold">Multiple Choices</h2>
        </header>

        <div
          className="w-full h-fit flex flex-col px-8 py-12 gap-8 bg-neutral-bg rounded-2xl border border-border shadow
          lg:px-24 lg:gap-16"
        >
          <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="w-full flex flex-col gap-1">
              <label className="text-sm font-semibold">Topic</label>
              <input
                className="px-4 py-3 border border-border rounded-md"
                placeholder="Photosynthesis"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            <div className="w-full flex gap-2">
              <div className="min-w-0 w-24 flex flex-col gap-1">
                <label className="text-sm font-semibold">No. of items</label>
                <input
                  className="min-w-0 px-4 py-2 border border-border rounded-md"
                  placeholder="e.g. 15"
                  value={numItems}
                  onChange={(e) => setNumItems(e.target.value)}
                />
              </div>
              <div className="min-w-0 flex flex-1 flex-col gap-1">
                <label className="text-sm font-semibold">Quiz Type</label>
                <select
                  className="min-w-0 px-4 py-2 border border-border rounded-md"
                  value={quizType}
                  onChange={(e) => setQuizType(e.target.value)}
                >
                  <option value="">Select Quiz Type</option>
                  <option value="multiple-choice">Multiple Choice</option>
                  <option value="true-false">True/False</option>
                  <option value="short-answer">Short Answer</option>
                </select>
              </div>
            </div>

            <div
              className="w-full flex px-4 py-2 border border-dashed border-border rounded-md cursor-pointer transition-colors duration-300 hover:bg-highlight"
              onClick={() => fileInputRef.current.click()}
            >
              <div className="w-full flex items-center gap-2">
                <div className="w-8 h-10 bg-gray-300"></div>
                <h2 className="text-sm font-semibold">Upload a file</h2>
              </div>
              <input
                type="file"
                accept=".pdf"
                ref={fileInputRef}
                onChange={handleFile}
                hidden
              />
              <button
                className="px-4 py-2 text-sm text-text-secondary border rounded-md cursor-pointer"
                type="button"
              >
                Upload
              </button>
            </div>

            <div className="w-full flex flex-col gap-1">
              <label className="text-sm font-semibold">
                Additional Instructions
              </label>
              <textarea
                className="w-full min-h-32 px-4 py-2 border border-border rounded-md resize-none"
                placeholder="Mix the quiz with scenario-based questions"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
              />
            </div>

            <button
              className="px-4 py-2 text-contrast-primary font-semibold bg-primary rounded-md cursor-pointer"
              type="submit"
            >
              Generate Quiz
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

export default MultipleChoices;
