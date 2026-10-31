import { Link } from "react-router-dom";

function Home() {

  return (
    <>
      <main className="min-h-screen flex flex-col pt-24 gap-24">
        {/* List of learning tools */}
        <section className="w-full h-fit flex flex-col px-8 py-6 gap-8">
          <div className="flex items-center justify-between px-4 py-2 gap-2 border-2 border-dashed rounded-xl">
            <h2 className="text-md">
              Start making your <br /> reviewers
            </h2>
            <Link
              className="w-fit px-4 py-2 text-sm text-contrast-primary bg-primary rounded-xl"
              to={"/tools"}
            >
              See Tools
            </Link>
          </div>

          <div>
            <h2 className="text-xl font-bold">Recent Reviewers</h2>
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;
