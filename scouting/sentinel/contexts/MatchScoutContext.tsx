import { createContext, ReactNode, useContext, useState } from 'react';
import { Match, MatchInfo } from '../types/MatchScoutTypes';

export interface MatchScout{
    matchInfo: MatchInfo;
    robotState:{},
    load: LoadMatchInfoType;
    nextMatch: SetNextMatch;
    edit: EditMatchInfo;
    increment: IncrementRobotStateField;
    updateRadio: ChangeRadioButtonState;
}

export interface MatchScoutContextType{
    currentMatchState: MatchScout
}

type LoadMatchInfoType = (loadData:string, matchNumber: number, robotState: {}) => void;
type SetNextMatch = (matchInfo: MatchInfo) => MatchInfo;
type EditMatchInfo = (matchInfo: MatchInfo, scouter: string, match: number) => MatchInfo;
type IncrementRobotStateField = (field: string) => void;
type ChangeRadioButtonState = (field: string) => void;

const MatchContext = createContext<MatchScoutContextType>({currentMatchState: {} as MatchScout});

export const useMatchInfo = () => {
    const context = useContext(MatchContext);
    if (!context) {
        throw new Error('useMatchInfo must be used within a MatchScoutProvider');
    }
    return context;
};

export function MatchScoutProvider({children}: {children: ReactNode}){    
    const [matchInfo, setMatchInfo] = useState<MatchInfo>({
        alliance: '',
        alliancePosition:'',
        event: '',
        matches: [],
        scouterList: [],
        logEvents:[],
    });
    const [robotState, setRobotState] = useState<Object>({});
    
    function loadMatchInfo(loadData: string, matchNumber: number, initialRobotState: {}): void {
        const inputMatchInfo = JSON.parse(loadData ?? '');

        const newMatchInfo: MatchInfo = {
            event: inputMatchInfo.e,
            alliance: inputMatchInfo.a,
            alliancePosition: inputMatchInfo.ap,
            matches: [],
            scouterList: [],
            logEvents: [],
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

        //newMatchInfo.robotState = robotState;

        setMatchInfo(newMatchInfo);
        setRobotState(initialRobotState);
    };

    function setNextMatch(matchInfo: MatchInfo): MatchInfo {
        const nextMatch: Match | undefined = matchInfo.matches.find(
            (x: Match) => x.matchNum === (matchInfo.currentMatch?.matchNum ?? 0) + 1
        );
        matchInfo.currentMatch = nextMatch;
        return matchInfo;
    };

    function editMatchInfo(matchInfo: MatchInfo, scouter:string, match: number): MatchInfo {
        const selectedMatch: Match | undefined = matchInfo.matches.find(
            (x: Match) => x.matchNum === (match ?? 0)
        );
        if (selectedMatch) {
            selectedMatch.scouter = scouter ?? selectedMatch.scouter;
        }
        matchInfo.currentMatch = selectedMatch ?? matchInfo.currentMatch;
        return matchInfo;
    };

    function incrementRobotStateField(field: string): void {
        //need to add check that the field is a number
        const currentFieldValue: number = currentMatchState.robotState[field as keyof typeof currentMatchState.robotState];
        const currentRobotState = {...currentMatchState.robotState}
        //setCurrentMatchState({...currentMatchState, matchInfo: {...currentMatchState.matchInfo, robotState:{...currentRobotState, [field]: currentFieldValue +1}}});
    };

    function updateRadioButtonStatus(field: string): void {
        console.log("context robot state:", currentMatchState.robotState);
        const currentRobotState = {...currentMatchState.robotState};
        const currentRadioState: string = currentMatchState.robotState[field as keyof typeof currentMatchState.robotState];
        //currentRobotState[field as keyof typeof currentMatchState.matchInfo.robotState] =  currentRadioState == "unchecked" ? "checked" : "unchecked";
        //setCurrentMatchState({...currentMatchState, matchInfo: {...currentMatchState.matchInfo, robotState:{...currentRobotState, [field]: currentRadioState==="unchecked" ? "checked" : "unchecked"}}});

        setRobotState(oldRobotState => ({...oldRobotState, [field]: currentRadioState == "unchecked" ? "checked" : "unchecked"}));
    };
    
    
    const currentMatchState: MatchScout = {
        matchInfo,
        robotState,
        load: loadMatchInfo,
        nextMatch: setNextMatch,
        edit: editMatchInfo,
        increment : incrementRobotStateField,
        updateRadio: updateRadioButtonStatus
    };
    
    return (
        <MatchContext.Provider value={{currentMatchState}}>
                {children}
        </MatchContext.Provider>
    );
}



