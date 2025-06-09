import Hero from './components/2-hero/Hero';
import Header from './components/1-header/Header';
import Main from './components/3-main/Main';
import Contact from './components/6-contact/Contact';
import Footer from './components/7-footer/Footer';
import { useEffect, useState } from 'react';
import Skills from './components/4-skills/Skills';
import Timeline from './components/5-timeline/Timeline';
import './i18n';
function App() {

  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    });
  }, []); 
  

  return (
    <div id='up' className=' container'>
      <Header />
      <Hero />
      <div id = "projects" className='divider' />
      <Main />
      <div id = "skills"  className='divider' />      
      
      <Skills />
      <div id = "timeline" className='divider' />      
      
      <Timeline />
      <div id ="contact" className='divider' />

      <Contact />
      <div  className='divider' />

      <Footer />

      <a style={{ opacity: showScrollButton ? 1 : 0, transition: "1s" }} href='#up'>
        <button className='icon-keyboard_arrow_up scroll2Top'> </button>
      </a>
    </div>
  )
}

export default App; 
