/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';

const useAllCssLoaded = () => {
  const [cssFilesLoaded, setCssFilesLoaded] = useState<String[]>([]);
  const [allCssLoaded, setAllCssLoaded] = useState(false);
  const links = document.querySelectorAll('link[rel="stylesheet"]');
  let a:  HTMLLinkElement[]=[]
  links.forEach(element => {
      a.push(element as HTMLLinkElement)
  });
  a.map(x=>x.onload =()=>console.log(x)
  )

  return allCssLoaded;
};

export default useAllCssLoaded;
