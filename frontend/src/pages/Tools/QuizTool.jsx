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

    
  }

  return (
    <>
      <main className="min-h-screen flex flex-col pt-24 gap-24">
        <section className="w-full h-fit flex flex-col px-8 py-6 gap-8">
          <form className="w-full flex flex-col gap-4 border" onSubmit={handleSubmit}>
            <input
              className="border"
              placeholder="Topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />

            <div className="w-full flex gap-2">
              <input
                className="min-w-0 border"
                placeholder="No. of items"
                value={numItems}
                onChange={(e) => setNumItems(e.target.value)}
              />
              <input
                className="min-w-0 border"
                placeholder="Quiz Type"
                value={quizType}
                onChange={(e) => setQuizType(e.target.value)}
              />
            </div>

            <div>
              
            </div>

            <input
              className="border"
              placeholder="Additional Instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            />

            <button className="border" type="submit">
              Submit
            </button>
          </form>
        </section>
      </main>
    </>
  );
}

export default QuizTool;
