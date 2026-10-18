import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tv, Globe, Shield } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

export const MobileBottomNav: React.FC = () => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'tr' : i18n.language === 'tr' ? 'de' : 'en';
    i18n.changeLanguage(nextLang);
    localStorage.setItem('ragetv_locale', nextLang);
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface-deep/95 backdrop-blur-md border-t border-surface-border flex items-center justify-around px-2 z-40">
      <NavLink
        to="/cs2"
        className={({ isActive }) =>
          cn(
            'flex flex-col items-center gap-1 text-[11px] font-medium transition-colors',
            isActive ? 'text-brand' : 'text-gray-400 hover:text-white'
          )
        }
      >
        <Tv className="w-5 h-5" />
        <span>{t('nav.home')}</span>
      </NavLink>

      <button
        onClick={toggleLanguage}
        className="flex flex-col items-center gap-1 text-[11px] font-medium text-gray-400 hover:text-white transition-colors"
      >
        <Globe className="w-5 h-5 text-brand" />
        <span className="uppercase font-semibold">{i18n.language}</span>
      </button>

      <a
        href="#disclaimer"
        className="flex flex-col items-center gap-1 text-[11px] font-medium text-gray-400 hover:text-white transition-colors"
      >
        <Shield className="w-5 h-5" />
        <span>Legal</span>
      </a>
    </nav>
  );
};
