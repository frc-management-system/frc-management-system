import { createContext, ReactNode, useContext, useState } from 'react';
import { getInitalRobotState, getLogFields } from '../helpers/jsonScreenConfigs';
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
type SetNextMatch = () => void;
type EditMatchInfo = ( scouter: string, match: number) => void;
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
        currentMatch: {matchNum: 0, teamNum: 0, scouter: ''},
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
            currentMatch: {matchNum: 0, teamNum: 0, scouter: ''},
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

    function setNextMatch(): void {
        const nextMatch: Match | undefined = matchInfo.matches.find(
            (x: Match) => x.matchNum === (matchInfo.currentMatch?.matchNum ?? 0) + 1
        );
        if (nextMatch) {
            setMatchInfo( oldMatchInfo => ({...oldMatchInfo, currentMatch: nextMatch}));
            setRobotState(getInitalRobotState('match'));
            setEventLog([]);
        }
        else
        {
            const endOfMatches: Match = {matchNum: 9999, teamNum: 9999, scouter: 'endofmatches'};
            setMatchInfo( oldMatchInfo => ({...oldMatchInfo, currentMatch: endOfMatches}));
        }
    };

    function editMatchInfo( scouter:string, match: number): void {
        const selectedMatch: Match | undefined = matchInfo.matches.find(
            (x: Match) => x.matchNum === (match ?? 0)
        );
        if (selectedMatch) {
            selectedMatch.scouter = scouter ?? selectedMatch.scouter;
            setMatchInfo(oldMatchInfo => ({...oldMatchInfo, currentMatch: selectedMatch ?? oldMatchInfo.currentMatch}));
        }
        
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

    function updateStateField(field: string, newValue: string | number | boolean): void {
        const currentFieldState: string = currentMatchState.robotState[field as keyof typeof currentMatchState.robotState];
        setRobotState(oldRobotState => ({...oldRobotState, [field]: newValue}))
    }

    function handleEvent(events:EventProps[]):void {
        events.forEach((event) => {
            switch (event.eventType){
                case "ChangeRadioState":
                    updateRadioButtonStatus(event.field);
                    break;
                case "IncrementField":
                    incrementRobotStateField(event.field);
                    break;
                case "StartMatch":
                    updateStateField('actionType', 'start');
                    break;
                case "SubmitMatch":
                    updateStateField('actionType', 'endgame');
                    logEvent();
                    //setMatchInfo(setNextMatch(matchInfo));
                    console.log(matchInfo);
                    //setRobotState(getInitalRobotState('match'));
                    //setEventLog([]);
                    break;
                
            }
            if (event.logCurrentRobotState == true ) {logEvent();};
            console.log(eventLog);
        })
    };

    function logEvent(): void {
        const fieldsToLog = getLogFields('match');
        const baseEventToLog = {
            alliance: matchInfo.alliance,
            alliancePosition: matchInfo.alliancePosition,
            matchNumber: matchInfo.currentMatch?.matchNum,
            teamNumber: matchInfo.currentMatch?.teamNum,
            scouter: matchInfo.currentMatch?.scouter,
            timestamp: 0
        };
        const robotStateToLog = Object.fromEntries(Object.entries(robotState).filter(([key,value]) => fieldsToLog.includes(key)));
        const eventToLog = {...baseEventToLog, ...robotStateToLog};
        if (eventLog.length == 0){
            timer.start();
            setEventLog([...eventLog, eventToLog]);
        }
        else {
            eventToLog.timestamp = timer.getTimeSeconds();
            setEventLog([...eventLog, eventToLog]);
        }
        console.log(eventLog);
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



