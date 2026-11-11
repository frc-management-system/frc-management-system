import React from 'react';
import { Button, Card, List, RadioButton, Surface, Text, TextInput } from 'react-native-paper';
import { MatchScout } from '../contexts/MatchScoutContext';
import { EventProps } from '../types/CommonTypes';
import { ItemSchema } from '../types/ComponentTypes';
import DropDown from './DropDown';


export const button = ({style, onPress, context, children}: {style?: {}, onPress: EventProps[], context:MatchScout, children: string}) => (
    <Button 
        mode="contained"
        style={style}
        onPress={() => context.handleEvent(onPress)}
    >
        {children}
    </Button>
);

export const text = ({style, field, children, context, isMatchInfo, matchDetails}: {style?: {}, field: string, children: string, context: MatchScout, isMatchInfo?: string, matchDetails: {}}) => (
    //<Text style={style}>{isMatchInfo == "true"  ? context.matchInfo[field as keyof typeof context.robotState] : children}</Text>
    //<Text style={style}>{children}</Text>
    <Text style={style}>{field == "" ? (children) : isMatchInfo == 'true' ? (matchDetails[field as keyof typeof matchDetails]) : (context.robotState[field as keyof typeof context.robotState]) }</Text>
);

export const card = ({style, children}: {style?: {}, children: React.ReactNode}) => (
    <Card mode='contained' style={style}>
        {children}
    </Card>
);

export const textInput = ({
    style, 
    label, 
    field, 
    children, 
    context, 
    isMatchInfo, 
    matchDetails, 
    value,
    disabled,
    onChangeText
    }: {
        style?: {},
        label?: string, 
        field: string, 
        children: string, 
        context: MatchScout, 
        isMatchInfo?: string, 
        matchDetails: {},   
        value?: string,
        disabled?: string,
        onChangeText?: EventProps[]
    }) => (
    <TextInput
        mode="outlined"
        style = {{...style}}
        label={label}
        value={ value == null ? isMatchInfo == 'true' ? (String(matchDetails[field as keyof typeof matchDetails])) : (String(context.robotState[field as keyof typeof context.robotState])) : value}
        disabled = {disabled == 'true'}
        onChangeText={() => { if(onChangeText) context.handleEvent(onChangeText); }}
    >
    </TextInput>
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
export const list = (
    {style, 
     title, 
     children, 
     isMatchInfo
    }: {
      style?: {}, 
      title: string, 
      children:React.ReactNode, 
      isMatchInfo?: string
    }) => (
    <List.Section>
        <List.Accordion 
            style={{...style}}
            title={title}
        >
            {children}
        </List.Accordion>
    </List.Section>
);

export const listItem = ({style, title, onPress, context}: {style?: {}, title: string, onPress: EventProps[], context: MatchScout}) => (
    <List.Item
        style={{...style}}
        title={title}
        onPress={() => context.handleEvent(onPress)}
    />
);

export const dropdown = ({style, defaultSelection, context, items, description}: {style?: {}, defaultSelection: string, context: MatchScout, items: ItemSchema[], description?: string}) => (
    <DropDown
        defaultSelection={defaultSelection}
        options= {items.map((item) => ({
            optionTitle: item.title,
            onPress: () => context.handleEvent(item.onPress)
        }))}
        style={{...style}}
        description={description}
    />
);

export const ComponentMap: Record<string, React.ComponentType<any>> = {
  button,
  text,
  card,
  radioButton,
  surface,
  cardActions,
  textInput,
  list,
  listItem,
  dropdown
};
