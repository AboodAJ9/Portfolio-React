import { useState, useEffect } from 'react';

const TypewriterEffect = ({ text, speed }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setDisplayedText('');
    setIndex(0);
  }, [text]);
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text[index]);
        setIndex(index + 1);
      } else {
        clearInterval(intervalId);
      }
    }, speed); // speed: z.B. alle 100ms einen funktionsaufruf

    return () => clearInterval(intervalId);
  }, [text, speed, index]);

  return <span>{displayedText}</span>;
};

export default TypewriterEffect