import { useEffect, useState } from "react";

interface TypewriterProps {
  text: string;
  delay: number;
}

const Typewriter = ({ text, delay }: TypewriterProps) => {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prevText) => prevText + text[index]);
        setIndex((prevIndex) => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [index, delay, text]);

  return <span>{displayText}</span>;
};

export default Typewriter;
