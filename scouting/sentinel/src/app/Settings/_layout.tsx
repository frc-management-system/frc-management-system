import { Stack } from 'expo-router';
import { MD3DarkTheme, PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={MD3DarkTheme}>
          <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name='index' options={{title: 'Settings Home'}} />
          </Stack>
      </PaperProvider>
    </SafeAreaProvider>
  );
}