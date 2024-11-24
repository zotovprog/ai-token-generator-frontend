import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import IndexPage from "@/pages/index";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<IndexPage />} path="/" />
      </Routes>
      <Toaster
        toastOptions={{
          duration: 5000,
        }}
        position={"bottom-right"}
      />
    </QueryClientProvider>
  );
}

export default App;
