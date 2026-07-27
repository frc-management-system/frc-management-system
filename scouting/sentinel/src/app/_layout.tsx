import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { TimerProvider } from '../../contexts/TimerContext';

export default function RootLayout() {
  return (
    <PaperProvider>
      <TimerProvider>
          <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="index" options={{ title: 'Index' }} />
            <Stack.Screen name="(MatchScout)" options={{ title: 'Match Scout Home' }} />
          </Stack> 
      </TimerProvider>
    </PaperProvider>

  );
}
