import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer id="disclaimer" className="w-full border-t border-surface-border bg-surface-deep/60 py-8 px-6 text-center text-xs text-gray-500 space-y-3 select-none">
      <div className="max-w-4xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 text-gray-400 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Legal Disclaimer & Official Embed Policy</span>
        </div>
        <p className="leading-relaxed">
          {t('disclaimer')}
        </p>
        <div className="pt-2 flex items-center justify-center gap-4 text-gray-400">
          <a
            href="https://github.com/sercanvr/ragetv"
            target="_blank"
            rel="noreferrer"
            className="hover:text-brand transition-colors inline-flex items-center gap-1"
          >
            GitHub Repository <ExternalLink className="w-3 h-3" />
          </a>
          <span>•</span>
          <a
            href="https://github.com/sercanvr/ragetv/issues"
            target="_blank"
            rel="noreferrer"
            className="hover:text-brand transition-colors inline-flex items-center gap-1"
          >
            Takedown Requests <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </footer>
  );
};
