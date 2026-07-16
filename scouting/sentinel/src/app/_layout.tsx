import { Stack } from 'expo-router';
import { MatchScoutProvider } from '../../contexts/MatchScoutContext';
import { TimerProvider } from '../../contexts/TimerContext';

export default function RootLayout() {
  return (
    <TimerProvider>
     <MatchScoutProvider>
        <Stack screenOptions={{headerShown: false}}>
          <Stack.Screen name="index" options={{ title: 'Index' }} />
          <Stack.Screen name="QRCapture" options={{ title: 'QRCapture' }} />
        </Stack>
      </MatchScoutProvider> 
    </TimerProvider>

  );
}
