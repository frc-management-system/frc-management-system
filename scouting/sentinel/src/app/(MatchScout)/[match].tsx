import { View } from 'react-native';
import { DynamicRenderer } from '../../../components/DynamicRenderer';
import { getScreenComponent } from '../../../helpers/jsonScreenConfigs';
import { ComponentSchema } from '../../../types/ComponentTypes';

export default function CustomScreen(): React.JSX.Element {


    const screenComponents: ComponentSchema = getScreenComponent("auto");

    return(
        <View style={{display: 'flex'}}>
            <DynamicRenderer config={screenComponents} />
        </View>
    );

}