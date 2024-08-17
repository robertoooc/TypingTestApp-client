import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

const useColor = () => {
  const [colorMode, setColorMode] = useLocalStorage('color-theme', 'light');

  useEffect(() => {
    const className = 'dark';
    const bodyClass = window.document.body.classList;
    const root = document.documentElement;

    if (colorMode === 'dark') {
      bodyClass.add(className);
      root.style.setProperty('--text-color', 'white');
      root.style.setProperty('--background-color', '#333');
      root.style.setProperty('--error-color', '#FF6347');
      root.style.setProperty('--typed-color', '#555');
      root.style.setProperty('--current-color', '#FFD700');
    } else {
      bodyClass.remove(className);
      root.style.setProperty('--text-color', 'black');
      root.style.setProperty('--background-color', '#E0E0E0');
      root.style.setProperty('--error-color', '#FF6347');
      root.style.setProperty('--typed-color', '#C0C0C0');
      root.style.setProperty('--current-color', '#FFD700');
    }
  }, [colorMode]);

  return [colorMode, setColorMode];
};

export default useColor;
