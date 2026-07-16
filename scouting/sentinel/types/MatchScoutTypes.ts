
export type Match = {
  matchNum: number;
  teamNum: number;
  scouter: string;
};

export interface MatchInfo  {
    alliance: string,
    alliancePosition: string,
    event: string,
    matches: Match[],
    currentMatch?: Match,
    scouterList: string[],
    logEvents:[]
};

export type MatchScoutAction = {
  type: "load" | "edit" | "nextMatch",
  loadData?: string;
  matchNum?: number;
  editData?: {
    scouter: string;
    matchNum: number;
  }
};
