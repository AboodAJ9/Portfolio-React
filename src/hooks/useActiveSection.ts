import { useEffect, useState } from "react";


export default function useActiveSection(sections: { id: string }[]) {
  const [activeSection, setActiveSection] = useState('');

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

  return activeSection;

}
