import { Button, Surface, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DynamicRenderer } from '../../../components/DynamicRenderer';
import { useMatchInfo } from '../../../contexts/MatchScoutContext';
import { getScreenComponent } from '../../../helpers/jsonScreenConfigs';
import { useFileManager } from '../../../hooks/useFileManager';
import { ComponentSchema } from '../../../types/ComponentTypes';
import { globalStyles } from '../../styles/globalStyles';

export default function CustomScreen(): React.JSX.Element {
    const insets = useSafeAreaInsets();
    const theme = useTheme();
    const { currentMatchState } = useMatchInfo();
    const fileManager = useFileManager();

    const screenComponents: ComponentSchema = getScreenComponent("auto");
    

    return(
        <Surface style={{...globalStyles.container, flexDirection:"column", paddingTop: insets.top, paddingBottom: insets.bottom}}>
            <DynamicRenderer config={screenComponents} />
            <Surface style={{flexDirection:"row", flex:1, alignContent: "space-between"}}>
                <Button mode="contained" style={{flex:1, alignSelf: "flex-end", flexBasis: "100%" }} onPress={() =>fileManager.saveMatchScoutLog(currentMatchState)}>Submit</Button>
            </Surface>
        </Surface>
    );

};
