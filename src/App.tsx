import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Routes from "./routes";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes />
    </QueryClientProvider>
  );
}

export default App;
