import { Outlet, Navigate } from "react-router-dom";

function Auth() {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to={"/app/dashboard"} replace />
  }

  return (
    <>
      <main className="h-screen flex">
        <div className="w-132 flex flex-col p-16 gap-8">
          <h1 className="text-2xl font-bold">RecallIt.</h1>
          <Outlet />
        </div>
        <div className="flex-1 bg-gray-300"></div>
      </main>
    </>
  );
}

export default Auth;
