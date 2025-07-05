import { useState, useEffect } from 'react';

const TypewriterEffect = ({ text, speed, activeSection }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  /*Wenn die activeSection-Prop geändert wird, wird die Header-Komponente neu gerendert,
   aber die TypewriterEffect-Komponente nicht. Das könnte dazu führen, dass der Text
    nicht korrekt aktualisiert wird und der erste Buchstabe verdoppelt wird.
    --> TypeWriterEffect soll neu gerendert wird, wenn die activeSection-Prop geändert wird
    */ 

  useEffect(() => {
    setDisplayedText('');
    setIndex(0);
  }, [text]);  

  useEffect (() => {
    setDisplayedText(displayedText);
  }, [activeSection])

  
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