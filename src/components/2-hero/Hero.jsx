import React, { useEffect, useRef } from 'react';
import './hero.css';
import Lottie from 'lottie-react';
import devAnimation from "../../animations/dev.json"
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Hero = () => {
    const lottieRef = useRef(); 
    const { t, i18n } = useTranslation();
    console.log("dfdfd" + lottieRef.current)
    useEffect(() => {
        if (lottieRef.current) {
            console.log("heeeeee"); 
            // @ts-ignore
            //https://lottiereact.com/
            lottieRef.current.setSpeed(0.5);
        }
    }, []);
    return (
        <section className='hero  flex'>
            <div className="left-section">

                <div className="parent-avatar flex">
                    <motion.img 
                    initial={{transform: "scale(0)" }}
                    animate={{transform: "scale(1.1)" }}
                    transition={{damping:6, type: "spring", stiffness: 100}}
                    src="./ownImage_cycle.png" className="avatar" alt="" />
                    <div className='icon-verified'> </div>
                </div>

                <h1 className='title'>
                    {t("welcome")}
                </h1>

                <p className='sub-title'> 
                    {t("intro")}
                </p>

                <div className='all-icons flex'> 
                    <a href ="https://github.com/AboodAJ9" className="icon icon-github"></a>
                    <a href ="https://www.linkedin.com/in/abdallah-jaber-hsrm/" className="icon icon-linkedin"></a>
                    <a href ="https://www.codewars.com/users/aboodAJ_991" className="icon icon-codewars"></a>
                </div>


            </div>
            <div className="right-section animation">  

                <Lottie
                lottieRef={lottieRef}
                className='mail-animation' 
                style = {{height: "500px"}} 
                animationData={devAnimation} /> 

            </div>
        </section>
    );
}

export default Hero; 


//npm install lottie-react
//npm install framer-motion  --> mehr infos: framer.com/motion/introduction