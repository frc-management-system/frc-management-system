import React, { Context, createContext, useContext } from 'react';
import { Match, MatchInfo } from '../types/MatchScoutTypes';

const matchDefault: MatchScout = {
    matchInfo: {
        alliance: '',
        alliancePosition:'',
        event: '',
        matches: [],
        scouterList: [],
        logEvents:[]
    },
    load: loadMatchInfo,
    nextMatch: setNextMatch,
    edit: editMatchInfo
}

export interface MatchScout{
    matchInfo: MatchInfo;
    load: LoadMatchInfoType;
    nextMatch: SetNextMatch;
    edit: EditMatchInfo;
}

const MatchContext: Context<MatchScout> = createContext<MatchScout>(matchDefault);

export const useMatchInfo: () => MatchScout = (): MatchScout => {
  return useContext<MatchScout>(MatchContext);
};

export function MatchScoutProvider({children}: React.PropsWithChildren){

    return (
        <MatchContext.Provider value={matchDefault}>
                {children}
        </MatchContext.Provider>
    );
}

type LoadMatchInfoType = (loadData:string, matchNumber: number) => MatchInfo;
function loadMatchInfo(loadData: string, matchNumber: number): MatchInfo {
    const inputMatchInfo = JSON.parse(loadData ?? '');

    const newMatchInfo: MatchInfo = {
        event: inputMatchInfo.e,
        alliance: inputMatchInfo.a,
        alliancePosition: inputMatchInfo.ap,
        matches: [],
        scouterList: [],
        logEvents: []
    };

    newMatchInfo.matches = inputMatchInfo.m.map(
        (inputMatch: {m: number, t: number, s: string}): Match => ({
            matchNum: inputMatch.m,
            teamNum: inputMatch.t,
            scouter: inputMatch.s,
        })
    );

    newMatchInfo.scouterList = [...new Set<string>(inputMatchInfo.m.map((item: {m:number, t:number, s:string}) => item.s))]

    const currMatch: Match | undefined = newMatchInfo.matches.find(
        (x: Match): boolean => x.matchNum === (matchNumber ?? 0)
    );

    if (currMatch === undefined) {
        newMatchInfo.currentMatch = newMatchInfo.matches[0];
    } else {
        newMatchInfo.currentMatch = currMatch;
    }

    return newMatchInfo;
}

type SetNextMatch = (matchInfo: MatchInfo) => MatchInfo;
function setNextMatch(matchInfo: MatchInfo): MatchInfo {
    const nextMatch: Match | undefined = matchInfo.matches.find(
        (x: Match) => x.matchNum === (matchInfo.currentMatch?.matchNum ?? 0) + 1
    );
    matchInfo.currentMatch = nextMatch;
    return matchInfo;
}

type EditMatchInfo = (matchInfo: MatchInfo, scouter: string, match: number) => MatchInfo;
function editMatchInfo(matchInfo: MatchInfo, scouter:string, match: number): MatchInfo {
    const selectedMatch: Match | undefined = matchInfo.matches.find(
        (x: Match) => x.matchNum === (match ?? 0)
    );
    if (selectedMatch) {
        selectedMatch.scouter = scouter ?? selectedMatch.scouter;
    }
    matchInfo.currentMatch = selectedMatch ?? matchInfo.currentMatch;
    return matchInfo;
}