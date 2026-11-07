import { Link } from "react-router-dom";

function Create() {
  return (
    <>
      <main className="flex-1 flex flex-col min-h-screen h-fit px-16 py-16 gap-8 bg-contrast-bg">
        <header>
          <h1 className="text-2xl font-bold">Create</h1>
        </header>

        <div className="w-full flex flex-col">
          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Quiz</h2>
            <div className="flex overflow-x-auto overflow-y-hidden">
              <Link
                className="w-60 flex px-4 py-6 gap-2 bg-neutral-bg border border-border rounded-md shadow cursor-pointer transition-transform duration-300 hover:scale-101"
                to={"/app/create/multiple-choices"}
              >
                <div className="flex flex-col gap-1">
                  <h3 className="text-md font-medium">Multiple Choices</h3>
                  <p className="text-sm font-base text-text-secondary">
                    Test your knowledge with questions that challenge you to
                    choose the correct answer from multiple options.
                  </p>
                </div>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default Create;
