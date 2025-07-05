import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import './timeline.css'
import timelineData from './timelineData'
import { useTranslation } from 'react-i18next'

const Timeline = () => {
  const ref = useRef(null);
  const { t } = useTranslation();

  const itemVariants = (index) => ({
    hidden: {
      opacity: 0.1,
      x: index % 2 === 0 ? -100 : 100,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 120, damping: 20, delay: index * 0.05 }
    },
  });

  return (

    <section id='timeline' className='time-sec'>
      <h1 className='title flex'>
        <span className=' icon-calendar'> </span>
        {t("timeline")}
      </h1>
      <div className="timeline-container">
        {/* Zentrale Linie */}
        <div className="timeline-line" />

        {timelineData.map((group, groupIndex) => (
          <div key={groupIndex} className="timeline-group">
            {/* gruppentitel */}
            <div className=" flex group-title">
              <button className="">{t(group.title)}</button>
            </div>

            {/* timeline-items */}
            {group.items.map((item, itemIndex) => {
              const itemRef = useRef(null);
              const isInView = useInView(itemRef, { margin: '-10%', once: true});

              return (
                <motion.div
                  key={itemIndex}
                  ref={itemRef}
                  className={`timeline-item ${itemIndex % 2 === 0 ? 'left' : 'right'}`}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}             
                  variants={itemVariants(itemIndex)}
                >
                  <div className="timeline-content">
                    <small className="text-sm text-gray-400">{item.date}</small>
                    <h3 className="text-lg font-semibold">{t(item.title)}</h3>
                    <p className="text-secondary">{t(item.company)}</p>
                    {item.description && (
                      <p className="mt-2 text-gray-300">{t(item.description)}</p>
                    )}
                  </div>

                  {/* Icon-Kreis */}
                  <div className="timeline-icon-container">
                    <div className="timeline-icon-circle">
                      <span className={`timeline-icon ${item.icon}`}></span>
                    </div>
                  </div>
                </motion.div>
            );  
          })}
          </div>
        ))}
      </div>
    </section>
  )
};

export default Timeline;