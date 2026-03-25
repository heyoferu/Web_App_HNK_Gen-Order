import { useEffect } from 'react';

const useHtml2CanvasScript = () => {
  useEffect(() => {
    if (!document.querySelector('script[src*="html2canvas"]')) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);
};

export default useHtml2CanvasScript;
