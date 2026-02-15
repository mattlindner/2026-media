import { createContext, ReactNode, useEffect, useState } from "react";

export const ScreenContext = createContext(false);

export const ScreenProvider = ({ children }: { children: ReactNode }) => {
  const checkIsMobile = () =>
    window.innerWidth < 1000 ||
    /android|webOS|iphone|ipad|iPod|windows phone/i.test(navigator.userAgent);

  const [isMobile, setIsMobile] = useState(checkIsMobile());

  useEffect(() => {
    const handleScreenResize = () => setIsMobile(checkIsMobile());

    window.addEventListener("resize", handleScreenResize);
    return () => window.removeEventListener("resize", handleScreenResize);
  });

  return (
    <ScreenContext.Provider value={isMobile}>{children}</ScreenContext.Provider>
  );
};
