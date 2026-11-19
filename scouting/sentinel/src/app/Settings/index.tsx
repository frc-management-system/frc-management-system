import { useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Button, Card, Surface, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFileManager } from '../../../hooks/useFileManager';
import { globalStyles } from '../../styles/globalStyles';

export default function Settings() {
const theme = useTheme();
const router = useRouter();
const insets = useSafeAreaInsets();
const fileManager = useFileManager();

    return (
        <Surface style={{...globalStyles.container, paddingTop: insets.top, paddingBottom: insets.bottom}}>
            <Card mode='contained' style={{flex:1, width: "100%"}}>
                <Card.Actions style={{justifyContent: 'center', alignItems:'center'}}>
                    <Button
                        mode='contained'
                        onPress={(): void => {
                            fileManager.manuallyAddAssetFile();
                        }}
                    >
                        Manually add asset file
                    </Button>
                </Card.Actions>
            </Card>
        </Surface>
        
    );
    
}

const styles = StyleSheet.create({
  button: {
    margin: 10
  }
});