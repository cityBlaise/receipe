/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';

const useAllCssLoaded = () => {
  const [cssFilesLoaded, setCssFilesLoaded] = useState([]);
  const [allCssLoaded, setAllCssLoaded] = useState(false);
 
    useEffect(() => {
      const onPageLoad = () => {
        setAllCssLoaded(true);
      };
  
      // Check if the page has already loaded
      if (document.readyState === 'complete') {
        onPageLoad();
      } else {
        window.addEventListener('load', onPageLoad);
        // Remove the event listener when component unmounts
        return () => window.removeEventListener('load', onPageLoad);
      }
    
  }, [cssFilesLoaded]);

  return allCssLoaded;
};

export default useAllCssLoaded;
