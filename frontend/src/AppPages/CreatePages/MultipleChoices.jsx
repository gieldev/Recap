import { useState, useRef, useEffect } from "react";
import { pdfjs } from "react-pdf";
import { Link, useNavigate } from "react-router-dom";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

function MultipleChoices() {
  // State variables for reviewer data
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [numItems, setNumItems] = useState("");
  const [quizType, setQuizType] = useState("");
  const [reference, setReference] = useState("");
  const [instructions, setInstructions] = useState("");

  // State variables for handling files
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState([]);

  const navigation = useNavigate();

  const handleFile = async (e) => {
    for (let i = 0; i < e.target.files.length ; i++) {
      const file = e.target.files[i];

      if (file) {
        setSelectedFile((prev) => [...prev, file]);
      }

      const buffer = await file.arrayBuffer();

      const pdf = await pdfjs.getDocument({
        data: buffer,
      }).promise;

      let text = "";

      for (let j = 1; j <= pdf.numPages; j++) {
        const page = await pdf.getPage(j);
        const content = await page.getTextContent();

        const pageText = content.items.map((item) => item.str).join(" ");

        text += pageText + "\n";
      }

      setReference((prev) => prev + text);
    }
  };

  useEffect(() => {
    console.log(reference);
  }, [reference]);

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
        `${import.meta.env.VITE_API_URL}api/ai/create/quiz/${quizType}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            topic,
            description,
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

      navigation(`/app/reviewer/multiple-choices/${quiz.quizId}`, {
        replace: true,
      });
    } catch (error) {
      console.error(error);
      return alert("Failed to generate quiz.");
    }
  };

  return (
    <>
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
          {/* Topic */}
          <div className="w-full flex flex-col gap-1">
            <label className="text-sm font-semibold">Topic</label>
            <input
              className="px-4 py-3 border border-border rounded-md"
              placeholder="Photosynthesis"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          {/* Description */}
          <div className="w-full flex flex-col gap-1">
            <label className="text-sm font-semibold">Description</label>
            <textarea
              className="w-full min-h-16 px-4 py-3 border border-border rounded-md resize-none"
              placeholder="My reviewer for exam"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* No. of items and Quiz Type */}
          <div className="w-full flex gap-2">
            <div className="min-w-0 w-24 flex flex-col gap-1">
              <label className="text-sm font-semibold">No. of items</label>
              <input
                className="min-w-0 px-4 py-3 border border-border rounded-md"
                placeholder="e.g. 15"
                value={numItems}
                onChange={(e) => setNumItems(e.target.value)}
              />
            </div>
            <div className="min-w-0 flex flex-1 flex-col gap-1">
              <label className="text-sm font-semibold">Quiz Type</label>
              <select
                className="min-w-0 px-4 py-3 border border-border rounded-md"
                value={quizType}
                onChange={(e) => setQuizType(e.target.value)}
              >
                <option value="">Select Quiz Type</option>
                <option value="multiple-choices">Multiple Choices</option>
                <option value="true-false">True/False</option>
                <option value="short-answer">Short Answer</option>
              </select>
            </div>
          </div>

          {/* File handling */}
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
              multiple
              ref={fileInputRef}
              onChange={handleFile}
              hidden
            />
            <button
              className="px-4 py-1 text-sm text-text-secondary border rounded-md cursor-pointer"
              type="button"
            >
              Upload
            </button>
          </div>

          <div>
            {selectedFile.map((file, index) => (
              <div key={index}>{file.name}</div>
            ))}
          </div>

          {/* Additional Instructions */}
          <div className="w-full flex flex-col gap-1">
            <label className="text-sm font-semibold">
              Additional Instructions
            </label>
            <textarea
              className="w-full min-h-32 px-4 py-3 border border-border rounded-md resize-none"
              placeholder="Mix the quiz with scenario-based questions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            />
          </div>

          {/* Submit */}
          <button
            className="px-4 py-2 text-contrast-primary font-semibold bg-primary rounded-md cursor-pointer"
            type="submit"
          >
            Generate Quiz
          </button>
        </form>
      </div>
    </>
  );
}

export default MultipleChoices;
