import { useState } from 'react';
import {
    Image,
    ImageSourcePropType,
    LayoutChangeEvent,
    StyleProp,
    StyleSheet,
    View,
    ViewStyle,
} from 'react-native';
import { Surface, Text } from 'react-native-paper';

export type HeatMapCoordinates = {
	x: number;
	y: number;
};

type HeatMapProps = {
	image: ImageSourcePropType;
	onCoordinateChange?: (coordinates: HeatMapCoordinates) => void;
	style?: StyleProp<ViewStyle>;
};

export default function HeatMap({ image, onCoordinateChange, style }: HeatMapProps): React.JSX.Element {
	const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
	const [coordinates, setCoordinates] = useState<HeatMapCoordinates | null>(null);

	const handleLayout = (event: LayoutChangeEvent) => {
		const { width, height } = event.nativeEvent.layout;
		setImageSize({ width, height });
	};

	const handleTouch = (event: { nativeEvent: { locationX: number; locationY: number } }) => {
		if (imageSize.width === 0 || imageSize.height === 0) return;

		const nextCoordinates = {
			x: Math.max(0, Math.min(event.nativeEvent.locationX, imageSize.width)) / imageSize.width,
			y: Math.max(0, Math.min(event.nativeEvent.locationY, imageSize.height)) / imageSize.height,
		};

		setCoordinates(nextCoordinates);
		onCoordinateChange?.(nextCoordinates);
	};

	return (
		<Surface style={[styles.container, style]}>
			<View
				onLayout={handleLayout}
				onStartShouldSetResponder={() => true}
				onResponderMove={handleTouch}
				onResponderRelease={handleTouch}
				style={styles.imageFrame}
			>
				<Image source={image} resizeMode="stretch" style={StyleSheet.absoluteFill} />
				{coordinates && (
					<View
						pointerEvents="none"
						style={[
							styles.marker,
							{ left: `${coordinates.x * 100}%`, top: `${coordinates.y * 100}%` },
						]}
					/>
				)}
			</View>
			{coordinates && (
				<Text accessibilityLiveRegion="polite" style={styles.coordinates} variant="labelMedium">
					x: {coordinates.x.toFixed(3)}  y: {coordinates.y.toFixed(3)}
				</Text>
			)}
		</Surface>
	);
}

const styles = StyleSheet.create({
	container: {
		borderRadius: 4,
		height: 240,
		overflow: 'hidden',
		width: '100%',
	},
	imageFrame: {
		flex: 1,
		overflow: 'hidden',
	},
	marker: {
		backgroundColor: '#ff3b30',
		borderColor: '#ffffff',
		borderRadius: 8,
		borderWidth: 2,
		height: 16,
		marginLeft: -8,
		marginTop: -8,
		position: 'absolute',
		width: 16,
	},
	coordinates: {
		paddingHorizontal: 8,
		paddingVertical: 4,
		textAlign: 'right',
	},
});
