/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';

const useAllCssLoaded = () => {
  const [cssFilesLoaded, setCssFilesLoaded] = useState<String[]>([]);
  const [allCssLoaded, setAllCssLoaded] = useState(false);

  useEffect(() => {
    const links = document.querySelectorAll('link[rel="stylesheet"]');
    const totalCssFiles = links.length;
    console.log(links);

    const handleCssLoad = (event:Event) => {
      const { href } = event.target as HTMLLinkElement ;
      setCssFilesLoaded((prev) => {
        if (cssFilesLoaded.length+1 === totalCssFiles) {
            setAllCssLoaded(true);
          }
        return [...prev, href]
     });

      
    };
    let a:  HTMLLinkElement[]=[]
    links.forEach(element => {
        a.push(element as HTMLLinkElement)
    });
    a.map(x=>x.addEventListener('load',()=>console.log('loaded')
    ))
    // return () => {
    //   links.forEach((link) => {
    //     if (link.removeEventListener) {
    //       link.removeEventListener('load', handleCssLoad);
    //     }
    //   });
    // };
  }, [cssFilesLoaded]);

  return allCssLoaded;
};

export default useAllCssLoaded;
