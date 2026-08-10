import { Stack } from 'expo-router';
import { MD3DarkTheme, PaperProvider } from 'react-native-paper';
import { MatchScoutProvider } from '../../contexts/MatchScoutContext';
import { TimerProvider } from '../../contexts/TimerContext';

export default function RootLayout() {
  return (
    <PaperProvider theme={MD3DarkTheme}>
      <TimerProvider>
        <MatchScoutProvider>
          <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="index" options={{ title: 'Index'}} />
            <Stack.Screen name="(MatchScout)" options={{ title: 'Match Scout Home' }} />
          </Stack> 
        </MatchScoutProvider>
      </TimerProvider>
    </PaperProvider>

  );
}
