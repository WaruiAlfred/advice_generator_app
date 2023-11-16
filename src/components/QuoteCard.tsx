import { FC } from "react";
import { Dice5, Tally2 } from "lucide-react";
import { useQuery, useQueryClient } from "react-query";

// Function that fetches a random advice from the API and returns a promise
const getRandomAdvice = async () => {
  const response = await fetch("https://api.adviceslip.com/advice");
  const data = await response.json();
  return data;
};

interface QuoteCardProps {}

const QuoteCard: FC<QuoteCardProps> = () => {
  // useQuery hook that takes in a key and a function that returns a promise and returns an object with data, isError and isLoading
  const { data, isError, isLoading } = useQuery("advice", getRandomAdvice);
  // useQueryClient hook that returns an object with invalidateQueries function
  const queryClient = useQueryClient();

  return (
    <div className=" relative rounded-lg shadow-md bg-Dark-Grayish-Blue  h-auto w-auto px-10 py-8 flex flex-col items-center gap-3">
      {isLoading && <p className="text-white text-center">Loading...</p>}
      {isError && <p className="text-white text-center">Error</p>}
      {data && (
        <>
          <p className="text-sm text-Neon-Green">
            ADVICE <span className="mx-2" />#{data?.slip?.id}
          </p>
          <p className="text-[800] text-white">“{data?.slip?.advice}”</p>
          <div className="w-full flex text-Grayish-Blue items-center justify-center gap-2 my-6">
            <hr className="w-full" />
            <Tally2 size={60} color="#fff" />
            <hr className="w-full" />
          </div>
          <button
            onClick={() => queryClient.invalidateQueries("advice")}
            className="absolute -bottom-4 text-Dark-Blue left-25 rounded-full bg-Light-Cyan p-3 flex items-center justify-center hover:bg-Neon-Green"
          >
            <Dice5 />
          </button>
        </>
      )}
    </div>
  );
};

export default QuoteCard;
