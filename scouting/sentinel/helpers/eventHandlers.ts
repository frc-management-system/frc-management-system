import { useMatchInfo } from "../contexts/MatchScoutContext";



export const handleEvent =(eventType: string, field: string, logCurrentRobotState: Boolean) =>{
    const {currentMatchState} = useMatchInfo();
        switch(eventType) {
            case "IncrementField":
                currentMatchState.increment(field);
            case "ChangeRadioStatus":
                currentMatchState.updateRadio(field);
                console.log("Button Pressed:", currentMatchState.robotState);
        }
};