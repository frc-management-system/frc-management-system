
export type Match = {
  matchNum: number;
  teamNum: number;
  scouter: string;
};

export interface MatchInfo  {
    alliance: 'RED' | 'BLUE' | '',
    alliancePosition: '1' | '2' | '3' | '',
    event: string,
    matches: Match[],
    currentMatch?: Match,
    scouterList: string[],
    logEvents:[]
};

