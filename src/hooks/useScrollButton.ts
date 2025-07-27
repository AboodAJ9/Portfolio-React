
import { useEffect, useState } from "react";

export default function useScrollButton(threshold = 300) {
    const [showScrollButton, setShowScrollButton] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setShowScrollButton(window.scrollY > threshold);
        }

        window.addEventListener('scroll', onScroll);
        onScroll(); // initialzustand setzen
        return () => window.removeEventListener('scroll', onScroll);
    }, [threshold]);
    
    return showScrollButton; 
}

