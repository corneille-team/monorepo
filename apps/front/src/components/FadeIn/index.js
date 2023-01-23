import React from 'react';

import { useIsVisible } from '../../hooks/useIsVisible';

function getFromPosition(from) {
  switch (from) {
    case 'bottom':
      return 'top';
    case 'top':
      return 'bottom';
    case 'left':
      return 'right';
    case 'right':
      return 'left';
  }
}

const FadeIn = ({
  from,
  triggerOffset,
  positionOffset,
  delayInMilliseconds = 0,
  durationInMilliseconds = 1200,
  style,
  children,
}) => {
  const [isVisible, isVisibleRef] = useIsVisible({
    offset: triggerOffset,
  });

  const fromPosition = getFromPosition(from);

  return (
    <div
      style={{
        position: 'relative',
        [fromPosition]: isVisible ? 0 : positionOffset,
        opacity: isVisible ? 1 : 0,
        transition: `${fromPosition} ${durationInMilliseconds}ms, opacity ${durationInMilliseconds}ms`,
        transitionDelay: `${delayInMilliseconds}ms`,
        ...style,
      }}
      ref={isVisibleRef}
    >
      {children}
    </div>
  );
};

export default FadeIn;
