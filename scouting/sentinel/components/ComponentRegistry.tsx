import React from 'react';
import { View } from 'react-native';
import { Button, Card, RadioButton, Text } from 'react-native-paper';
import { handleEvent } from '../helpers/eventHandlers';

type EventProps = {
    eventType: string,
    field: string,
    logCurrentRobotState: boolean
}

export const button = ({props, children}: {props?: {}, children: string}) => (
    <Button {...props}>{children}</Button>
);

export const text = ({props, children}: {props?: {}, children: string}) => (
    <Text {...props}>{children}</Text>
);

export const card = ({props, children}: {props?: {}, children: React.ReactNode}) => (
    <Card {...props}>
        {children}
    </Card>
);

export const radioButton = ({props, onPress, status, value}: {props?: {}, onPress: EventProps , status: string, value: string}) => (
    <RadioButton {...props} value={value} onPress={() => {handleEvent(onPress?.eventType, onPress?.field, onPress?.logCurrentRobotState)}} status='checked'  />
);

export const view = ({props, children}: {props?: {}, children?:[]}) => (
    <View {...props}>
        {Array.isArray(children) ? children.map((child, index) => <Text key={index}>{child}</Text>) : <Text>{children}</Text>}
    </View>
);

export const cardActions = ({props, children}: {props?: {}, children:React.ReactNode}) => (
    <Card.Actions {...props}>{children}</Card.Actions>
);

export const ComponentMap: Record<string, React.ComponentType<any>> = {
  button,
  text,
  card,
  radioButton,
  view,
  cardActions
};
