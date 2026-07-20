import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import { Button, Card } from 'react-native-paper';
import QRCapture from '../../../components/QRCapture';
import { useMatchInfo } from '../../../contexts/MatchScoutContext';

export default function MatchScoutHome() {
const router = useRouter();
const scoutInfo = useMatchInfo();
const [isCameraVisible, setIsCameraVisible] = useState(false);

    return (
        <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <Card>
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
                            //router.navigate('/MatchLogs');
                        }}
                    >
                        Match Logs
                    </Button>
                </Card.Actions>
            </Card>
            <View style={{display: isCameraVisible ? 'flex' : 'none', flexGrow: 4}}>
                <QRCapture style={{height:500, width: 500}} context={scoutInfo} nextPath='[match]' router={router} ></QRCapture>
            </View>
            
        </View>

    );
    
}