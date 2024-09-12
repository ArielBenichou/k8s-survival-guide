import { Outlet } from "react-router-dom";
import HomePage from "./home.page";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { crashServer } from "../services/api";

export default function RootLayout() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: crashServer,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries();
    },
  })
  const isHomePage = window.location.pathname === "/";

  const killServer = async () => {
    mutation.mutate();
  }

  return (
    <div className="h-screnn w-screnn flex flex-col justify-start">
      {/* NAVIGATION */}
      <div className="flex justify-between p-4 bg-gray-100 items-center">
        <a href="/" className="font-bold text-xl">Petworx 👾</a>
        <nav className="flex items-center gap-2 text-sm">
          <a className="p-2 rounded bg-black hover:bg-gray-900 text-white font-semibold" href="/create">Submit</a>
          <button
            onClick={killServer}
            disabled={mutation.isPending}
            className={"p-2 rounded text-white min-w-16 text-center " + (mutation.isPending ? "bg-red-200" : "bg-red-500 hover:bg-red-600")}
          >
            {mutation.isPending ? "Killing" : "Kill"}
          </button>
        </nav>
      </div>
      <div>
        {isHomePage ?
          <HomePage /> :
          <Outlet />}
      </div>
    </div>
  );
}
