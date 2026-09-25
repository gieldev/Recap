function UploadBox({ handleDrop, handleFile, fileInputRef }) {
  return (
    <>
      <div className="flex flex-col items-center text-center gap-3">
        <svg
          aria-labelledby="illustration-title illustration-description"
          className="w-[45vw] min-w-125 max-w-250 h-auto"
          role="img"
          viewBox="0 0 1100 700"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="illustration-title">
            Document transformed into a reviewer and quiz
          </title>

          <desc id="illustration-description">
            A handout document is transformed into key terminology, a quiz, and
            a summary.
          </desc>

          {/* DOCUMENT */}
          <g transform="translate(25 105)">
            <rect
              x="0"
              y="0"
              width="300"
              height="475"
              rx="20"
              fill="#FFFFFF"
              stroke="#E2E8F0"
              strokeWidth="2"
            />

            <rect x="25" y="25" width="62" height="30" rx="8" fill="#EEF2FF" />

            <text
              x="56"
              y="46"
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill="#6366F1"
              fontFamily="Inter, sans-serif"
            >
              PDF
            </text>

            <text
              x="25"
              y="100"
              fontSize="23"
              fontWeight="700"
              fill="#111827"
              fontFamily="Inter, sans-serif"
            >
              Cell Biology
            </text>

            <text
              x="25"
              y="128"
              fontSize="16"
              fill="#64748B"
              fontFamily="Inter, sans-serif"
            >
              Chapter 4
            </text>

            <rect
              x="25"
              y="160"
              width="250"
              height="10"
              rx="5"
              fill="#E2E8F0"
            />

            <rect
              x="25"
              y="182"
              width="220"
              height="10"
              rx="5"
              fill="#E2E8F0"
            />

            <rect
              x="25"
              y="204"
              width="240"
              height="10"
              rx="5"
              fill="#E2E8F0"
            />

            <rect
              x="20"
              y="240"
              width="260"
              height="48"
              rx="9"
              fill="#EEF2FF"
            />

            <text
              x="34"
              y="270"
              fontSize="15"
              fontWeight="700"
              fill="#4F46E5"
              fontFamily="Inter, sans-serif"
            >
              MITOCHONDRIA
            </text>

            <rect
              x="25"
              y="310"
              width="245"
              height="10"
              rx="5"
              fill="#E2E8F0"
            />

            <rect
              x="25"
              y="332"
              width="205"
              height="10"
              rx="5"
              fill="#E2E8F0"
            />

            <rect
              x="20"
              y="370"
              width="260"
              height="48"
              rx="9"
              fill="#EEF2FF"
            />

            <text
              x="34"
              y="400"
              fontSize="15"
              fontWeight="700"
              fill="#4F46E5"
              fontFamily="Inter, sans-serif"
            >
              ATP
            </text>

            <rect
              x="25"
              y="440"
              width="230"
              height="10"
              rx="5"
              fill="#E2E8F0"
            />
          </g>

          {/* CONNECTION LINES */}
          <path
            d="M345 300 C390 300 395 230 450 210"
            fill="none"
            stroke="#C7D2FE"
            strokeWidth="8"
            strokeLinecap="round"
          />

          <path
            d="M345 380 C400 380 420 430 475 470"
            fill="none"
            stroke="#C7D2FE"
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* ORGANIZE */}
          <circle cx="420" cy="315" r="55" fill="#6366F1" />

          <text
            x="420"
            y="310"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="#FFFFFF"
            fontFamily="Inter, sans-serif"
          >
            ORGANIZE
          </text>

          <text
            x="420"
            y="329"
            textAnchor="middle"
            fontSize="11"
            fill="#E0E7FF"
            fontFamily="Inter, sans-serif"
          >
            NOTES
          </text>

          {/* TERMINOLOGY */}
          <g transform="translate(485 30)">
            <rect
              x="0"
              y="0"
              width="585"
              height="275"
              rx="22"
              fill="#FFFFFF"
              stroke="#E2E8F0"
              strokeWidth="2"
            />

            <text
              x="30"
              y="50"
              fontSize="23"
              fontWeight="700"
              fill="#111827"
              fontFamily="Inter, sans-serif"
            >
              Key terminology
            </text>

            <text
              x="30"
              y="77"
              fontSize="14"
              fill="#64748B"
              fontFamily="Inter, sans-serif"
            >
              Important concepts from your handout
            </text>

            <rect
              x="30"
              y="105"
              width="525"
              height="44"
              rx="10"
              fill="#F8FAFC"
            />

            <circle cx="53" cy="127" r="7" fill="#6366F1" />

            <text
              x="73"
              y="132"
              fontSize="14"
              fontWeight="600"
              fill="#334155"
              fontFamily="Inter, sans-serif"
            >
              Mitochondria — produces cellular energy
            </text>

            <rect
              x="30"
              y="159"
              width="525"
              height="44"
              rx="10"
              fill="#F8FAFC"
            />

            <circle cx="53" cy="181" r="7" fill="#6366F1" />

            <text
              x="73"
              y="186"
              fontSize="14"
              fontWeight="600"
              fill="#334155"
              fontFamily="Inter, sans-serif"
            >
              ATP — primary energy currency of cells
            </text>

            <rect
              x="30"
              y="213"
              width="525"
              height="44"
              rx="10"
              fill="#F8FAFC"
            />

            <circle cx="53" cy="235" r="7" fill="#6366F1" />

            <text
              x="73"
              y="240"
              fontSize="14"
              fontWeight="600"
              fill="#334155"
              fontFamily="Inter, sans-serif"
            >
              Cellular respiration — releases energy
            </text>
          </g>

          {/* QUIZ */}
          <g transform="translate(555 330)">
            <rect
              x="0"
              y="0"
              width="515"
              height="340"
              rx="22"
              fill="#FFFFFF"
              stroke="#E2E8F0"
              strokeWidth="2"
            />

            <text
              x="30"
              y="45"
              fontSize="14"
              fontWeight="700"
              fill="#6366F1"
              fontFamily="Inter, sans-serif"
            >
              QUIZ
            </text>

            <text
              x="30"
              y="80"
              fontSize="21"
              fontWeight="700"
              fill="#111827"
              fontFamily="Inter, sans-serif"
            >
              Which organelle produces
            </text>

            <text
              x="30"
              y="108"
              fontSize="21"
              fontWeight="700"
              fill="#111827"
              fontFamily="Inter, sans-serif"
            >
              most cellular energy?
            </text>

            <rect
              x="30"
              y="135"
              width="455"
              height="40"
              rx="10"
              fill="#F8FAFC"
            />

            <text
              x="50"
              y="161"
              fontSize="14"
              fontWeight="700"
              fill="#64748B"
              fontFamily="Inter, sans-serif"
            >
              A
            </text>

            <text
              x="80"
              y="161"
              fontSize="14"
              fill="#334155"
              fontFamily="Inter, sans-serif"
            >
              Nucleus
            </text>

            <rect
              x="30"
              y="185"
              width="455"
              height="40"
              rx="10"
              fill="#EEF2FF"
              stroke="#6366F1"
              strokeWidth="2"
            />

            <text
              x="50"
              y="211"
              fontSize="14"
              fontWeight="700"
              fill="#6366F1"
              fontFamily="Inter, sans-serif"
            >
              B
            </text>

            <text
              x="80"
              y="211"
              fontSize="14"
              fontWeight="600"
              fill="#4338CA"
              fontFamily="Inter, sans-serif"
            >
              Mitochondria
            </text>

            <circle cx="462" cy="205" r="9" fill="#6366F1" />

            <path
              d="M458 205 L461 208 L467 201"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <rect
              x="30"
              y="235"
              width="455"
              height="40"
              rx="10"
              fill="#F8FAFC"
            />

            <text
              x="50"
              y="261"
              fontSize="14"
              fontWeight="700"
              fill="#64748B"
              fontFamily="Inter, sans-serif"
            >
              C
            </text>

            <text
              x="80"
              y="261"
              fontSize="14"
              fill="#334155"
              fontFamily="Inter, sans-serif"
            >
              Ribosome
            </text>

            <rect
              x="30"
              y="285"
              width="455"
              height="40"
              rx="10"
              fill="#F8FAFC"
            />

            <text
              x="50"
              y="311"
              fontSize="14"
              fontWeight="700"
              fill="#64748B"
              fontFamily="Inter, sans-serif"
            >
              D
            </text>

            <text
              x="80"
              y="311"
              fontSize="14"
              fill="#334155"
              fontFamily="Inter, sans-serif"
            >
              Cell membrane
            </text>
          </g>

          {/* SUMMARY */}
          <g transform="translate(405 510)">
            <rect x="0" y="0" width="250" height="160" rx="20" fill="#111827" />

            <text
              x="24"
              y="38"
              fontSize="15"
              fontWeight="700"
              fill="#FFFFFF"
              fontFamily="Inter, sans-serif"
            >
              Quick summary
            </text>

            <circle cx="28" cy="68" r="4" fill="#818CF8" />

            <text
              x="42"
              y="73"
              fontSize="12"
              fill="#E2E8F0"
              fontFamily="Inter, sans-serif"
            >
              Mitochondria make ATP
            </text>

            <circle cx="28" cy="100" r="4" fill="#818CF8" />

            <text
              x="42"
              y="105"
              fontSize="12"
              fill="#E2E8F0"
              fontFamily="Inter, sans-serif"
            >
              ATP powers cellular work
            </text>

            <circle cx="28" cy="132" r="4" fill="#818CF8" />

            <text
              x="42"
              y="137"
              fontSize="12"
              fill="#E2E8F0"
              fontFamily="Inter, sans-serif"
            >
              Cells need constant energy
            </text>
          </g>
        </svg>
        <h1 className="text-3xl font-bold text-primary">
          Turn your pdf into a reviewer
        </h1>
        <p className="text-xl text-body">Customizable and Interactive</p>
      </div>
      <div
        className="w-105 h-65 flex flex-col items-center justify-center gap-5 border-2 border-dashed border-border rounded-2xl bg-surface transition hover:border-primary/50"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {" "}
        <div className="flex flex-col items-center gap-2">
          {" "}
          <p className="text-lg font-medium text-primary">
            {" "}
            Upload your PDF{" "}
          </p>{" "}
          <p className="text-sm text-secondary">
            {" "}
            Drag and drop your file here{" "}
          </p>{" "}
        </div>{" "}
        <button
          className="px-5 py-2.5 rounded-lg bg-primary text-white font-medium cursor-pointer transition hover:bg-primary-dark"
          onClick={() => fileInputRef.current.click()}
        >
          {" "}
          Choose PDF file{" "}
        </button>{" "}
        <p className="text-sm text-secondary"> or drop a PDF file </p>{" "}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          hidden
          onChange={(e) => handleFile(e.target.files[0])}
        />{" "}
      </div>
    </>
  );
}

export default UploadBox;
