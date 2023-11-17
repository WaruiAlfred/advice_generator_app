import { Dice5 } from "lucide-react";
import { FC } from "react";
import { useQuery, useQueryClient } from "react-query";
import PauseBar from "../assets/pause-bars.svg";

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
    <div className=" relative rounded-lg shadow-md bg-Dark-Grayish-Blue max-w-sm my-8 min-w-min h-auto w-4/5 px-10 py-8 flex flex-col items-center gap-3 hover:shadow-lg">
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
            <img src={PauseBar} alt="pause bar" className="w-5 h-5 " />
            <hr className="w-full" />
          </div>
          <button
            onClick={() => queryClient.invalidateQueries("advice")}
            className="absolute -bottom-4 text-Dark-Blue left-25 rounded-full p-3 flex items-center justify-center bg-Neon-Green hover:drop-shadow-2xl hover:scale-110"
          >
            <Dice5 />
          </button>
        </>
      )}
    </div>
  );
};

export default QuoteCard;
