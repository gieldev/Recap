
function Reviewers() {
  return (
    <>
      <main className="flex-1 flex flex-col h-screen px-16 py-16 gap-8 bg-contrast-bg">
        <header>
          <h1 className="text-2xl font-bold">Reviewers</h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="group flex flex-col p-2 gap-4 bg-neutral-bg border border-border rounded-md shadow cursor-pointer transition-transform duration-300 hover:scale-101">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium">Reviewer Type</span>
              <svg
                className="lucide lucide-ellipsis preview-icon w-5 h-5 text-transparent rounded-full transition-colors duration-300 group-hover:text-text-secondary"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
                <circle cx="5" cy="12" r="1" />
              </svg>
            </div>

            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-semibold">Topic/Title</h2>
              <p className="text-xs font-normal text-text-secondary">
                Date Created
              </p>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-text-secondary">
                No. of Questions
              </span>

              <button className="px-2 py-1 text-sm font-base text-transparent bg-transparent rounded-md cursor-pointer transition-colors group-hover:text-contrast-primary group-hover:bg-primary">Review</button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Reviewers;
