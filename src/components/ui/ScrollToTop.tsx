import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

interface ScrollToTopProps {
  scrollRef?: React.RefObject<HTMLDivElement | null>;
  targetRef?: React.RefObject<HTMLDivElement | null>;
}

export const ScrollToTop: React.FC<ScrollToTopProps> = ({ scrollRef, targetRef }) => {
  const [isVisible, setIsVisible] = useState(false);
  const activeRef = targetRef || scrollRef;

  useEffect(() => {
    const target = activeRef?.current || window;

    const handleScroll = () => {
      const top = activeRef?.current
        ? activeRef.current.scrollTop
        : window.scrollY || document.documentElement.scrollTop;
      setIsVisible(top > 180);
    };

    target.addEventListener('scroll', handleScroll, { passive: true });
    return () => target.removeEventListener('scroll', handleScroll);
  }, [activeRef]);

  const scrollToTop = () => {
    if (activeRef?.current) {
      activeRef.current.scrollTop = 0;
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    }
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 sm:bottom-8 right-4 sm:right-6 lg:right-7 z-50 p-2.5 rounded-xl bg-brand hover:bg-brand-hover text-white shadow-brand-glow transition-transform active:scale-90 flex items-center justify-center border border-white/20 select-none cursor-pointer"
      title="En Üste Çık"
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-5 h-5 stroke-[2.5]" />
    </button>
  );
};
