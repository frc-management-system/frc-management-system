import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, Surface, useTheme } from 'react-native-paper';
import { useFileManager } from '../../hooks/useFileManager';
import { TFileManager } from '../../types/CommonTypes';
import { globalStyles } from '../styles/globalStyles';

export default function Index() {

  const fileManager: TFileManager = useFileManager();
  const router = useRouter();
  const theme = useTheme();

  useEffect((): void => {
    fileManager.createBaseDirs();
  }, []);

  return (
    <Surface style={{...globalStyles.container, alignItems:'center', justifyContent:'center'}}>
      <Card mode='contained'>
        <Card.Title
          title = "Sentinel"
        />
        <Card.Actions style={{flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center' }}>
          <Button 
            style={styles.button}
            mode='contained'
            onPress={(): void => {
              router.push('/(MatchScout)');
            }}
          >
            Match Scout
          </Button>
          <Button
            style={styles.button}
            mode='contained'
            onPress={(): void => {

            }}
          >
            Qualitative Scout
          </Button>
          <Button
            style={styles.button}
            mode='contained'
            onPress={(): void =>{}}
          >
            Pit Scout
          </Button>
          <Button
            style={styles.button}
            mode='contained'
            onPress={(): void => {}}
          >
            Settings
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
