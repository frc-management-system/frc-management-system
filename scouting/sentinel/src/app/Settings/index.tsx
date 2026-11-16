import { useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Button, Card, Surface, useTheme } from 'react-native-paper';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFileManager } from '../../../hooks/useFileManager';
import { globalStyles } from '../../styles/globalStyles';

export default function Settings() {
const theme = useTheme();
const router = useRouter();
const insets = useSafeAreaInsets();
const fileManager = useFileManager();

    return (
        <SafeAreaView>
            <Surface style={globalStyles.container}>
                <Card mode='contained' style={{width: "100%"}}>
                    <Card.Actions style={{justifyContent: 'center', alignItems:'center'}}>
                        <Button>
                            Manually add asset file
                        </Button>
                    </Card.Actions>
                </Card>
            </Surface>
        </SafeAreaView>
        
    );
    
}

const styles = StyleSheet.create({
  button: {
    margin: 10
  }
});