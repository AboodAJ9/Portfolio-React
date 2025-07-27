import { useEffect, useState } from 'react';
import './header.css';
import { useTranslation } from 'react-i18next';
import LanguageDropdown from './LanguageDropdown';

const languages = [
    { code: "de", label: "Deutsch", flag: "🇩🇪" },
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "ar", label: "عربي", flag: "🇸🇾" }
]

const Header = ({ sections, activeSection }) => {
    const { i18n } = useTranslation();
    const [showModal, setShowModal] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem("theme") ?? 'dark');
    const current = languages.find((lang) => lang.code === i18n.language);

    useEffect(() => {
        document.body.classList.remove("light", "dark");
        document.body.classList.add(theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === "dark" ? "light" : "dark");
    };

    const handleLanguageChange = (code, closeDropdown) => {
        i18n.changeLanguage(code);
        closeDropdown();
    };

    return (
        <header className='flex header'>
            <button className='menu icon-menu flex' onClick={() => {
                setShowModal(true)
            }} />
            {/* <div /> */}
            {/* <img width = {200} src="./logo.png" alt = ""/> */}

            <nav className='nav'>
                <ul className='flex'>

                    {sections.map((section) => (
                        <li key={section.id} className={activeSection === section.id ? "active" : ""}>
                            <a href={`#${section.id}`}>{section.label}</a>
                        </li>
                    ))}

                    <li>
                        <LanguageDropdown
                            current={current}
                            languages={languages}
                            onLanguageChange={handleLanguageChange}
                        />
                    </li>
                </ul>
            </nav>

            <div className="theme-control">

                <button onClick={toggleTheme} className='mode flex'>
                    <span className={theme === "dark" ? "icon-moon-o" : "icon-sun"}></span>
                </button>
            </div>

            {showModal && (
                <div className='fixed'>
                    <ul className='modal'>
                        <li className='first-child'>
                            <button className="icon-close" onClick={() => {
                                setShowModal(false)
                            }} />
                        </li>
                        {sections.map((section) => (
                            <li key={section.id} className={activeSection === section.id ? "active" : ""}>
                                <a href={`#${section.id}`}>{section.label}</a>
                            </li>
                        ))}
                        <li className='lang-container' >
                            <LanguageDropdown
                                current={current}
                                languages={languages}
                                onLanguageChange={handleLanguageChange}
                            />
                        </li>

                    </ul>

                </div>
            )}

        </header>

    );
}
export default Header; 