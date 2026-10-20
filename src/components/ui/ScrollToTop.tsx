import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

interface ScrollToTopProps {
  scrollRef?: React.RefObject<HTMLDivElement | null>;
}

export const ScrollToTop: React.FC<ScrollToTopProps> = ({ scrollRef }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const target = scrollRef?.current || window;

    const handleScroll = () => {
      const top = scrollRef?.current
        ? scrollRef.current.scrollTop
        : window.scrollY || document.documentElement.scrollTop;
      setIsVisible(top > 180);
    };

    target.addEventListener('scroll', handleScroll, { passive: true });
    return () => target.removeEventListener('scroll', handleScroll);
  }, [scrollRef]);

  const scrollToTop = () => {
    if (scrollRef?.current) {
      scrollRef.current.scrollTop = 0;
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    }
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 p-2.5 rounded-xl bg-brand hover:bg-brand-hover text-white shadow-brand-glow transition-transform active:scale-90 flex items-center justify-center border border-white/20 select-none"
      title="En Üste Çık"
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-5 h-5 stroke-[2.5]" />
    </button>
  );
};
