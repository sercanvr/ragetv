import { Stream } from './schemas/stream';

export interface StreamSelectionPreferences {
  preferredLanguage?: string;
}

/**
 * Pure domain function to select the primary live stream for the player stage.
 * Criteria hierarchy:
 * 1. User preferred language match (boost)
 * 2. Official broadcast flag (official > co-stream/community)
 * 3. Concurrent viewer count (highest audience first)
 */
export function selectPrimaryStream(
  streams: Stream[],
  prefs?: StreamSelectionPreferences
): Stream | null {
  if (!streams || streams.length === 0) return null;

  const prefLang = prefs?.preferredLanguage?.toLowerCase();

  const sorted = [...streams].sort((a, b) => {
    // 1. Language preference match boost
    if (prefLang) {
      const aLangMatch = a.language.toLowerCase() === prefLang ? 1 : 0;
      const bLangMatch = b.language.toLowerCase() === prefLang ? 1 : 0;
      if (aLangMatch !== bLangMatch) return bLangMatch - aLangMatch;
    }

    // 2. Official stream priority (official first)
    if (a.official !== b.official) {
      return a.official ? -1 : 1;
    }

    // 3. Higher viewer count
    const aViewers = a.viewers || 0;
    const bViewers = b.viewers || 0;
    return bViewers - aViewers;
  });

  return sorted[0] || null;
}
