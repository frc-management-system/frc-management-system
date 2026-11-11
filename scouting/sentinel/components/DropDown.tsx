import { useState } from 'react';
import { List } from 'react-native-paper';

export type OptionProps = {
    optionTitle: string;
    onPress: () => void;
};

export default function DropDown({defaultSelection, options, style, description } : {defaultSelection: string, options: OptionProps[], style?: {}, description?: string}) : React.JSX.Element {
    const [expanded, setExpanded] = useState(false);
    const [titleState, setTitleState] = useState(defaultSelection);

    const handlePress = () => setExpanded(!expanded);

    return (
        <List.Accordion
            title={titleState}
            expanded={expanded}
            onPress={handlePress}
            style={{...style}}
            description={description}
        >
            {options.map((option, index) => (
                <List.Item 
                    key={index} 
                    title={option.optionTitle} 
                    onPress={() => 
                        {
                            setTitleState(option.optionTitle);
                            option.onPress();
                            setExpanded(!expanded);
                        }
                    } />
            ))}
        </List.Accordion>
    );
}