import Hero from './components/2-hero/Hero';
import Header from './components/1-header/Header';
import Projects from './components/3-projects/Projects';
import Contact from './components/6-contact/Contact';
import Footer from './components/7-footer/Footer';
import Skills from './components/4-skills/Skills';
import Timeline from './components/5-timeline/Timeline';
import './i18n';
import { useTranslation } from 'react-i18next';
import useScrollButton from './hooks/useScrollButton';
import useActiveSection from './hooks/useActiveSection';

function App() {

  const { t } = useTranslation();
  const showScrollButton = useScrollButton();
  const sections = [
    { id: "up", label: t("home") },
    { id: "projects", label: t("projects") },
    { id: "skills", label: t("skills") },
    { id: "timeline", label: t("timeline") },
    { id: "contact", label: t("contact") },
  ];
  const activeSection = useActiveSection(sections);

  return (
    <div className=' container'>
      <Header sections={sections} activeSection={activeSection} />

      <Hero activeSection={activeSection} />
      <div className='divider' />

      <Projects />
      <div className='divider' />

      <Skills />
      <div className='divider' />

      <Timeline />
      <div className='divider' />

      <Contact />
      <div className='divider' />

      <Footer />

      <a style={{ opacity: showScrollButton ? 1 : 0, transition: "1s" }} href='#up'>
        <button className='icon-keyboard_arrow_up scroll2Top'> </button>
      </a>
    </div>
  )
}

export default App; 
