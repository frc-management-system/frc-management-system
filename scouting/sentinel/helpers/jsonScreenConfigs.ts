import matchNodes from '../helpers/matchscout.json';
import { ComponentSchema } from '../types/ComponentTypes';

//export const jsonScreens = Object.keys(matchNodes.screens);

export const getJsonScreens = (scoutType: string) => {
    switch (scoutType)
    {
        case 'match':
            return Object.keys(matchNodes.screens);
        default:
            return [];
    }
}

export const getScreenComponent = (scoutType: string, screenNum: number): ComponentSchema => {
    let screenComponents: ComponentSchema;
    switch (scoutType)
    {
        case 'match':
            const screenNames = Object.keys(matchNodes.screens);
            const name = screenNames[screenNum] as keyof typeof matchNodes.screens;
            screenComponents = matchNodes.screens[name].components;
            return screenComponents;
        default:
            screenComponents = {type: "none"};
            return screenComponents;
    }   
};

export const getNumberOfScreens = (scoutType: string) => {
    switch (scoutType)
    {
        case 'match':
            return Object.keys(matchNodes.screens).length;
        default:
            return 1;
    }
}

export const getInitalRobotState = (scoutType: string) => {
    switch (scoutType)
    {
        case 'match':
            return matchNodes.robotState;
        default:
            return {};
    }
};

export const getLogFields = (scoutType: string) => {
    switch (scoutType)
    {
        case 'match':
            return matchNodes.logFields;
        default:
            return [];
    }
}