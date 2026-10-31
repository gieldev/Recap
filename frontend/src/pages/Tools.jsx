import { Link } from "react-router-dom";

function Tools() {
  return (
    <>
      <main className="min-h-screen flex flex-col pt-24 gap-24">
        <section className="w-full h-fit flex flex-col px-8 py-6 gap-8">
          <h2 className="text-2xl font-bold">Choose a tool</h2>
          <div className="w-full grid grid-cols-1 px-2 py-2 gap-4 bg-contrast-bg border border-border rounded-xl">
            {/* Button */}
            <Link className="flex flex-col px-4 py-6 gap-4 bg-neutral-bg rounded-xl cursor-pointer" to={"/tools/quiz-tool"}>
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 bg-gray-300"></div>
                <svg
                  className="w-5 h-5 fill-text-secondary"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="#000000"
                  viewBox="0 0 256 256"
                >
                  <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
                </svg>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-semibold">Quiz</h2>
                <p className="text-md text-text-secondary">
                  Turn your file into an answerable quiz
                </p>
              </div>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

export default Tools;
