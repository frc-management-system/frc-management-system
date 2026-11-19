import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { IconButton, Surface, TextInput } from 'react-native-paper';

type IncrementerProps = {
	initialValue?: number;
	style?: {};
    handleEvent: () => void;
    label?: string;
};

export default function Incrementer({ initialValue = 0, style, handleEvent, label }: IncrementerProps): React.JSX.Element {
	const [count, setCount] = useState(initialValue);

	return (
		<Surface style={{...style, ...styles.container}}>
			<IconButton
				accessibilityLabel="Decrease count"
				icon="minus"
				mode="contained"
				onPress={() => {setCount((currentCount) => currentCount - 1); handleEvent();}}
			/>
			<TextInput style={styles.count} label={label} mode="outlined" editable={false} value={String(count)}>
			</TextInput>
			<IconButton
				accessibilityLabel="Increase count"
				icon="plus"
				mode="contained"
				onPress={() => {setCount((currentCount) => currentCount + 1); handleEvent();}}
			/>
		</Surface>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		flexDirection: 'row',
	},
	count: {
		minWidth: 48,
		textAlign: 'center',
	},
});
