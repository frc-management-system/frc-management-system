import React from 'react';
import { Button, Card, RadioButton, Text } from 'react-native-paper';
import { View } from 'react-native';

export const button = ({props, innerText, OnClick}: {props: {}, innerText: string, OnClick?: () => void}) => (
    <Button {...props} onPress={OnClick}>{innerText}</Button>
);

export const text = ({props, innerText}: {props?: {}, innerText: string}) => (
    <Text {...props}>{innerText}</Text>
);

export const card = ({props, children, OnClick}: {props?: {}, children: [], OnClick?: () => void}) => (
    <Card {...props} onPress={OnClick}>
        {Array.isArray(children) ? children.map((child, index) => <Text key={index}>{child}</Text>) : <Text>{children}</Text>}
    </Card>
);

export const radioButton = ({props, value, OnPress}: {props?: {}, value: string, OnPress?: () => void}) => (
    <RadioButton {...props} value={value} onPress={OnPress} />
);

export const view = ({props, children}: {props?: {}, children?:[]}) => (
    <View {...props}>
        {Array.isArray(children) ? children.map((child, index) => <Text key={index}>{child}</Text>) : <Text>{children}</Text>}
    </View>
);

export const ComponentMap: Record<string, React.ComponentType<any>> = {
  button,
  text,
  card,
  radioButton,
  view
};
