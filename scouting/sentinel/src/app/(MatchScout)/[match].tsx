import { View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { DynamicRenderer } from '../../../components/DynamicRenderer';
import { useMatchInfo } from '../../../contexts/MatchScoutContext';
import { handleEvent } from '../../../helpers/eventHandlers';
import { getScreenComponent } from '../../../helpers/jsonScreenConfigs';
import { ComponentSchema } from '../../../types/ComponentTypes';

export default function CustomScreen(): React.JSX.Element {

    const { currentMatchState } = useMatchInfo();

    const screenComponents: ComponentSchema = getScreenComponent("auto");
    

    return(
        <View style={{display: 'flex', alignItems: 'center'}}>
            <RadioButton value='test' status={currentMatchState.robotState.leave} onPress={() => handleEvent("ChangeRadioStatus", "leave", false)}></RadioButton>
            <DynamicRenderer config={screenComponents} />
        </View>
    );

}