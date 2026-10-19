import { Stack } from 'expo-router';
import * as SystemUI from 'expo-system-ui';
import { Appearance } from 'react-native';
import { MD3DarkTheme, PaperProvider } from 'react-native-paper';
import { TimerProvider } from '../../contexts/TimerContext';

export default function RootLayout() {
Appearance.setColorScheme('dark');
SystemUI.setBackgroundColorAsync('#000000');

  return (
    <PaperProvider theme={MD3DarkTheme}>
      <TimerProvider>
          <Stack screenOptions={{headerShown: false, contentStyle:{backgroundColor: MD3DarkTheme.colors.background}}}>
            <Stack.Screen name="index" options={{ title: 'Index'}} />
            <Stack.Screen name="(MatchScout)" options={{ title: 'Match Scout Home' }} />
            <Stack.Screen name='QRShow' options={{title: 'Scan QR Code'}} />
          </Stack> 
      </TimerProvider>
    </PaperProvider>

  );
}
