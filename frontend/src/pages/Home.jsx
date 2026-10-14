import { useRef, useState } from "react";
import { pdfjs } from "react-pdf";

import UploadBox from "../components/UploadBox";
import ContentBox from "../components/ContentBox";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

function Home() {
  // State variables for styling
  const [signingIn, setSigningIn] = useState(false);

  // State variables for file input, selected file, number of pages, and extracted reference text
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [reference, setReference] = useState("");

  // State variables for email and password input fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const handleSignIn = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    console.log("Signed in: ", data);
  };

  return (
    <>
      <header className="flex items-center justify-between px-8 py-6">
        <a>Recap</a>
        <nav>
          <button className="cursor-pointer" onClick={() => setSigningIn(true)}>
            Sign In
          </button>
        </nav>
      </header>
      <main className="flex items-center justify-center px-8">
        <section className="w-full min-h-screen flex flex-col items-center justify-center p-6 gap-12 md:flex-row">
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

        <div
          className={`fixed bottom-0 left-0 w-full h-full flex items-center justify-center bg-black/50 ${signingIn ? "block" : "hidden"}`}
        >
          <div className="flex flex-col items-center justify-center px-8 py-6 bg-white">
            <h1>Sign In</h1>
            <button className="cursor-pointer" onClick={() => setSigningIn(false)}>X</button>
            <form className="flex flex-col gap-4" onSubmit={handleSignIn}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="border cursor-pointer" type="submit">Sign In</button>
              <p>
                No account? <a className="cursor-pointer">Create one!</a>
              </p>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
