import { MatchScout } from "../contexts/MatchScoutContext";

export type TLogStructure = {
  [event: string]: {
    name: string;
    path: string;
  }[];
};

export type TLog<event> = {
  teamNum: number;
  matchNum: number;
  events: Partial<event>[];
  scouter: string;
  alliance: 'RED' | 'BLUE' | '';
  alliancePos: '1' | '2' | '3' | '';
};


export type TFileManager = {
  createBaseDirs: () => void;
  saveMatchScoutLog: (context: MatchScout) => Promise<string>;
  getZippedLog: (path: string) => Promise<string>;
  getEventLogInfo: (eventName: string, scoutType: 'MatchScout' | 'QualitativeScout' | 'PitScout') => Promise<{ name: string; path: string }[]>;
  getLogStructure: (scoutType: 'MatchScout' | 'QualitativeScout' | 'PitScout') => Promise<TLogStructure>;
  deleteFile: (path: string) => void;
  getLastMatchNumber: (eventName: string, scoutType: 'MatchScout' | 'QualitativeScout' | 'PitScout') => Promise<number>;
  unzipAssignment: (assignmentB64: string) => Promise<string>;
  unzipB64: (inputB64: string, outFilePath: string, fileName: string) => Promise<string>;
};

export type EventProps = {
    eventType: string,
    field: string,
    logCurrentRobotState: boolean,
    newValue?: string | number
};