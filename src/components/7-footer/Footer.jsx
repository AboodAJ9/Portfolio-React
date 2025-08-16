import React from 'react'; 
import './footer.css'; 
const Footer = () => {
    return (
        <footer className='flex'> 
            <ul className='flex'>
                <li><a href="#up">About</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#timeline">Timeline</a></li>
            </ul>

            <p>© 2025 Abdallah Jaber.</p>

        </footer>
    ); 
}

export default Footer; 