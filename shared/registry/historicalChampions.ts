export interface HistoricalChampion {
  year: number;
  teamName: string;
  tournament: string;
  logoUrl: string;
}

export const HISTORICAL_CHAMPIONS: Record<string, HistoricalChampion[]> = {
  cs2: [
    { year: 2025, teamName: 'Team Vitality', tournament: 'BLAST.tv Austin Major', logoUrl: '/teams/vitality.png' },
    { year: 2024, teamName: 'Natus Vincere', tournament: 'PGL Major Copenhagen', logoUrl: '/teams/navi.png' },
    { year: 2023, teamName: 'Team Vitality', tournament: 'BLAST.tv Paris Major', logoUrl: '/teams/vitality.png' },
    { year: 2022, teamName: 'FaZe Clan', tournament: 'PGL Major Antwerp', logoUrl: '/teams/faze.png' },
    { year: 2021, teamName: 'Natus Vincere', tournament: 'PGL Major Stockholm', logoUrl: '/teams/navi.png' },
    { year: 2019, teamName: 'Astralis', tournament: 'StarLadder Berlin Major', logoUrl: '/teams/astralis.png' },
    { year: 2018, teamName: 'Cloud9', tournament: 'ELEAGUE Major Boston', logoUrl: '/teams/cloud9.png' },
    { year: 2017, teamName: 'Astralis', tournament: 'ELEAGUE Major Atlanta', logoUrl: '/teams/astralis.png' },
    { year: 2016, teamName: 'SK Gaming', tournament: 'ESL One Cologne', logoUrl: '/teams/sk.png' },
    { year: 2015, teamName: 'Fnatic', tournament: 'ESL One Cologne', logoUrl: '/teams/fnatic.png' },
    { year: 2014, teamName: 'Virtus.pro', tournament: 'EMS One Katowice', logoUrl: '/teams/virtuspro.png' },
    { year: 2013, teamName: 'Fnatic', tournament: 'DreamHack Winter', logoUrl: '/teams/fnatic.png' },
  ],
  valorant: [
    { year: 2024, teamName: 'EDward Gaming', tournament: 'VCT Champions Seoul', logoUrl: '/teams/edg.png' },
    { year: 2023, teamName: 'Evil Geniuses', tournament: 'VCT Champions Los Angeles', logoUrl: '/teams/eg.png' },
    { year: 2022, teamName: 'LOUD', tournament: 'VCT Champions Istanbul', logoUrl: '/teams/loud.png' },
    { year: 2021, teamName: 'Acend', tournament: 'VCT Champions Berlin', logoUrl: '/teams/acend.png' },
  ],
  lol: [
    { year: 2025, teamName: 'T1', tournament: 'LoL World Championship', logoUrl: '/teams/t1.png' },
    { year: 2024, teamName: 'T1', tournament: 'Worlds London Grand Finals', logoUrl: '/teams/t1.png' },
    { year: 2023, teamName: 'T1', tournament: 'Worlds Seoul Grand Finals', logoUrl: '/teams/t1.png' },
    { year: 2022, teamName: 'DRX', tournament: 'Worlds San Francisco', logoUrl: '/teams/drx.png' },
    { year: 2021, teamName: 'EDward Gaming', tournament: 'Worlds Reykjavik', logoUrl: '/teams/edg.png' },
    { year: 2020, teamName: 'DAMWON Gaming', tournament: 'Worlds Shanghai', logoUrl: '/teams/dk.png' },
    { year: 2019, teamName: 'FunPlus Phoenix', tournament: 'Worlds Paris', logoUrl: '/teams/fpx.png' },
    { year: 2018, teamName: 'Invictus Gaming', tournament: 'Worlds Incheon', logoUrl: '/teams/ig.png' },
    { year: 2017, teamName: 'Samsung Galaxy', tournament: 'Worlds Beijing', logoUrl: '/teams/ssg.png' },
    { year: 2016, teamName: 'SK Telecom T1', tournament: 'Worlds Los Angeles', logoUrl: '/teams/skt.png' },
    { year: 2015, teamName: 'SK Telecom T1', tournament: 'Worlds Berlin', logoUrl: '/teams/skt.png' },
    { year: 2014, teamName: 'Samsung White', tournament: 'Worlds Seoul', logoUrl: '/teams/ssg.png' },
    { year: 2013, teamName: 'SK Telecom T1', tournament: 'Worlds Los Angeles', logoUrl: '/teams/skt.png' },
    { year: 2012, teamName: 'Taipei Assassins', tournament: 'Worlds Los Angeles', logoUrl: '/teams/t1.png' },
    { year: 2011, teamName: 'Fnatic', tournament: 'Season 1 World Championship', logoUrl: '/teams/fnatic.png' },
  ],
  dota2: [
    { year: 2025, teamName: 'Team Falcons', tournament: 'The International Hamburg', logoUrl: '/teams/falcons.png' },
    { year: 2024, teamName: 'Team Liquid', tournament: 'The International Copenhagen', logoUrl: '/teams/liquid.png' },
    { year: 2023, teamName: 'Team Spirit', tournament: 'The International Seattle', logoUrl: '/teams/spirit.png' },
    { year: 2022, teamName: 'Tundra Esports', tournament: 'The International Singapore', logoUrl: '/teams/tundra.png' },
    { year: 2021, teamName: 'Team Spirit', tournament: 'The International Bucharest', logoUrl: '/teams/spirit.png' },
    { year: 2019, teamName: 'OG Esports', tournament: 'The International Shanghai', logoUrl: '/teams/og.png' },
    { year: 2018, teamName: 'OG Esports', tournament: 'The International Vancouver', logoUrl: '/teams/og.png' },
    { year: 2017, teamName: 'Team Liquid', tournament: 'The International Seattle', logoUrl: '/teams/liquid.png' },
    { year: 2016, teamName: 'Wings Gaming', tournament: 'The International Seattle', logoUrl: '/teams/ig.png' },
    { year: 2015, teamName: 'Evil Geniuses', tournament: 'The International Seattle', logoUrl: '/teams/eg.png' },
    { year: 2014, teamName: 'Newbee', tournament: 'The International Seattle', logoUrl: '/teams/newbee.png' },
    { year: 2013, teamName: 'Alliance', tournament: 'The International Seattle', logoUrl: '/teams/alliance.png' },
    { year: 2012, teamName: 'Invictus Gaming', tournament: 'The International Seattle', logoUrl: '/teams/ig.png' },
    { year: 2011, teamName: 'Natus Vincere', tournament: 'The International Cologne', logoUrl: '/teams/navi.png' },
  ],
  pubg: [
    { year: 2024, teamName: 'The Expendables', tournament: 'PGC Grand Finals Kuala Lumpur', logoUrl: '/teams/cerberus.png' },
    { year: 2023, teamName: 'Danawa e-sports', tournament: 'PUBG Global Championship Bangkok', logoUrl: '/teams/danawa.png' },
    { year: 2022, teamName: 'Natus Vincere', tournament: 'PUBG Global Championship Dubai', logoUrl: '/teams/navi.png' },
    { year: 2021, teamName: 'NewHappy', tournament: 'PUBG Global Championship Incheon', logoUrl: '/teams/newhappy.png' },
    { year: 2019, teamName: 'Gen.G Esports', tournament: 'PUBG Global Championship Oakland', logoUrl: '/teams/geng.png' },
    { year: 2018, teamName: 'Gen.G Gold', tournament: 'PUBG Global Invitational Berlin', logoUrl: '/teams/geng.png' },
  ],
};

export function getHistoricalChampions(gameSlug: string): HistoricalChampion[] {
  return HISTORICAL_CHAMPIONS[gameSlug] || HISTORICAL_CHAMPIONS['cs2'] || [];
}
