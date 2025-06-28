import React, { useEffect, useState, useRef } from 'react';
import './header.css';
import { useTranslation } from 'react-i18next';
import LanguageDropdown from './LanguageDropdown';

const languages = [
    { code: "de", label: "Deutsch", flag: "🇩🇪" },
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "ar", label: "عربي", flag: "🇸🇾" }
]

const Header = () => {
    const { t, i18n } = useTranslation();
    const [showModal, setShowModal] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem("theme") ?? 'dark');
    const curLang = i18n.language;

    useEffect(() => {
        document.body.classList.remove("light", "dark");
        document.body.classList.add(theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === "dark" ? "light" : "dark");
    };

    const changeLang = (code) => {
        i18n.changeLanguage(code);
    };

    const current = languages.find((l) => l.code === curLang) || languages[0];


    return (
        <header className='flex header'>
            <button className='menu icon-menu flex' onClick={() => {
                setShowModal(true)
            }} />
            {/* <div /> */}
            {/* <img width = {200} src="./logo.png" alt = ""/> */}

            <nav className='nav'>
                <ul className='flex'>
                    <li><a href="#up">{t("home")}</a></li>
                    <li><a href="#projects">{t("projects")}</a></li>
                    <li><a href="#skills">{t("skills")}</a></li>
                    <li><a href="#timeline">{t("timeline")}</a></li>
                    <li><a href="#contact">{t("contact")}</a></li>
                    <li>
                        <LanguageDropdown
                            current={current}
                            languages={languages}
                            changeLang={(code, closeDropdown) => { changeLang(code); closeDropdown(); }}
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
                        <li><a href="#up">{t("home")}</a></li>
                        <li><a href="#projects">{t("projects")}</a></li>
                        <li><a href="#skills">{t("skills")}</a></li>
                        <li><a href="#timeline">{t("timeline")}</a></li>
                        <li><a href="#contact">{t("contact")}</a></li>
                        <li className='lang-container'>
                            <LanguageDropdown
                                current={current}
                                languages={languages}
                                changeLang={(code, closeDropdown) => { changeLang(code); closeDropdown(); }}
                            />
                        </li>


                    </ul>

                </div>
            )}

        </header>

    );
}
export default Header; 