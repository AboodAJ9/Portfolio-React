import './projects.css';
import { useLayoutEffect, useRef, useState } from 'react';
import { myProjects } from './myProjects';
import { AnimatePresence, motion, transform } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Main = () => {
    const { t } = useTranslation();
    const [activeButton, setActive] = useState(0);
    const [projArr, setProjArr] = useState(myProjects);
    const buttons = [t("all"), "Spring-Boot", "react/Next", "vue.js", "java", "python"]
    const [flippedCards, setFlippedCards] = useState({});
    const [visibleCards, setVisibleCards] = useState(3);
    const projectRef = useRef(null);

    const handleClick = (index) => {
        setActive(index);
        const selectedCategory = buttons[index].toLowerCase();
        console.log("hey joo" + t("all") + selectedCategory)
        const filtered = selectedCategory === t("all")
            ? myProjects
            : myProjects.filter(project =>
                project.categories.some(cat =>
                    cat.toLowerCase() === selectedCategory // mind. 1 uebereinstimmung 
                ));
        setProjArr(filtered);
    };

    const handleFlip = (key) => {
        setFlippedCards((prevCards) => ({
            ...prevCards,
            [key]: !prevCards[key],
        }));
    }

    // useLayoutEffect wird synchron nach dem DOM-Paint ausgeführt, noch bevor 
    // der Browser sichtbar rendern kann. Dadurch vermeidet man kurzes visuelles Springen
    // der darunter liegenden Komponente
    useLayoutEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 700) {
                setVisibleCards(3);
            } else {
                setVisibleCards(projArr.length);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [projArr.length]);
    return (
        <main ref={projectRef} id='projects' className='flex'>

            <section className='flex left-section'>
                {buttons.map((label, index) => (
                    <button
                        key={index}
                        className={activeButton === index ? "active" : ""}
                        onClick={() => {
                            handleClick(index);
                        }}
                    >
                        {label}
                    </button>
                ))}

            </section>
            <section className=' flex right-section'>

                <AnimatePresence mode="wait">
                    {projArr.slice(0, visibleCards).map((item) => {
                        return (
                            <motion.article
                                layout
                                initial={{ transform: "scale(0.5)" }}
                                animate={{ transform: "scale(1)" }}
                                transition={{ type: "spring", damping: 8, stiffness: 40, delay: 0.001 }}
                                key={item.imgPath}
                                className={`card ${flippedCards[item.imgPath] ? 'flipped' : ''}`}
                            >
                                <div className="card-inner">

                                    <div className='card-front'>
                                        <img width={266} src={item.imgPath} alt="" />
                                        <div style={{ width: "266px" }} className='box'>
                                            <h1 className='title'>{t(item.projectTitle)}</h1>
                                            <p className='sub-title'>{t(item.subtitle).split('\n').map((line, index) => <span key={index}>{line}<br /></span>)}</p>

                                            <div className='flex icons'>
                                                <div style={{ gap: "11px" }} className='flex'>
                                                    {/* <div className='icon-link'></div> */}
                                                    <a href={item.git}>
                                                        <div style={{ paddingLeft: "0.5rem" }} className='icon-github'>
                                                        </div></a>
                                                </div>
                                                <a
                                                    className='link flex'
                                                    role='button'
                                                    onClick={(e) => {
                                                        handleFlip(item.imgPath);
                                                    }}
                                                > {t("more")} <span className='icon-forward' style={{ marginLeft: "3px" }}> </span>
                                                </a>
                                            </div>
                                        </div>


                                    </div>
                                    <div className='card-back' >
                                        <div className='tech-icons'>
                                            {item.techs.map((tech, index) => (
                                                <span key={index} className='tech-tag'> {tech} </span>
                                            ))}

                                        </div>
                                        <div className="tech-icons" style={{ position: "absolute", bottom: "10px" }}>
                                            <a 
                                                className='link flex'
                                                role='button' 
                                                onClick={(e) => {
                                                    handleFlip(item.imgPath);
                                            }}

                                            > {t("back")} <span className='icon-reply'> </span>
                                            </a>
                                        </div>
                                    </div>
                                </div>


                            </motion.article>

                        );
                    })}

                </AnimatePresence>
                {visibleCards < projArr.length && projArr.length > 3 && (

                    <a className='more-button' onClick={() => {
                        setVisibleCards(visibleCards + 3);
                    }}> <span className='icon-chevron-circle-down'>  </span> {t("more-proj")}
                    </a>
                )}

                {visibleCards >= projArr.length && projArr.length > 3 && window.innerWidth <= 700 && (

                    <a className='less-button' onClick={() => {
                        setVisibleCards(3);
                        projectRef.current.scrollIntoView({ behavior: 'smooth' });
                    }}> <span className='icon-chevron-circle-down' style={{ transform: "rotate(180deg)" }}>  </span> {t("less-proj")}
                    </a>
                )}
            </section>
        </main >
    );
}

export default Main;