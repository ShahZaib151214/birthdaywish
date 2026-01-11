import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { memory } from '../memory';
import { themes } from '../data/themes';

const TypingText = ({ text, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  useEffect(() => {
    let index = 0;
    setDisplayedText('');
    if (!text) return;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index >= text.length) {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, 40);
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayedText}</span>;
};

const Memories = () => {
  const navigate = useNavigate();
  const { month } = memory.date;
  const theme = themes[month];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [readingFinished, setReadingFinished] = useState(false);

  const memories = memory.memories;
  const currentMemory = memories[currentIndex];
  const isLast = currentIndex === memories.length - 1;

  const handleNext = () => {
    if (isLast) {
      navigate('/cake');
    } else {
      setCurrentIndex((prev) => prev + 1);
      setReadingFinished(false);
    }
  };

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      perspective: '1500px', // Deeper perspective for 3D feel
      overflow: 'hidden'
    }}>
      <h2 style={{
        position: 'absolute',
        top: '5%',
        color: 'white',
        fontFamily: 'Dancing Script',
        fontSize: '3rem',
        textShadow: '0 2px 10px rgba(0,0,0,0.3)',
        zIndex: 10
      }}>
        Precious Moments
      </h2>

      <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 200, rotateY: -15, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
            exit={{ opacity: 0, x: -200, rotateY: 15, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            style={{
              width: '90%',
              maxWidth: '500px',
              background: 'rgba(255, 255, 255, 0.25)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.4)',
              borderRadius: '25px',
              padding: '25px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            {/* Polaroid / Photo Frame Effect */}
            <div style={{
              background: 'white',
              padding: '10px 10px 40px 10px', // Extra bottom padding for polaroid look
              boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
              borderRadius: '5px',
              transform: 'rotate(-2deg)',
              width: '100%',
              marginBottom: '20px'
            }}>
                <img 
                  src={currentMemory.image} 
                  alt="Memory"
                  style={{
                      width: '100%',
                      height: '350px',
                      objectFit: 'cover',
                      borderRadius: '3px',
                      backgroundColor: '#eee'
                  }}
                />
            </div>

            <div style={{
              minHeight: '80px',
              color: 'white',
              fontSize: '1.2rem',
              fontWeight: '500',
              textAlign: 'center',
              textShadow: '0 1px 2px rgba(0,0,0,0.5)',
              marginBottom: '20px',
              width: '100%'
            }}>
              <TypingText text={currentMemory.message} onComplete={() => setReadingFinished(true)} />
            </div>

            {readingFinished && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.1, backgroundColor: 'white', color: theme.colors.primary }}
                onClick={handleNext}
                style={{
                  background: 'rgba(255,255,255,0.9)',
                  color: theme.colors.primary,
                  border: 'none',
                  padding: '12px 30px',
                  borderRadius: '50px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                }}
              >
                {isLast ? "Ready for Cake? 🎂" : "Next Memory ➜"}
              </motion.button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Memories;
