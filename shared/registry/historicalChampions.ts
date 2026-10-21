export interface HistoricalChampion {
  year: number;
  teamName: string;
  tournament: string;
  logoUrl: string;
}

export const HISTORICAL_CHAMPIONS: Record<string, HistoricalChampion[]> = {
  cs2: [
    { year: 2026, teamName: 'Natus Vincere', tournament: 'PGL CS2 World Championship', logoUrl: '/teams/navi.svg' },
    { year: 2025, teamName: 'Team Vitality', tournament: 'Perfect World Shanghai Major', logoUrl: '/teams/vitality.svg' },
    { year: 2024, teamName: 'Natus Vincere', tournament: 'PGL Major Copenhagen', logoUrl: '/teams/navi.svg' },
    { year: 2023, teamName: 'Team Vitality', tournament: 'BLAST.tv Paris Major', logoUrl: '/teams/vitality.svg' },
    { year: 2022, teamName: 'FaZe Clan', tournament: 'PGL Major Antwerp', logoUrl: '/teams/faze.svg' },
    { year: 2021, teamName: 'Natus Vincere', tournament: 'PGL Major Stockholm', logoUrl: '/teams/navi.svg' },
    { year: 2019, teamName: 'Astralis', tournament: 'StarLadder Berlin Major', logoUrl: '/teams/astralis.svg' },
    { year: 2018, teamName: 'Cloud9', tournament: 'ELEAGUE Major Boston', logoUrl: '/teams/sen.svg' },
    { year: 2017, teamName: 'Astralis', tournament: 'ELEAGUE Major Atlanta', logoUrl: '/teams/astralis.svg' },
    { year: 2016, teamName: 'SK Gaming', tournament: 'ESL One Cologne', logoUrl: '/teams/liquid.svg' },
    { year: 2015, teamName: 'Fnatic', tournament: 'ESL One Cologne', logoUrl: '/teams/fnatic.svg' },
    { year: 2014, teamName: 'Virtus.pro', tournament: 'EMS One Katowice', logoUrl: '/teams/spirit.svg' },
    { year: 2013, teamName: 'Fnatic', tournament: 'DreamHack Winter', logoUrl: '/teams/fnatic.svg' },
  ],
  valorant: [
    { year: 2026, teamName: 'EDward Gaming', tournament: 'VCT Champions Paris', logoUrl: '/teams/edg.svg' },
    { year: 2025, teamName: 'Sentinels', tournament: 'VCT Champions Tokyo', logoUrl: '/teams/sen.svg' },
    { year: 2024, teamName: 'EDward Gaming', tournament: 'VCT Champions Seoul', logoUrl: '/teams/edg.svg' },
    { year: 2023, teamName: 'Evil Geniuses', tournament: 'VCT Champions Los Angeles', logoUrl: '/teams/geng.svg' },
    { year: 2022, teamName: 'LOUD', tournament: 'VCT Champions Istanbul', logoUrl: '/teams/loud.svg' },
    { year: 2021, teamName: 'Acend', tournament: 'VCT Champions Berlin', logoUrl: '/teams/heretics.svg' },
  ],
  lol: [
    { year: 2026, teamName: 'T1', tournament: 'LoL World Championship', logoUrl: '/teams/t1.svg' },
    { year: 2025, teamName: 'Bilibili Gaming', tournament: 'LoL World Championship', logoUrl: '/teams/blg.svg' },
    { year: 2024, teamName: 'T1', tournament: 'Worlds London Grand Finals', logoUrl: '/teams/t1.svg' },
    { year: 2023, teamName: 'T1', tournament: 'Worlds Seoul Grand Finals', logoUrl: '/teams/t1.svg' },
    { year: 2022, teamName: 'DRX', tournament: 'Worlds San Francisco', logoUrl: '/teams/geng.svg' },
    { year: 2021, teamName: 'EDward Gaming', tournament: 'Worlds Reykjavik', logoUrl: '/teams/edg.svg' },
    { year: 2020, teamName: 'DAMWON Gaming', tournament: 'Worlds Shanghai', logoUrl: '/teams/t1.svg' },
    { year: 2019, teamName: 'FunPlus Phoenix', tournament: 'Worlds Paris', logoUrl: '/teams/edg.svg' },
    { year: 2018, teamName: 'Invictus Gaming', tournament: 'Worlds Incheon', logoUrl: '/teams/blg.svg' },
    { year: 2017, teamName: 'Samsung Galaxy', tournament: 'Worlds Beijing', logoUrl: '/teams/geng.svg' },
    { year: 2016, teamName: 'SK Telecom T1', tournament: 'Worlds Los Angeles', logoUrl: '/teams/t1.svg' },
    { year: 2015, teamName: 'SK Telecom T1', tournament: 'Worlds Berlin', logoUrl: '/teams/t1.svg' },
    { year: 2014, teamName: 'Samsung White', tournament: 'Worlds Seoul', logoUrl: '/teams/geng.svg' },
    { year: 2013, teamName: 'SK Telecom T1', tournament: 'Worlds Los Angeles', logoUrl: '/teams/t1.svg' },
    { year: 2012, teamName: 'Taipei Assassins', tournament: 'Worlds Los Angeles', logoUrl: '/teams/t1.svg' },
    { year: 2011, teamName: 'Fnatic', tournament: 'Season 1 World Championship', logoUrl: '/teams/fnatic.svg' },
  ],
  dota2: [
    { year: 2026, teamName: 'Team Liquid', tournament: 'The International', logoUrl: '/teams/liquid.svg' },
    { year: 2025, teamName: 'Gaimin Gladiators', tournament: 'The International', logoUrl: '/teams/gg.svg' },
    { year: 2024, teamName: 'Team Liquid', tournament: 'The International Copenhagen', logoUrl: '/teams/liquid.svg' },
    { year: 2023, teamName: 'Team Spirit', tournament: 'The International Seattle', logoUrl: '/teams/spirit.svg' },
    { year: 2022, teamName: 'Tundra Esports', tournament: 'The International Singapore', logoUrl: '/teams/g2.svg' },
    { year: 2021, teamName: 'Team Spirit', tournament: 'The International Bucharest', logoUrl: '/teams/spirit.svg' },
    { year: 2019, teamName: 'OG Esports', tournament: 'The International Shanghai', logoUrl: '/teams/t1.svg' },
    { year: 2018, teamName: 'OG Esports', tournament: 'The International Vancouver', logoUrl: '/teams/t1.svg' },
    { year: 2017, teamName: 'Team Liquid', tournament: 'The International Seattle', logoUrl: '/teams/liquid.svg' },
    { year: 2016, teamName: 'Wings Gaming', tournament: 'The International Seattle', logoUrl: '/teams/blg.svg' },
    { year: 2015, teamName: 'Evil Geniuses', tournament: 'The International Seattle', logoUrl: '/teams/geng.svg' },
    { year: 2014, teamName: 'Newbee', tournament: 'The International Seattle', logoUrl: '/teams/edg.svg' },
    { year: 2013, teamName: 'Alliance', tournament: 'The International Seattle', logoUrl: '/teams/astralis.svg' },
    { year: 2012, teamName: 'Invictus Gaming', tournament: 'The International Seattle', logoUrl: '/teams/blg.svg' },
    { year: 2011, teamName: 'Natus Vincere', tournament: 'The International Cologne', logoUrl: '/teams/navi.svg' },
  ],
  pubg: [
    { year: 2026, teamName: 'Twisted Minds', tournament: 'PGS 7 Grand Finals', logoUrl: '/teams/twisted.svg' },
    { year: 2025, teamName: 'Soniqs', tournament: 'PUBG Global Championship', logoUrl: '/teams/soniqs.svg' },
    { year: 2024, teamName: 'Twisted Minds', tournament: 'PGS 6 Grand Finals', logoUrl: '/teams/twisted.svg' },
    { year: 2023, teamName: 'Danawa e-sports', tournament: 'PUBG Global Championship Bangkok', logoUrl: '/teams/danawa.svg' },
    { year: 2022, teamName: 'Natus Vincere', tournament: 'PUBG Global Championship Dubai', logoUrl: '/teams/navi.svg' },
    { year: 2021, teamName: 'NewHappy', tournament: 'PUBG Global Championship Incheon', logoUrl: '/teams/blg.svg' },
    { year: 2019, teamName: 'Gen.G Esports', tournament: 'PUBG Global Championship Oakland', logoUrl: '/teams/geng.svg' },
    { year: 2018, teamName: 'Gen.G Gold', tournament: 'PUBG Global Invitational Berlin', logoUrl: '/teams/geng.svg' },
  ],
};

export function getHistoricalChampions(gameSlug: string): HistoricalChampion[] {
  return HISTORICAL_CHAMPIONS[gameSlug] || HISTORICAL_CHAMPIONS['cs2'] || [];
}
