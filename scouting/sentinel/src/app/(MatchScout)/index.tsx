import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Button, Card, Surface, TouchableRipple, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import QRCapture from '../../../components/QRCapture';
import { useMatchInfo } from '../../../contexts/MatchScoutContext';
import { globalStyles } from '../../styles/globalStyles';

export default function MatchScoutHome() {
const theme = useTheme();
const router = useRouter();
const insets = useSafeAreaInsets();
const scoutInfo = useMatchInfo();
const [isCameraVisible, setIsCameraVisible] = useState(false);

    return (
        <Surface style={{
            ...globalStyles.container,
            flexDirection: 'row',
            alignContent: 'flex-start',
            paddingTop: insets.top,
            paddingBottom: insets.bottom
            }}>
            <Card mode='contained' style={{flex:1}}>
                <Card.Actions style={{justifyContent: 'center', alignItems:'center'}}>
                    <Button
                        mode='contained'
                        onPress={(): void => {
                            isCameraVisible ? setIsCameraVisible(false) : setIsCameraVisible(true);
                        }}
                    >
                        Match Scouting
                    </Button>
                    <Button
                        mode='contained'
                        onPress={(): void => {
                            router.navigate('/MatchLogs');
                        }}
                    >
                        Match Logs
                    </Button>

                </Card.Actions>
            </Card>
            <Card mode='contained' style={{flex:1}}>
                <Card.Actions style={{justifyContent: 'center', alignItems:'center'}}>
                    <TouchableRipple style={{height: 400, width: 164}} onPress={() => console.log('Image pressed!')} borderless={true} rippleColor={theme.colors.primaryContainer}>
                        <Image source={require('../../../assets/images/Coral_resize.png')} style={{ flex: 1, height:400, width: 164 }} />
                    </TouchableRipple>
                </Card.Actions>
            </Card>
            <Surface style={{display: isCameraVisible ? 'flex' : 'none', flexGrow: 4, alignItems: 'center'}}>
                <QRCapture style={{height:500, width: 500}} context={scoutInfo.currentMatchState} nextPath='(MatchScout)/0' router={router} ></QRCapture>
            </Surface>
            
        </Surface>

    );
    
}

const styles = StyleSheet.create({
  button: {
    margin: 10
  }
});