import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import './timeline.css'
import timelineData from './timelineData'


const Timeline = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20%' });

  const groupVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, when: 'beforeChildren' },
    },
  };

  const itemVariants = (index) => ({
    hidden: {
      opacity: 0,
      x: index % 2 === 0 ? -100 : 100,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 120, damping: 20 }
    },
  });

  return (

    <section className='time-sec'>
      <h1 className='title flex'>
        <span className=' icon-calendar'> </span>
        Lebenslauf
      </h1>
      <motion.div
        className="timeline-container"
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={containerVariants}
      >
        {/* Zentrale Linie */}
        <div className="timeline-line" />

        {timelineData.map((group, groupIndex) => (
          <motion.div
            key={groupIndex}
            className="timeline-group"
            variants={groupVariants}
          >
            {/* gruppentitel */}
            <div className=" flex group-title">
              <button className="">
                {group.title}
              </button>
            </div>

          {/* timeline-items */}
          {group.items.map((item, itemIndex) => (
            <motion.div
              key={itemIndex}
              className={`timeline-item ${itemIndex % 2 === 0 ? 'left' : 'right'}`}
              variants={itemVariants(itemIndex)}
            >
              <div className="timeline-content">
                <small className="text-sm text-gray-400">{item.date}</small>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-secondary">{item.company}</p>
                {item.description && (
                  <p className="mt-2 text-gray-300">{item.description}</p>
                )}
              </div>

              {/* Icon-Kreis */}
              <div className="timeline-icon-container">
                <div className="timeline-icon-circle">
                  <span className={`timeline-icon ${item.icon}`}></span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ))}
    </motion.div>
  </section>
)};

export default Timeline;