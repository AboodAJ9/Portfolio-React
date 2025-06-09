import React from 'react';
import './main.css';
import { useState } from 'react';
import { myProjects } from './myProjects';
import { AnimatePresence, motion, transform } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Main = () => {
     
    const { t, i18n } = useTranslation();    
    const [activeButton, setActive] = useState(0);
    const [projArr, setProjArr] = useState(myProjects);
    const buttons = [t("all"), "Spring-Boot", "react/Next", "vue.js", "java", "python"]

    const handleClick = (index) => {
        console.log("hey bro" + index)
        setActive(index);
        const selectedCategory = buttons[index].toLowerCase();
        const filtered = selectedCategory === t("all")
            ? myProjects
            : myProjects.filter(project =>
                project.categories.some(cat =>
                    cat.toLowerCase() === selectedCategory // mind. 1 uebereinstimmung 
                ));
        setProjArr(filtered);
    };

    return (
        <main className='flex'>

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


                    {projArr.map((item) => {
                        return (

                            <motion.article
                                layout
                                initial={{ transform: "scale(0.5)" }}
                                animate={{ transform: "scale(1)" }}
                                transition={{ type: "spring", damping: 8, stiffness: 40, delay: 0.001 }}


                                key={item.imgPath} className=' card'>
                                <img width={266} src={item.imgPath} alt="" />
                                <div style={{ width: "266px" }} className='box'>
                                    <h1 className='title'>{t(item.projectTitle)}</h1>
                                    <p className='sub-title'>{t(item.subtitle).split('\n').map((line, index) => <span key={index}>{line}<br /></span>)}</p>

                                    <div className='flex icons'>
                                        <div style={{ gap: "11px" }} className='flex'>
                                            {/* <div className='icon-link'></div> */}
                                            <div style = {{paddingLeft: "0.5rem"}} className='icon-github'></div>
                                        </div>
                                        <a className='link flex' href="" > {t("more")}
                                            <span className='icon-arrow-right'></span>
                                        </a>
                                    </div>

                                </div>
                            </motion.article>
                        );
                    })}

                </AnimatePresence>

            </section>
        </main>
    );
}

export default Main;














{/* <button onClick={()=>{
                    handleClick(index); 
                }} 
                className={true? "active":null}> all projects </button> */}

{/* <button> HTML & CSS </button>
                <button> JS/TS </button>
                <button> java </button>
                <button> python</button> */}