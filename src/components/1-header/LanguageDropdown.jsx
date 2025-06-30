import { useEffect, useRef, useState } from 'react';
import './header.css';


const LanguageDropdown = ({ current, languages, onLanguageChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggle = () => {
        setIsOpen(!isOpen);
    };
    const close = () => {
        setIsOpen(false);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef} className='lang-dropdown-container'>
            <button onClick={toggle} className='lang-button'>
                🌐 {current.code.toUpperCase()} {isOpen ? "▲" : "▼"}
            </button>

            {isOpen && (
                <ul className='lang-dropdown'>
                    {languages.map((lang) => (
                        <li key={lang.code} onClick={() =>
                            onLanguageChange(lang.code, close)}
                        >
                            <span className='flag'>{lang.flag}</span> {lang.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>

    );
};
export default LanguageDropdown; 
