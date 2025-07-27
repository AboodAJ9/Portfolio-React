import { useEffect, useRef, lazy, Suspense } from 'react';
import './hero.css';
// import Lottie from 'lottie-react';
import devAnimation from "../../animations/dev.json"
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import TypeWriterEffect from './TypeWriterEffect';

const Lottie = lazy(() => import("lottie-react"));

const Hero = ({ activeSection }) => {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    document.documentElement.style.setProperty('--vw', `${window.innerHeight * 0.01}px`);
    const lottieRef = useRef(null);
    const { t } = useTranslation();

    const handleLottieLoaded = () => {
        //@ts-ignore
        //https://lottiereact.com/        
        lottieRef?.current?.setSpeed?.(0.5);
    };

    return (
        <section id='up' className='hero  flex'>
            <div className="left-section">

                <div className="parent-avatar flex">
                    <motion.img
                        initial={{ transform: "scale(0)" }}
                        animate={{ transform: "scale(1.1)" }}
                        transition={{ damping: 6, type: "spring", stiffness: 100 }}
                        src="./images/profile/ownImage_cycle.png" className="avatar" alt="private"
                        onContextMenu={(e) => e.preventDefault()}
                        draggable={false}
                        style={{ userSelect: "none", pointerEvents: "none" }} 
                    />
                    <div className='icon-verified'> </div>
                </div>

                <div style={{ position: "relative" }} className='my-intro'>
                    <h1 className='title'>
                        {t("welcome")}
                    </h1>
                </div>

                <div className='text-wrapper' style={{ position: "relative" }} >
                    <div className='placeholder'>
                        <p className='sub-title'>
                            {t("intro")}
                        </p>
                    </div>
                    <div className="animated-text">
                        <p className='sub-title'>
                            <TypeWriterEffect text={t("intro")} speed={10} activeSection={activeSection} />
                        </p>
                    </div>
                </div>

                <div className='all-icons flex'>
                    <a href="https://github.com/AboodAJ9" className="icon icon-github"></a>
                    <a href="https://www.linkedin.com/in/abdallah-jaber-hsrm/" className="icon icon-linkedin"></a>
                    <a href="https://www.codewars.com/users/aboodAJ_991" className="icon icon-codewars"></a>
                </div>


            </div>
            <div className="right-section animation">
                <Suspense fallback={
                    <div style={{ minHeight: "500px" }}>{t("loading")}</div>}>
                    <Lottie
                        lottieRef={lottieRef}
                        className='mail-animation'
                        style={{ height: "500px" }}
                        animationData={devAnimation} 
                        onDOMLoaded={handleLottieLoaded}
                    />
                </Suspense>

            </div>
        </section>
    );
}

export default Hero;


//npm install lottie-react
//npm install framer-motion  --> mehr infos: framer.com/motion/introduction