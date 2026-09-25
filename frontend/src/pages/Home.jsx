import { useRef, useState } from "react";
import { pdfjs } from "react-pdf";

import UploadBox from "../components/UploadBox";
import ContentBox from "../components/ContentBox";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

function Home() {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [reference, setReference] = useState("");

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

      console.log("Extracted text:", text);

      await fetch("http://localhost:3000/api/ai/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reference: text }),
      });
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <>
      <main>
        <section className="min-h-screen flex flex-col items-center justify-center gap-6 border">
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
        </section>
      </main>
    </>
  );
}

export default Home;
