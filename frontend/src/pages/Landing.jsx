import { useRef, useState } from "react";
import { pdfjs } from "react-pdf";

import UploadBox from "../components/UploadBox";
import ContentBox from "../components/ContentBox";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

function Landing() {
  // State variables for file input, selected file, number of pages, and extracted reference text
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [reference, setReference] = useState("");

  // Function to extract text from a PDF file
  const extractText = async (file) => {
    const arrayBuffer = await file.arrayBuffer();

    const pdf = await pdfjs.getDocument({
      data: arrayBuffer,
    }).promise;

    let text = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();

      const pageText = content.items.map((item) => item.str).join(" ");

      text += pageText + "\n";
    }

    return text;
  };

  const handleFile = async (selectedFile) => {
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);

      const text = await extractText(selectedFile);

      setReference(text);

      const res = await fetch("http://localhost:3000/api/ai/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reference: text }),
      });

      const data = await res.json();

      console.log("Server response:", data);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  const featured = [
    {
      material: "Quiz",
      title: "Noli me tangere",
      description: "A quiz containing questions about Noli me tangere.",
    },
    {
      material: "Flashcards",
      title: "Noise and Distortion",
      description: "A set of flashcards about noise and distortion.",
    },
    {
      material: "Notes",
      title: "The Great Gatsby",
      description: "A set of notes about The Great Gatsby.",
    },
  ];

  return (
    <>
      <main className="min-h-screen flex flex-col pt-24 gap-24">
        {/* <section className="w-full min-h-screen flex flex-col items-center justify-center p-6 gap-12 md:flex-row">
          {!file ? (
            <UploadBox
              handleDrop={handleDrop}
              handleFile={handleFile}
              fileInputRef={fileInputRef}
            />
          ) : (
            <ContentBox
              file={file}
              numPages={numPages}
              setNumPages={setNumPages}
              reference={reference}
            />
          )}
        </section> */}
        {/*  Hero Section */}
        <section
          className="w-full h-fit flex flex-col items-center justify-center px-8 py-6 gap-8
          lg:flex-row lg:px-24 lg:gap-16"
        >
          <div className="flex flex-col items-center gap-4 lg:items-start">
            <h1
              className="text-center text-4xl font-bold
              lg:text-start lg:text-7xl"
            >
              A quick start to{" "}
              <span className="text-primary">
                <br />
                reviewing
              </span>
              .
            </h1>
            <p className="text-center text-base text-text-secondary lg:text-start">
              Make reviewing easier with a variety of study materials.
            </p>
            <button
              className="w-fit h-fit flex items-center gap-4 px-4 py-2 mt-4 text-lg text-contrast-primary bg-primary border rounded-xl cursor-pointer
              "
            >
              Explore materials
              <svg
                className="w-7 h-7 fill-neutral-bg"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#000000"
                viewBox="0 0 256 256"
              >
                <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
              </svg>
            </button>
          </div>
          <div className="w-full h-120 bg-gray-300"></div>
        </section>

        {/* Main Content Section */}
        <section className="w-full h-fit flex flex-col px-8 py-6 gap-8 bg-contrast-bg ">
          {/* Featured Reviewers Sub-section */}
          <div className="flex flex-col items-center py-16 gap-12 lg:gap-16">
            <header className="flex flex-col items-center gap-2">
              <h1 className="text-center text-3xl font-bold lg:text-4xl">
                Featured Reviewers
              </h1>
              <p className="text-center text-sm text-text-secondary lg:text-base">
                Explore reviewers made using our offered learning materials.
              </p>
            </header>
            <div className="w-full h-fit flex flex-col items-stretch py-4 gap-4 lg:flex-row">
              {/* Cards */}
              {featured.map((item, index) => (
                <div
                  className="w-full flex flex-1 flex-col items-center px-4 py-8 bg-white rounded-xl transition-transform ease-in hover:scale-101 hover:shadow-lg
                  lg:px-8"
                  key={index}
                >
                  <header className="w-full flex">
                    <h2 className="flex items-center gap-6 text-lg font-medium">
                      <span className="text-sm font-light text-text-secondary">
                        0{index + 1}
                      </span>
                      {item.material}
                    </h2>
                  </header>
                  <div className="w-full flex flex-1 flex-col gap-4 mt-14 lg:mt-24">
                    <h2 className="text-xl font-bold">{item.title}</h2>
                    <p className="text-md text-text-secondary">
                      {item.description}
                    </p>

                    <button className="px-6 py-2 mt-auto text-md text-contrast-primary bg-primary rounded-xl cursor-pointer">
                      See more
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer CTA Section */}
        <section className="w-full h-fit flex flex-col px-8 py-6 gap-8">
          <div
            className="w-full h-72.5 flex flex-col items-center justify-center px-4 py-6 gap-8 bg-primary rounded-xl
            lg:flex-row lg:justify-between lg:px-8"
          >
            <h1 className="text-center text-4xl text-contrast-primary font-bold lg:text-start">
              Let's build reviewers <br /> and start learning
            </h1>
            <button className="px-6 py-2 text-text-primary font-bold bg-surface-bg rounded-xl cursor-pointer">
              Start building
            </button>
          </div>
        </section>
      </main>
    </>
  );
}

export default Landing;
