import { Button, Card, Text } from 'react-native-paper';
//import { LoadingSymbol } from '../basics/LoadingSymbol';
import React from 'react';

export type PLoadingScreen = {
  message: string;
  buttonText?: string;
  onPress?: () => void;
};

export function LoadingScreen({ message, buttonText, onPress }: PLoadingScreen): React.JSX.Element {
  const getButton = () => {
    return buttonText && onPress ? (
      <Button mode="outlined" onPress={onPress} >{buttonText}</Button>
    ) : (
      <></>
    );
  };

  return (
    <Card>
      <Text variant="headlineMedium">{message}</Text>
      {getButton()}
    </Card>
  );
}
