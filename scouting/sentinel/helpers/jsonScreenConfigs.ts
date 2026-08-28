import { logFields, robotState, screens } from '../helpers/matchscout.json';
import { ComponentSchema } from '../types/ComponentTypes';

export const jsonScreens = Object.keys(screens);

export const getScreenComponent = (screenName: keyof typeof screens): ComponentSchema => {
    const screenComponents: ComponentSchema = screens[screenName].components;
    return screenComponents;
};

export const getInitalRobotState = () => {
    return robotState;
};

export const getLogFields = () => {
    return logFields;
}