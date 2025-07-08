import Hero from './components/2-hero/Hero';
import Header from './components/1-header/Header';
import Projects from './components/3-projects/Projects';
import Contact from './components/6-contact/Contact';
import Footer from './components/7-footer/Footer';
import { useEffect, useState } from 'react';
import Skills from './components/4-skills/Skills';
import Timeline from './components/5-timeline/Timeline';
import './i18n';
import { useTranslation } from 'react-i18next';
function App() {

  const [showScrollButton, setShowScrollButton] = useState(false);
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('');
  const sections = [
    { id: "up", label: t("home") },
    { id: "projects", label: t("projects") },
    { id: "skills", label: t("skills") },
    { id: "timeline", label: t("timeline") },
    { id: "contact", label: t("contact") },
  ];

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    });
  }, []);

  useEffect(() => {
    const observers = [];
    const visibilityMap = {};

    const updateActiveSection = () => {
      // 1. komplett sichtbare Abschnitte bevorzugen (kleine Komponenten)
      const fullyVisible = Object.entries(visibilityMap).filter(
        ([, ratio]) => ratio === 1
      );

      if (fullyVisible.length > 0) {
        // nimm den ersten komplett sichtbaren
        setActiveSection(fullyVisible[0][0]);
      }

      // 2. kein abschnitt zu 100% sichtbar
      else {
        // nimm die section, die den groessten teil des Viewports einnimmt
        const maxViewportCoverage = Object.keys(visibilityMap).reduce(
          (maxEntry, id) => {
            const element = document.getElementById(id.toString());
            if (!element) return maxEntry;

            const rect = element.getBoundingClientRect();
            const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
            const visible = visibleHeight > 0 ? visibleHeight : 0;

            return visible > maxEntry.visible
              ? { id, visible }
              : maxEntry;
          },
          { id: "", visible: 0 }
        );

        if (maxViewportCoverage.id) {
          setActiveSection(maxViewportCoverage.id.toString());
        }
      }
    };

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          visibilityMap[sec.id] = entry.intersectionRatio;

          updateActiveSection();
        },
        {
          threshold: Array.from({ length: 101 }, (_, i) => i / 100), // erkennt kleinste Veränderungen der Sichtbarkeit
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [sections]);

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
