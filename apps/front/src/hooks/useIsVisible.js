import { useEffect, useRef, useState } from 'react';

export function useIsVisible({ offset = 0, persistent = true, minVisibleHeight = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const currentElement = useRef(null);

  const checkVisibility = () => {
    if (!currentElement.current) {
      return;
    }
    const { top } = currentElement.current.getBoundingClientRect();
    if (top + offset >= 0 && top + minVisibleHeight - offset <= window.innerHeight) {
      setIsVisible(true);
    } else if (!persistent) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    checkVisibility();
    document.addEventListener('scroll', checkVisibility, true);
    return () => document.removeEventListener('scroll', checkVisibility, true);
  });

  return [isVisible, currentElement];
}
