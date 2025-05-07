import { useEffect, useState } from "react";

const useScreenSize = () => {
const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
    useEffect(() => {
    const resizeListener = (event: UIEvent) => {
       setScreenWidth(window.innerWidth);
    }
    
  window.addEventListener('resize', resizeListener);

  return () => {
    document.removeEventListener('resize', resizeListener);
  }
},[]);
    return { screenWidth };
}

export default useScreenSize;