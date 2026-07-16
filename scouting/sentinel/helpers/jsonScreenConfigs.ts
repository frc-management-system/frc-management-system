import { screens } from '../helpers/testScreens.json';
import { ComponentSchema } from '../types/ComponentTypes';

export const jsonScreens = Object.keys(screens);

export const getScreenComponent = (screenName: keyof typeof screens): ComponentSchema => {
    const screenComponents: ComponentSchema = screens[screenName].components;
    return screenComponents;
};