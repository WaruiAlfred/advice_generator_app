import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <p className="text-3xl text-center text-red-400">Advice Generator</p>
    </QueryClientProvider>
  );
}

export default App;
