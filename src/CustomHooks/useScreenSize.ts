import { useEffect, useState } from "react";

const useScreenSize = () => {
const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
    useEffect(() => {
  window.addEventListener('resize', (event) => {
    setScreenWidth(window.innerWidth);
  });
},[]);
    return { screenWidth };
}

export default useScreenSize;