import Sidebar from "../AppComponents/Sidebar";

function Dashboard({ sidebarOpen }) {

  return (
    <>
      <main
        className={`flex-1 flex flex-col min-h-screen h-fit px-16 py-16 gap-8 bg-contrast-bg transition-all duration-300 ${sidebarOpen ? "ml-0" : "lg:ml-72"}`}
      >
        <header>
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </header>

        <div className="flex-1 flex items-center justify-center">
          <p className="text-center text-lg">
            Dashboard is currently unavailable
          </p>
        </div>
      </main>
    </>
  );
}

export default Dashboard;
