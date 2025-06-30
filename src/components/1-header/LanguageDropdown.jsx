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

    useEffect(() => {

        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                close();
            }
        };

        const handleEscapeKey = (event) => {
            if (event.key === 'Escape') {
                close();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscapeKey);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, []);

    return (
        <div ref={dropdownRef} className='lang-dropdown-container'>
            <button onClick={toggle} className='lang-button'>
                🌐 {current.code.toUpperCase()} 
                <span className={`icon-cheveron-outline-down icon ${isOpen ? 'open' : ''}`}></span>

            </button>

                <ul className={`lang-dropdown ${isOpen ? 'open' : ''}`}>
                    {languages.map((lang) => (
                        <li key={lang.code} onClick={() =>
                            onLanguageChange(lang.code, close)}
                        >
                            <span className='flag'>{lang.flag}</span> {lang.label}
                        </li>
                    ))}
                </ul>
        </div>

    );
};
export default LanguageDropdown; 
