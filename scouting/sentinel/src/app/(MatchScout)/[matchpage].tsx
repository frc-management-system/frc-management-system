import { useLocalSearchParams, useRouter } from 'expo-router';
import { Surface, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DynamicRenderer } from '../../../components/DynamicRenderer';
import ScreenNavigation from '../../../components/ScreenNavigation';
import { useMatchInfo } from '../../../contexts/MatchScoutContext';
import { getScreenComponent } from '../../../helpers/jsonScreenConfigs';
import { useFileManager } from '../../../hooks/useFileManager';
import { EventProps } from '../../../types/CommonTypes';
import { ComponentSchema } from '../../../types/ComponentTypes';

export default function CustomScreen(): React.JSX.Element {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const theme = useTheme();
    const { currentMatchState } = useMatchInfo();
    const fileManager = useFileManager();
    const { matchpage } = useLocalSearchParams();


    const screenComponents: ComponentSchema = getScreenComponent('match', Number(matchpage));

    function onSubmitClick(events:EventProps[]): void {
        currentMatchState.handleEvent(events);
        fileManager.saveMatchScoutLog(currentMatchState).then(
                            result => { 
                                currentMatchState.nextMatch();
                                router.dismissTo({pathname: '/MatchQRShow', params:{filePath: result, returnRoute: '/(MatchScout)/0', returnText: 'Next Match'}})
                    })
    }

    function onStartClick(events:EventProps[]): void {
        currentMatchState.handleEvent(events);
        router.dismissTo({pathname: '/(MatchScout)/[matchpage]', params:{matchpage: '1'}})
    }


    return(
        <Surface style={{display: 'flex', flex: 1, flexWrap:'wrap', paddingTop: insets.top, paddingBottom: insets.bottom}}>
            <DynamicRenderer config={screenComponents} />
            <Surface style={{display: 'flex', flexDirection:"row", alignContent: "space-between"}}>
                <ScreenNavigation scoutType='match' page={matchpage as string} baseRoute='/[matchpage]' onStartClick={onStartClick} onSubmitClick={onSubmitClick}/>
            </Surface>
        </Surface>
    );

};
