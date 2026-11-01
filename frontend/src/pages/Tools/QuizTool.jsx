import { useState } from "react";

function QuizTool() {
  // State variables for file input, selected file, number of pages, and extracted reference text
  const [topic, setTopic] = useState("");
  const [numItems, setNumItems] = useState("");
  const [quizType, setQuizType] = useState("");
  const [reference, setReference] = useState("");
  const [instructions, setInstructions] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <main className="min-h-screen flex flex-col pt-24 gap-24">
        <section className="w-full h-fit flex flex-col px-8 py-6 gap-8">
          <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="w-full flex flex-col gap-1">
              <label className="text-sm font-semibold">Topic</label>
              <input
                className="px-4 py-2 border border-border rounded-xl"
                placeholder="Photosynthesis"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            <div className="w-full flex gap-2">
              <div className="min-w-0 w-24 flex flex-col gap-1">
                <label className="text-sm font-semibold">No. of items</label>
                <input
                  className="min-w-0 px-4 py-2 border border-border rounded-xl"
                  placeholder="e.g. 15"
                  value={numItems}
                  onChange={(e) => setNumItems(e.target.value)}
                />
              </div>
              <div className="min-w-0 flex flex-1 flex-col gap-1">
                <label className="text-sm font-semibold">Quiz Type</label>
                <select
                  className="min-w-0 px-4 py-2 border border-border rounded-xl"
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

            <div className="w-full flex px-4 py-2 border-2 rounded-xl">
              <div className="w-full flex items-center gap-2">
                <div className="w-8 h-10 bg-gray-300"></div>
                <h2 className="text-sm font-semibold">Upload a file</h2>
              </div>
              <button className="px-4 py-2 text-neutral-bg bg-accent border rounded-xl">
                Upload
              </button>
            </div>

            <div className="w-full flex flex-col gap-1">
              <label className="text-sm font-semibold">
                Additional Instructions
              </label>
              <textarea
                className="w-full min-h-32 px-4 py-2 border border-border rounded-xl resize-none"
                placeholder="Mix the quiz with scenario-based questions"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
              />
            </div>

            <button className="px-4 py-2 text-contrast-primary bg-primary rounded-xl" type="submit">
              Submit
            </button>
          </form>
        </section>
      </main>
    </>
  );
}

export default QuizTool;
