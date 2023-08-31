import { useEffect, useRef } from "react";

export const useInfinityScroll = (onIntersectCallback: Function) => {
  const scrollTargetFooter = useRef<HTMLDivElement>(null);

  const onIntersect = ([entry]: IntersectionObserverEntry[]) => {
    if (entry.isIntersecting) {
      onIntersectCallback();
    }
  };

  useEffect(() => {
    if (!scrollTargetFooter.current) return;

    const observer = new IntersectionObserver(onIntersect, {
      threshold: 1,
    });

    observer.observe(scrollTargetFooter.current);

    return () => observer && observer.disconnect();
  }, [scrollTargetFooter.current, onIntersect]);

  return { scrollTargetFooter };
};
