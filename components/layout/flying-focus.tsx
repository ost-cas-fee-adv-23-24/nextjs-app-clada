'use client';
import React, { useEffect, useRef, useState } from 'react';

interface FocusRingProps {
  top: string;
  left: string;
  width: string;
  height: string;
}

const FlyingFocus: React.FC = () => {
  const [focusRing, setFocusRing] = useState<FocusRingProps | null>(null);
  const usingKeyboardRef = useRef(true);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        usingKeyboardRef.current = true;
      }
    };

    const handleMouseDown = () => {
      usingKeyboardRef.current = false;
    };

    const handleFocus = (event: FocusEvent) => {
      if (usingKeyboardRef.current) {
        const target = event.target as HTMLElement;

        if (target && target.getBoundingClientRect) {
          const rect = target.getBoundingClientRect();

          setFocusRing({
            top: `${rect.top}px`,
            left: `${rect.left}px`,
            width: `${rect.width}px`,
            height: `${rect.height}px`,
          });

          target.classList.add('keyboard-focus');
        }
      }
    };

    const handleBlur = (event: FocusEvent) => {
      const target = event.target as HTMLElement;
      target?.classList?.remove('keyboard-focus');
      setFocusRing(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('focus', handleFocus, true);
    window.addEventListener('blur', handleBlur, true);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('focus', handleFocus, true);
      window.removeEventListener('blur', handleBlur, true);
    };
  }, []);

  if (!focusRing || !usingKeyboardRef.current) {
    return null;
  }

  const style: React.CSSProperties = {
    top: focusRing.top,
    left: focusRing.left,
    width: focusRing.width,
    height: focusRing.height,
    position: 'fixed',
    pointerEvents: 'none',
    transition: 'all 300ms ease-out',
  };

  return <div className='flying-focus' style={style} aria-hidden='true' />;
};

export default FlyingFocus;
