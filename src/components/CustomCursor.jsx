import React, { useRef, useEffect } from 'react';

function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);

  const getLuminance = (r, g, b) => {
    // Formule pour calculer la luminance relative
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  };

  const getBackgroundColor = (element) => {
    const bgColor = window.getComputedStyle(element).backgroundColor;
    const matches = bgColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (matches) {
      return {
        r: parseInt(matches[1]),
        g: parseInt(matches[2]),
        b: parseInt(matches[3])
      };
    }
    return { r: 255, g: 255, b: 255 }; // Par défaut fond blanc
  };

  const updateCursorColor = (e) => {
    const element = document.elementFromPoint(e.clientX, e.clientY);
    if (element) {
      const { r, g, b } = getBackgroundColor(element);
      const luminance = getLuminance(r, g, b);
      
      const cursor = cursorRef.current;
      const dot = dotRef.current;
      
      if (luminance < 0.5) {
        // Fond sombre -> curseur blanc
        cursor.style.borderColor = '#ffffff';
        dot.style.backgroundColor = '#ffffff';
      } else {
        // Fond clair -> curseur noir
        cursor.style.borderColor = '#000000';
        dot.style.backgroundColor = '#000000';
      }
    }
  };

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;

    const moveCursor = (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      dot.style.left = e.clientX + 'px';
      dot.style.top = e.clientY + 'px';
      updateCursorColor(e);
    };

    const handleMouseOver = () => {
      cursor.classList.add('hover');
    };

    const handleMouseOut = () => {
      cursor.classList.remove('hover');
    };

    document.addEventListener('mousemove', moveCursor);

    const interactiveElements = document.querySelectorAll('a, button, .product-card, .category-card');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseover', handleMouseOver);
      el.addEventListener('mouseout', handleMouseOut);
    });

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseover', handleMouseOver);
        el.removeEventListener('mouseout', handleMouseOut);
      });
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor"></div>
      <div ref={dotRef} className="cursor-dot"></div>
    </>
  );
}

export default CustomCursor; 