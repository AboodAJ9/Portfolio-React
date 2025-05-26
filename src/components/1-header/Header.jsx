import React, { useEffect, useState } from 'react';
import './header.css';
const Header = () => {

    const [showModal, setShowModal] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem("theme")?? 'dark');


    useEffect(() => {
        document.body.classList.remove("light", "dark");
        document.body.classList.add(theme);
        localStorage.setItem("theme", theme);
    }, [theme]);


    const toggleTheme = () => {
        setTheme(prev => prev === "dark" ? "light" : "dark");
    };


    return (
        <header className='flex '>
            <button className='menu icon-menu flex' onClick={() => {
                setShowModal(true)
            }} />
            <div />
            {/* <img width = {200} src="./logo.png" alt = ""/> */}
            
            <nav className=''>
                <ul className=' flex'>
                    <li><a href="#up">Home</a></li>
                    <li><a href="#projects">Projekte</a></li>
                    <li><a href="#skills">Skills</a></li>
                    <li><a href="#timeline">Lebenslauf</a></li>
                    <li><a href="#contact">Kontakt</a></li>
                </ul>
            </nav>

            <button
                onClick={toggleTheme}
                className=' mode flex'>
                <span className={theme==="dark"? "icon-moon-o": "icon-sun"}> </span>
            </button>
            
            {showModal && (
                <div className='fixed'>
                    <ul className='modal'>
                        <li>
                            <button className="icon-close" onClick={() => {
                                setShowModal(false)
                            }} />
                        </li>
                        <li><a href="">About</a></li>
                        <li><a href="">Skills</a></li>
                        <li><a href="">Projects</a></li>
                        <li><a href="">Speaking</a></li>
                        <li><a href="">Contact</a></li>
                    </ul>
                </div>
            )}

        </header>



    );
}

export default Header; 