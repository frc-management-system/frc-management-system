import React, { Context, createContext, Dispatch, useContext, useReducer } from 'react';
import { Match, MatchInfo, MatchScoutAction } from '../types/MatchScoutTypes';

const matchDefault: MatchInfo = {
    alliance: '',
    alliancePosition:'',
    event: '',
    matches: [],
    scouterList: [],
    logEvents:[]
}

const MatchContext: Context<MatchInfo> = createContext<MatchInfo>(matchDefault);
const MatchDispatchContext: Context<Dispatch<MatchScoutAction>> = 
    createContext<Dispatch<MatchScoutAction>>(() => {});

export const useMatchInfo: () => MatchInfo = (): MatchInfo => {
  return useContext<MatchInfo>(MatchContext);
};

export const useMatchInfoDispatch: () => Dispatch<MatchScoutAction> =
  (): Dispatch<MatchScoutAction> => {
    return useContext<Dispatch<MatchScoutAction>>(MatchDispatchContext);
};

export function MatchScoutProvider({children}: React.PropsWithChildren){
    const [log,dispatch] = useReducer(
        MatchScoutReducer,
        matchDefault
    )

    return (
        <MatchContext.Provider value={log}>
            <MatchDispatchContext.Provider value={dispatch}>
                {children}
            </MatchDispatchContext.Provider>
        </MatchContext.Provider>
    );
}

export const MatchScoutReducer: React.Reducer<MatchInfo,MatchScoutAction> = (
    matchInfo: MatchInfo, 
    action: MatchScoutAction
): MatchInfo => {
    switch(action.type) {
        case "load":
            const inputMatchInfo = JSON.parse(action.loadData ?? '');

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
                (x: Match): boolean => x.matchNum === (action?.matchNum ?? 0)
            );

            if (currMatch === undefined) {
                newMatchInfo.currentMatch = newMatchInfo.matches[0];
            } else {
                newMatchInfo.currentMatch = currMatch;
            }

            return newMatchInfo;
        
        case "nextMatch":
            const nextMatch: Match | undefined = matchInfo.matches.find(
                (x: Match) => x.matchNum === (matchInfo.currentMatch?.matchNum ?? 0) + 1
            );
            matchInfo.currentMatch = nextMatch;
            return matchInfo;

        case "edit":
            const selectedMatch: Match | undefined = matchInfo.matches.find(
                (x: Match) => x.matchNum === (action.editData?.matchNum ?? 0)
            );
            if (selectedMatch) {
                selectedMatch.scouter = action.editData?.scouter ?? selectedMatch.scouter;
            }
            matchInfo.currentMatch = selectedMatch ?? matchInfo.currentMatch;
            return matchInfo;
    }
};