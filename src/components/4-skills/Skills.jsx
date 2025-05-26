import './skills.css';
import { motion, useInView } from 'framer-motion';
import {logos} from './logos'; 
import { useRef } from 'react';

const Skills = () => {
    
    const ref = useRef(null); 
    const isInView = useInView(ref, { 
        once: true, 
        margin: "-100px 0px 0px 0px" // starten 100 px bevor element sichtbar wird. 
    });
    const containerVariants = {
        hidden: { opacity: 0}, 
        visible: {
            opacity: 1, 
            transition: {
                staggerChildren: 0.1, // verzoegerung zwischen icons 
                when: "beforeChildren",
            }
        }
    };

    const iconVariants = {
        hidden: { 
            opacity: 0, 
            x: -10, 
            scale: 0.8
        },
        visible: { 
            opacity: 1, 
            x: 0, 
            scale: 1,
            transition: { 
            type: "spring",
            stiffness: 120,
            damping: 100
            }
        }
    };
    return (
        <section className='skill-sec'>

            <h1 className='title flex'>
                <span className=' icon-lamp'> </span>
                Skills
            </h1>


            <motion.div 
                ref = {ref}
                className="icons-container"
                variants={containerVariants}
                initial="hidden"
                animate = {isInView? "visible": "hidden"}
            >
            {logos.map((icon, index) => (
                <motion.img 
                    
                    key={index}
                    src={icon}
                    alt={icon.split('/').pop().replace(/_logo\.png$/, '')}
                    className='tech-icon'
                    variants={iconVariants}
                />
            ))}

            </motion.div>

        </section>
    );
}

export default Skills;