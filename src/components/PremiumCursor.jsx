import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const PremiumCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (target.closest('a, button, .product-card, .category-card')) {
        setIsHovering(true);
        setCursorVariant('hover');
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
      setCursorVariant('default');
    };

    window.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1,
      transition: {
        type: "spring",
        mass: 0.6,
        stiffness: 700,
        damping: 30
      }
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      scale: 1.5,
      transition: {
        type: "spring",
        mass: 0.6,
        stiffness: 700,
        damping: 30
      }
    }
  };

  const dotVariants = {
    default: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        mass: 0.3,
        stiffness: 1000,
        damping: 28
      }
    },
    hover: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      opacity: 0,
      scale: 0,
      transition: {
        type: "spring",
        mass: 0.3,
        stiffness: 1000,
        damping: 28
      }
    }
  };

  return (
    <>
      <motion.div
        className="cursor-outer"
        variants={variants}
        animate={cursorVariant}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 99999999,
          pointerEvents: 'none',
          width: '32px',
          height: '32px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%'
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              border: '2px solid rgba(255, 255, 255, 0.8)',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
              backdropFilter: 'invert(1) hue-rotate(180deg)',
              WebkitBackdropFilter: 'invert(1) hue-rotate(180deg)'
            }}
          />
        </div>
      </motion.div>
      <motion.div
        className="cursor-inner"
        variants={dotVariants}
        animate={cursorVariant}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 99999999,
          pointerEvents: 'none',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: '#fff',
          boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
          backdropFilter: 'invert(1) hue-rotate(180deg)',
          WebkitBackdropFilter: 'invert(1) hue-rotate(180deg)'
        }}
      />
    </>
  );
};

export default PremiumCursor; 