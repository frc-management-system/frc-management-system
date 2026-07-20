import { Stack } from 'expo-router';
import { MatchScoutProvider } from '../../../contexts/MatchScoutContext';
import { TimerProvider } from '../../../contexts/TimerContext';
import { Title } from 'react-native-paper';

export default function RootLayout() {
  return (
    <TimerProvider>
     <MatchScoutProvider>
        <Stack screenOptions={{headerShown: false}}>
          <Stack.Screen name='index' options={{title: 'MatchScoutHome'}}
          <Stack.Screen name="[match]" options={{ title: 'MatchScout' }} />
        </Stack>
      </MatchScoutProvider> 
    </TimerProvider>

  );
}