import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { Trophy, Check, Award, ShieldCheck, Sparkles } from 'lucide-react';
import { getHistoricalChampions, HistoricalChampion } from '@shared/registry/historicalChampions';
import { cn } from '@/lib/utils';

interface HistoricalChampionsProps {
  gameSlug: string;
}

interface ChampionCardProps {
  champion: HistoricalChampion;
  enableAnimations?: boolean;
}

const ChampionCard: React.FC<ChampionCardProps> = ({ champion, enableAnimations = true }) => {
  const shouldReduceMotion = useReducedMotion();
  const shouldAnimate = enableAnimations && !shouldReduceMotion;

  const containerVariants: Variants = {
    rest: {
      scale: 1,
      y: 0,
      filter: 'blur(0px)',
    },
    hover: shouldAnimate
      ? {
          scale: 1.02,
          y: -4,
          filter: 'blur(0px)',
          transition: {
            type: 'spring',
            stiffness: 400,
            damping: 28,
            mass: 0.6,
          },
        }
      : {},
  };

  const imageVariants: Variants = {
    rest: { scale: 1 },
    hover: { scale: 1.06 },
  };

  const contentVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: 'blur(4px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 28,
        mass: 0.6,
        staggerChildren: 0.06,
        delayChildren: 0.08,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 12,
      scale: 0.96,
      filter: 'blur(2px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 25,
        mass: 0.5,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 8,
        stiffness: 200,
        mass: 0.8,
      },
    },
  };

  return (
    <motion.div
      data-slot="profile-hover-card"
      initial="rest"
      whileHover="hover"
      variants={containerVariants}
      className={cn(
        'group relative h-[380px] w-full cursor-pointer overflow-hidden rounded-[24px] border border-[#d8d3c7] text-[#171717] shadow-[inset_0_7px_14px_rgba(255,255,255,0.18),0_18px_34px_-16px_rgba(55,47,36,0.35)] backdrop-blur-sm dark:border-[#1e1e1e] dark:text-[#ededed] dark:shadow-[inset_0_7px_14px_rgba(255,255,255,0.03),0_18px_34px_-16px_rgba(0,0,0,0.9)] bg-gradient-to-b from-surface-card via-surface-card/90 to-surface-deep flex flex-col justify-between'
      )}
    >
      {/* Top Year & Badge Indicator */}
      <div className="relative z-10 p-5 flex items-center justify-between">
        <span className="font-display text-xs font-black tracking-widest text-[#D84040] uppercase bg-[#D84040]/15 px-3 py-1 rounded-full border border-[#D84040]/30 shadow-sm flex items-center gap-1.5">
          <Sparkles className="w-3 h-3" />
          <span>{champion.year}</span>
        </span>
        <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-muted-foreground bg-black/30 dark:bg-black/50 px-2.5 py-1 rounded-full border border-surface-border">
          GRAND FINALS
        </span>
      </div>

      {/* Atmospheric Background Watermark Logo with Spring Scale */}
      <div className="absolute inset-0 flex items-center justify-center p-8 overflow-hidden pointer-events-none">
        <motion.img
          src={champion.logoUrl}
          alt={champion.teamName}
          className="w-48 h-48 object-contain opacity-10 dark:opacity-15 filter blur-[0.5px] select-none"
          variants={imageVariants}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      </div>

      {/* Center Hero Team Logo inside Liquid Glass Shield */}
      <div className="relative z-10 flex-1 flex items-center justify-center -mt-4">
        <motion.div
          className="w-24 h-24 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 dark:border-white/5 p-3.5 flex items-center justify-center shadow-xl group-hover:border-[#D84040]/40 transition-colors"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          <img
            src={champion.logoUrl}
            alt={champion.teamName}
            className="w-full h-full object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
          />
        </motion.div>
      </div>

      {/* Smooth Blur Overlay - Multiple layers for seamless fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 via-background/20 via-background/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background/90 via-background/60 via-background/30 via-background/15 via-background/8 to-transparent backdrop-blur-[1px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/85 via-background/40 to-transparent backdrop-blur-sm pointer-events-none" />

      {/* Content Section at Bottom */}
      <motion.div
        variants={contentVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 p-5 pt-0 space-y-3"
      >
        {/* Name and Verification Checkmark */}
        <motion.div variants={itemVariants} className="flex items-center gap-2">
          <motion.h4
            className="text-lg sm:text-xl font-bold text-foreground truncate"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.02,
                },
              },
            }}
          >
            {champion.teamName.split('').map((letter, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                className="inline-block"
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </motion.h4>

          <motion.div
            variants={itemVariants}
            className="flex h-4 w-4 items-center justify-center rounded-full bg-[#ec5c13] text-[#080808] shrink-0"
            whileHover={{
              scale: 1.15,
              rotate: 5,
              transition: { type: 'spring', stiffness: 400, damping: 20 },
            }}
            title="Resmi Espor Şampiyonu"
          >
            <Check className="w-2.5 h-2.5" />
          </motion.div>
        </motion.div>

        {/* Description: Tournament Details */}
        <motion.p
          variants={itemVariants}
          className="text-muted-foreground text-xs leading-relaxed line-clamp-1"
        >
          {champion.tournament}
        </motion.p>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-4 pt-1 text-xs text-muted-foreground"
        >
          <div className="flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold text-foreground">#1</span>
            <span className="text-[11px]">Şampiyon</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D84040]" />
            <span className="font-semibold text-foreground">{champion.year}</span>
            <span className="text-[11px]">Sezonu</span>
          </div>
        </motion.div>

        {/* Action Button */}
        <motion.div variants={itemVariants}>
          <div className="w-full py-2 px-3 rounded-xl text-xs font-semibold bg-[#D84040] hover:bg-[#E85252] text-white shadow-md transition-all flex items-center justify-center gap-1.5">
            <Award className="w-3.5 h-3.5" />
            <span>Resmi Şampiyon Detayı</span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export const HistoricalChampions: React.FC<HistoricalChampionsProps> = ({ gameSlug }) => {
  const { t } = useTranslation();
  const champions = getHistoricalChampions(gameSlug);
  if (!champions || champions.length === 0) return null;

  const firstYear = champions[champions.length - 1]?.year || 2014;
  const latestYear = champions[0]?.year || 2026;

  return (
    <section className="w-full space-y-4 pt-3">
      {/* Title & Date Range Indicator */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-400" />
          <h3 className="font-display text-sm sm:text-base font-bold uppercase tracking-wider text-foreground">
            {t('champions.title')} ({latestYear} — {firstYear})
          </h3>
        </div>
        <span className="text-xs font-mono text-muted-foreground">
          {t('champions.subtitle')}
        </span>
      </div>

      {/* Downward Wrapping Champions Grid with Responsive ProfileHoverCard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 sm:gap-6">
        {champions.map((item) => (
          <ChampionCard key={`${item.year}-${item.teamName}`} champion={item} />
        ))}
      </div>
    </section>
  );
};
