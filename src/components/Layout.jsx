import React, { useEffect, useState } from 'react';
import { memory } from '../memory';
import { themes } from '../data/themes';
import Particles from './Particles';

const Layout = ({ children }) => {
  const [theme, setTheme] = useState(null);
  
  useEffect(() => {
    const month = memory.date.month;
    setTheme(themes[month]);
  }, []);

  if (!theme) return null;

  return (
    <div 
      className="layout-container"
      style={{
        background: theme.colors.background,
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        color: theme.colors.text,
        overflow: 'hidden',
        transition: 'background 1s ease'
      }}
    >
      <Particles colors={theme.balloonColors} />
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
