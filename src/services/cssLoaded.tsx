/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';

const useAllCssLoaded = () => {
  const [cssFilesLoaded, setCssFilesLoaded] = useState<String[]>([]);
  const [allCssLoaded, setAllCssLoaded] = useState(false);

  useEffect(() => {
    const links = document.querySelectorAll('link[rel="stylesheet"]');
    const totalCssFiles = links.length;
    console.log(totalCssFiles);

    const handleCssLoad = (event:Event) => {
      const { href } = event.target as HTMLLinkElement ;
      setCssFilesLoaded((prev) => [...prev, href]);

      if (cssFilesLoaded.length === totalCssFiles) {
        setAllCssLoaded(true);
      }
    };

    links.forEach((link) => {
      if (link.addEventListener) {
        link.addEventListener('load', handleCssLoad);
      }  
    });

    return () => {
      links.forEach((link) => {
        if (link.removeEventListener) {
          link.removeEventListener('load', handleCssLoad);
        }
      });
    };
  }, [cssFilesLoaded]);

  return allCssLoaded;
};

export default useAllCssLoaded;
