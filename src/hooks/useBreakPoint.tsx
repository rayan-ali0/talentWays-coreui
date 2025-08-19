import { useState, useEffect } from 'react';

export type BreakPoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface UseBreakPointReturn {
  currentBreakpoint: BreakPoint;
  isSm: boolean;
  isMd: boolean;
  isLg: boolean;
  isXl: boolean;
  is2Xl: boolean;
  getCurrentColumns: (gridClassName?: string) => number;
}

export const useBreakPoint = (): UseBreakPointReturn => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<BreakPoint>('sm');

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      
      if (width >= 1536) {
        setCurrentBreakpoint('2xl');
      } else if (width >= 1280) {
        setCurrentBreakpoint('xl');
      } else if (width >= 1024) {
        setCurrentBreakpoint('lg');
      } else if (width >= 768) {
        setCurrentBreakpoint('md');
      } else {
        setCurrentBreakpoint('sm');
      }
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);

    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  const getCurrentColumns = (gridClassName?: string): number => {
    if (!gridClassName) {
      switch (currentBreakpoint) {
        case 'sm':
          return 1;
        case 'md':
          return 2;
        case 'lg':
        case 'xl':
        case '2xl':
          return 3;
        default:
          return 1;
      }
    }

    const lgMatch = gridClassName.match(/lg:grid-cols-(\d+)/);
    const mdMatch = gridClassName.match(/md:grid-cols-(\d+)/);
    const smMatch = gridClassName.match(/sm:grid-cols-(\d+)/);
    const baseMatch = gridClassName.match(/(?:^|\s)grid-cols-(\d+)(?:\s|$)/);

    switch (currentBreakpoint) {
      case 'sm':
        return smMatch ? parseInt(smMatch[1]) : 
               baseMatch ? parseInt(baseMatch[1]) : 1;
      case 'md':
        return mdMatch ? parseInt(mdMatch[1]) : 
               smMatch ? parseInt(smMatch[1]) : 
               baseMatch ? parseInt(baseMatch[1]) : 1;
      case 'lg':
      case 'xl':
      case '2xl':
        return lgMatch ? parseInt(lgMatch[1]) : 
               mdMatch ? parseInt(mdMatch[1]) : 
               smMatch ? parseInt(smMatch[1]) : 
               baseMatch ? parseInt(baseMatch[1]) : 1;
      default:
        return 1;
    }
  };

  return {
    currentBreakpoint,
    isSm: currentBreakpoint === 'sm',
    isMd: currentBreakpoint === 'md',
    isLg: currentBreakpoint === 'lg',
    isXl: currentBreakpoint === 'xl',
    is2Xl: currentBreakpoint === '2xl',
    getCurrentColumns,
  };
};
