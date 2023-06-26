import TypeWriter from "@/components/TypeWriter";
import { useApiRequest, generateRandomColor } from "@/utils";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";

const Home = () => {
  const path = `https://api.adviceslip.com/advice`;

  const [fetchAdvice, { data, loading, error }] = useApiRequest<{
    slip: { id: string; advice: string };
  }>(path, `GET`);
  const [color, setColor] = useState<string>("");
  const [bgColor, setBgColor] = useState<string>("");

  const fetchAdviceWrapper = useCallback(() => {
    void fetchAdvice();
    const { backgroundColor, textColor } = generateRandomColor();

    setColor(textColor);
    setBgColor(backgroundColor);
  }, [fetchAdvice]);

  useEffect(() => {
    void fetchAdviceWrapper();
  }, [fetchAdviceWrapper]);

  return (
    <>
      <Head>
        <title>Quotin&apos; Genie</title>
      </Head>
      <main>
        <div
          className={`flex flex-col justify-between h-[100vh]`}
          style={{ backgroundColor: bgColor }}
        >
          {error && (
            <div
              className={`typed text-6xl font-medium text-left sm:text-8xl overline`}
              style={{ color: color }}
            >
              {error} !
            </div>
          )}
          <div className="pt-8 pl-8">
            {loading ? (
              <div className="flex space-x-4 animate-pulse">
                <div className="flex-1 py-1 space-y-4">
                  <div
                    className={`w-3/4 h-12 md:h-16 rounded`}
                    style={{ backgroundColor: color }}
                  ></div>
                  <div className="space-y-2">
                    <div
                      className={`h-12 md:h-16 rounded w-[90%]`}
                      style={{ backgroundColor: color }}
                    ></div>
                    <div
                      className={`w-5/6 h-12 md:h-16 rounded`}
                      style={{ backgroundColor: color }}
                    ></div>
                    <div
                      className={`h-12 md:h-16 rounded w-[90%]`}
                      style={{ backgroundColor: color }}
                    ></div>
                    <div
                      className={`w-5/6 h-12 md:h-16 rounded`}
                      style={{ backgroundColor: color }}
                    ></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="max-h-[500px] overflow-y-auto max-w-[90%]">
                <TypeWriter text={data?.slip?.advice || ""} color={color} />
              </div>
            )}
          </div>
          <div className="flex flex-row items-center justify-between px-3 py-2 whitespace-nowrap">
            <div style={{ color: color }}>Quotin&apos; Genie</div>
            <button
              onClick={fetchAdviceWrapper}
              className="px-2 py-2 mx-2 font-semibold uppercase bg-transparent border rounded"
              style={{ color: color, borderColor: color }}
            >
              Gimme a Quote
            </button>
            <div style={{ color: color }}>slip n*{data?.slip?.id}</div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
