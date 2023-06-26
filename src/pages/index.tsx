import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const Home = () => {
  const [advice, setAdvice] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const fetchAdvice = useCallback(() => {
    axios
      .get("https://api.adviceslip.com/advice")
      .then((response) => {
        const { advice } = response.data.slip;

        setAdvice(advice);
        setError(null); // clear any previous errors
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to fetch advice. Please try again."); // set the error state
      });
  }, []);

  useEffect(() => {
    fetchAdvice();
  }, [fetchAdvice]);

  return (
    <main>
      <div className="flex flex-col justify-between h-screen bg-gradient-to-r from-yellow-200 via-pink-200 to-pink-400">
        <h1 className="p-3 mb-2 text-lg text-center text-white bg-black">
          Motivation Quote Generator
        </h1>
        {error && <div>{error}</div>}
        <div className="">
          <div className="">
            <h1 className="text-4xl font-medium text-center">{advice}</h1>
          </div>
          <div className="flex items-center justify-center mt-5 animate-pulse">
            <button
              className="p-3 font-medium text-white rounded bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-yellow-500"
              onClick={fetchAdvice}
            >
              Load Another
            </button>
          </div>
        </div>
        <h5 className="flex-row py-2 text-center bg-purple-300 text-black-100">
          <span>
            Made With Love By <span className="animate-bounce">❤️--</span>
          </span>
          <a
            href="https://coverse.tech"
            className="bg-sky-300 underline rounded p-0.5 px-1"
            rel="noopener noreferrer" // add this for security and performance
          >
            Coverse
          </a>
          🌎
        </h5>
      </div>
    </main>
  );
};

export default Home;
