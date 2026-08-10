import React from 'react';
import { Button, Card, RadioButton, Surface, Text } from 'react-native-paper';
import { MatchScout } from '../contexts/MatchScoutContext';
import { EventProps } from '../types/CommonTypes';


export const button = ({style, onPress, context, children}: {style?: {}, onPress: EventProps[], context:MatchScout, children: string}) => (
    <Button 
        mode="contained"
        style={style}
        onPress={() => context.handleEvent(onPress)}
    >
        {children}
    </Button>
);

export const text = ({style, children}: {style?: {}, children: string}) => (
    <Text style={style}>{children}</Text>
);

export const card = ({style, children}: {style?: {}, children: React.ReactNode}) => (
    <Card mode='contained' style={style}>
        {children}
    </Card>
);

export const radioButton = ({style, field, onPress, context }: {style?: {}, field: string, onPress: EventProps[], context: MatchScout}) => (
    <RadioButton.Item
        style={style}
        label={field}
        value={field}  
        onPress={() => context.handleEvent(onPress)} 
        status={context.robotState[field as keyof typeof context.robotState]} 
    />
);

export const surface = ({style, children}: {style?: {}, children:React.ReactNode}) => (
    <Surface style={style}>
        {children}
    </Surface>
);

export const cardActions = ({style, children}: { style?:{}, children:React.ReactNode}) => (
    <Card.Actions  style={style}>
        {children}
    </Card.Actions>
);

export const ComponentMap: Record<string, React.ComponentType<any>> = {
  button,
  text,
  card,
  radioButton,
  surface,
  cardActions
};
