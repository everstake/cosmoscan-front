import { useCallback, useState } from 'react';

const useHover = () => {
  const [isHovering, setIsHovering] = useState(true);

  const handleMouseOver = useCallback(() => setIsHovering(true), []);
  const handleMouseOut = useCallback(() => setIsHovering(false), []);

  return [handleMouseOver, handleMouseOut, isHovering];
};

export default useHover;
