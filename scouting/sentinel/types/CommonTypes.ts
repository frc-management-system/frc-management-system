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

export type TDenseLog = {
  t: number; // teamNum
  m: number; // matchNum
  e: Record<string, any>[]; // events
  s: string; // scouter
  a: 'RED' | 'BLUE' | ''; // alliance
  p: '1' | '2' | '3' | ''; // alliancePos
};

export type TFileManager = {
  createBaseDirs: () => Promise<void>;
  unzipAssignment: (assignmentB64: string) => Promise<string>;
  unzipB64: (inputB64: string, outFilePath: string, fileName: string) => Promise<string>;
  //saveLog: <eventType>(log: TLog<eventType>) => Promise<string>;
  getZippedLog: (path: string) => Promise<string>;
  getEventLogInfo: (eventName: string) => Promise<{ name: string; path: string }[]>;
  getLogStructure: () => Promise<TLogStructure>;
  deleteFile: (path: string) => Promise<void>;
  getLastMatchNumber: (eventName: string) => Promise<number>;
};