import React, { useRef, useEffect } from 'react';

function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;

    const moveCursor = (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      dot.style.left = e.clientX + 'px';
      dot.style.top = e.clientY + 'px';
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