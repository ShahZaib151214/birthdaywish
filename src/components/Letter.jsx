import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { memory } from '../memory';
import { themes } from '../data/themes';
import { longLetters } from '../data/messages';

const Letter = () => {
  const navigate = useNavigate();
  const { month } = memory.date;
  const theme = themes[month];
  const letter = longLetters[month]
    .replace('[Name]', memory.name)
    .replace('[From]', memory.from);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '40px 20px',
      perspective: '1000px'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 100, rotateX: 20 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        style={{
          background: '#fffcdb', // parchment color
          padding: '40px',
          borderRadius: '5px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          maxWidth: '700px',
          width: '100%',
          position: 'relative',
          fontFamily: 'Dancing Script, cursive', 
          fontSize: '1.5rem',
          lineHeight: '1.8',
          color: '#5d4037',
          maxHeight: '80vh',
          overflowY: 'auto'
        }}
      >
        <div style={{ whiteSpace: 'pre-wrap' }}>
          {letter}
        </div>
        
        <div style={{ marginTop: '30px', textAlign: 'right', fontWeight: 'bold' }}>
          With Love,
          <br />
          {memory.from}
        </div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        onClick={() => navigate('/')}
        style={{
          marginTop: '30px',
          background: theme.colors.primary,
          color: '#fff',
          padding: '10px 30px',
          borderRadius: '30px',
          border: 'none',
          fontSize: '1.2rem',
          cursor: 'pointer',
          boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
        }}
      >
        Replay Memory
      </motion.button>
    </div>
  );
};

export default Letter;
