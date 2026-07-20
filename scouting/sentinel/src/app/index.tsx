import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { useFileManager } from '../../hooks/useFileManager';
import { TFileManager } from '../../types/CommonTypes';

export default function Index() {

  const fileManager: TFileManager = useFileManager();
  const router = useRouter();

  useEffect((): void => {
    fileManager.createBaseDirs();
  }, []);

  return (
    <View style={{ margin: 20, alignItems: 'center' }}>
      <Card>
        <Card.Title
          title = "Sentinel"
        />
        <Card.Actions>
          <Button 
            mode='contained'
            onPress={(): void => {
              router.push('/MatchScout');
            }}
          >
            Match Scout
          </Button>
          <Button
            mode='contained'
            onPress={(): void => {

            }}
          >
            Qualitative Scout
          </Button>
          <Button
            mode='contained'
            onPress={(): void =>{}}
          >
            Pit Scout
          </Button>
          <Button
            mode='contained'
            onPress={(): void => {}}
          >
            Settings
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
