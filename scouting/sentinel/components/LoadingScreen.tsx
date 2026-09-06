import { Button, Card, Surface, Text } from 'react-native-paper';
//import { LoadingSymbol } from '../basics/LoadingSymbol';
import { globalStyles } from '@/styles/globalStyles';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type PLoadingScreen = {
  message: string;
  buttonText?: string;
  onPress?: () => void;
};

export function LoadingScreen({ message, buttonText, onPress }: PLoadingScreen): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const getButton = () => {
    return buttonText && onPress ? (
      <Button mode="outlined" onPress={onPress} >{buttonText}</Button>
    ) : (
      <></>
    );
  };

  return (
    <Surface style={{...globalStyles.container,paddingTop: insets.top, paddingBottom: insets.bottom}}>
      <Card style={{flex: 1}}>
        <Text variant="headlineMedium">{message}</Text>
        {getButton()}
      </Card>
    </Surface>
  );
}
