import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { MatchScoutProvider } from '../../../contexts/MatchScoutContext';
import { TimerProvider } from '../../../contexts/TimerContext';

export default function RootLayout() {
  return (
    <PaperProvider>

      <TimerProvider>
      <MatchScoutProvider>
          <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name='index' options={{title: 'MatchScoutHome'}} />
            <Stack.Screen name='[match]' options={{ title: 'MatchScout' }} />
          </Stack>
        </MatchScoutProvider> 
      </TimerProvider>

    </PaperProvider>
  );
}