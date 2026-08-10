import { createContext, ReactNode, useContext, useState } from 'react';
import { EventProps } from '../types/CommonTypes';
import { Match, MatchInfo } from '../types/MatchScoutTypes';
import { useTimer } from './TimerContext';

export interface MatchScout{
    matchInfo: MatchInfo;
    robotState:{},
    load: LoadMatchInfoType;
    nextMatch: SetNextMatch;
    edit: EditMatchInfo;
    handleEvent: HandleEvents;
    eventLog:Object[];
}

export interface MatchScoutContextType{
    currentMatchState: MatchScout
}

type LoadMatchInfoType = (loadData:string, matchNumber: number, robotState: {}) => void;
type SetNextMatch = (matchInfo: MatchInfo) => MatchInfo;
type EditMatchInfo = (matchInfo: MatchInfo, scouter: string, match: number) => MatchInfo;
type HandleEvents = (events: EventProps[]) => void;

const MatchContext = createContext<MatchScoutContextType>({currentMatchState: {} as MatchScout});

export const useMatchInfo = () => {
    const context = useContext(MatchContext);
    if (!context) {
        throw new Error('useMatchInfo must be used within a MatchScoutProvider');
    }
    return context;
};

export function MatchScoutProvider({children}: {children: ReactNode}){    
    const timer = useTimer();
    const [matchInfo, setMatchInfo] = useState<MatchInfo>({
        alliance: '',
        alliancePosition:'',
        event: '',
        matches: [],
        scouterList: [],
    });
    const [robotState, setRobotState] = useState<Object>({});
    const [eventLog, setEventLog] = useState<Object[]>([]);
    
    function loadMatchInfo(loadData: string, matchNumber: number, initialRobotState: {}): void {
        const inputMatchInfo = JSON.parse(loadData ?? '');

        const newMatchInfo: MatchInfo = {
            event: inputMatchInfo.e,
            alliance: inputMatchInfo.a,
            alliancePosition: inputMatchInfo.ap,
            matches: [],
            scouterList: []
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
        const currentRobotState = {...currentMatchState.robotState};
        setRobotState(oldRobotState => ({...oldRobotState, [field]: currentFieldValue +1}));
    };

    function updateRadioButtonStatus(field: string): void {
        const currentRobotState = {...currentMatchState.robotState};
        const currentRadioState: string = currentMatchState.robotState[field as keyof typeof currentMatchState.robotState];
        setRobotState(oldRobotState => ({...oldRobotState, [field]: currentRadioState == "unchecked" ? "checked" : "unchecked"}));
    };

    function handleEvent(events:EventProps[]):void {
        events.forEach((event) => {
            switch (event.eventType){
                case "ChangeRadioState":
                    updateRadioButtonStatus(event.field);
                    break;
                case "IncrementField":
                    incrementRobotStateField(event.field);
                    break;
            }
            if (event.logCurrentRobotState == true ) {logEvent();};
            console.log(currentMatchState.eventLog);
        })
    };

    function logEvent(): void {
        const eventToLog = {
            alliance: currentMatchState.matchInfo.alliance,
            alliancePosition: currentMatchState.matchInfo.alliancePosition,
            matchNumber: currentMatchState.matchInfo.currentMatch?.matchNum,
            teamNumber: currentMatchState.matchInfo.currentMatch?.teamNum,
            scouter: currentMatchState.matchInfo.currentMatch?.scouter,
            timestamp: 0,
            ...currentMatchState.robotState
        };
        if (eventLog.length == 0){
            timer.start();
            setEventLog([...currentMatchState.eventLog, eventToLog]);
        }
        else {
            eventToLog.timestamp = timer.getTimeSeconds();
            setEventLog([...currentMatchState.eventLog, eventToLog]);
        }
        console.log(currentMatchState.eventLog);
    }
    
    
    const currentMatchState: MatchScout = {
        matchInfo,
        robotState,
        load: loadMatchInfo,
        nextMatch: setNextMatch,
        edit: editMatchInfo,
        handleEvent: handleEvent,
        eventLog
    };
    
    return (
        <MatchContext.Provider value={{currentMatchState}}>
                {children}
        </MatchContext.Provider>
    );
}



