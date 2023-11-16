import { QueryClient, QueryClientProvider } from "react-query";
import QuoteCard from "./components/QuoteCard";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-screen h-screen bg-Dark-Blue flex items-center justify-center">
        <QuoteCard />
      </div>
    </QueryClientProvider>
  );
}

export default App;
