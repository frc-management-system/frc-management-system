import { Stack } from 'expo-router';
import { MD3DarkTheme, PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MatchScoutProvider } from '../../../contexts/MatchScoutContext';
import { TimerProvider } from '../../../contexts/TimerContext';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={MD3DarkTheme}>
        <TimerProvider>
          <MatchScoutProvider>
            <Stack screenOptions={{headerShown: false}}>
              <Stack.Screen name='index' options={{title: 'MatchScoutHome'}} />
              <Stack.Screen name='[match]' options={{ title: 'MatchScout' }} />
              <Stack.Screen name='MatchLogs' options={{ title: 'MatchLogs' }} />
            </Stack>
          </MatchScoutProvider> 
        </TimerProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}