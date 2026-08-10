import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, Surface, useTheme } from 'react-native-paper';
import QRCapture from '../../../components/QRCapture';
import { useMatchInfo } from '../../../contexts/MatchScoutContext';
import { globalStyles } from '../../styles/globalStyles';

export default function MatchScoutHome() {
const theme = useTheme();
const router = useRouter();
const scoutInfo = useMatchInfo();
const [isCameraVisible, setIsCameraVisible] = useState(false);

    return (
        <Surface style={{...globalStyles.container,alignItems:'center', justifyContent:'center'}}>
            <Card mode='contained'>
                <Card.Actions style={{alignItems:'center'}}>
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
            <Surface style={{display: isCameraVisible ? 'flex' : 'none', flexGrow: 4}}>
                <QRCapture style={{height:500, width: 500}} context={scoutInfo.currentMatchState} nextPath='[match]' router={router} ></QRCapture>
            </Surface>
            
        </Surface>

    );
    
}

const styles = StyleSheet.create({
  button: {
    margin: 10
  }
});