import React, { useState, useEffect, useRef } from "react";

type TypeWriterType = {
  text: string;
  color: string;
};

// TODO: Maybe later on add scroll down while typing in TypeWriter when needed.
// TODO: Add Styling for scrolling bar
// TODO: Remove horizontal scrollbar
// FIXME: fix issue related to TypeWriter omitting the first or second character
const TypeWriter = ({ text, color }: TypeWriterType) => {
  const [displayedText, setDisplayedText] = useState("");
  const speed = 50;
  const iRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    iRef.current = 0; // Reset the reference value
    setDisplayedText(""); // Reset the displayed text

    const typeWriter = () => {
      if (iRef.current < text.length) {
        setDisplayedText((prevText) => prevText + text.charAt(iRef.current));
        iRef.current += 1;
        timeoutRef.current = setTimeout(typeWriter, speed);
      }
    };

    typeWriter();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, color]); // Include color in the dependency array

  return (
    <h1
      className={`typed text-6xl font-medium text-left sm:text-8xl`}
      style={{ color: color }}
      id="text"
    >
      {displayedText}
    </h1>
  );
};

export default TypeWriter;
