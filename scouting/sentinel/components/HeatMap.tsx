import { useImage } from 'expo-image';
import { useEffect, useState } from 'react';
import {
    GestureResponderEvent,
    Image,
    StyleProp,
    StyleSheet,
    View,
    ViewStyle
} from 'react-native';
import { Avatar, Surface, TouchableRipple } from 'react-native-paper';
import { useFileManager } from '../hooks/useFileManager';
import { EventProps } from '../types/CommonTypes';

export type HeatMapCoordinates = {
	x: number;
	y: number;
};

type HeatMapProps = {
	image: string;
	onCoordinateChange: (event: EventProps[]) => void;
	style?: StyleProp<ViewStyle>;
    pressCoordinates: HeatMapCoordinates;
    onPress: EventProps[];
};

const fileManager = useFileManager();

export default function HeatMap({ image, onCoordinateChange, style, pressCoordinates, onPress }: HeatMapProps): React.JSX.Element {
	const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
	const [coordinates, setCoordinates] = useState<HeatMapCoordinates>(pressCoordinates);
    const [markerVisible, setMarkerVisible] = useState(false);

    const imageSource = fileManager.findAssetPath(image);
    const imageInfo = useImage(imageSource);
    
    useEffect(():void => {
        if(imageInfo)
        {
            setImageSize({width: (imageInfo.width*imageInfo.scale), height: (imageInfo.height*imageInfo.scale)});
        }
    },[imageInfo]);

	const handleTouch = (event: GestureResponderEvent) => {
        
        const {locationX, locationY} = event.nativeEvent;
		if (imageSize.width === 0 || imageSize.height === 0) return;

		const nextCoordinates = {
            x: locationX,
            y: locationY
		};

		setCoordinates(nextCoordinates);
        setMarkerVisible(true);
		onCoordinateChange(setEventProps(onPress));
        setTimeout(() => setMarkerVisible(false), 500); // Hide the marker after 2 seconds
	};

    const handlePressIn = (event: GestureResponderEvent) => {
        const {locationX, locationY} = event.nativeEvent;
        if (imageSize.width === 0 || imageSize.height === 0) return;
        const nextCoordinates = {
            x: locationX,
            y: locationY
		};

		setCoordinates(nextCoordinates);
        setMarkerVisible(true);
    };

    const setEventProps = (events: EventProps[]): EventProps[] => {
        const newProps: EventProps[] = events.map((event) => (
            event.eventType == "UpdateField" && event.field.includes('X')? { ...event, newValue: coordinates.x}:
            (event.eventType == "UpdateField" && event.field.includes('Y')) ? {...event, newValue: coordinates.y} : event
                
        ));
        return newProps;
    };

    const showMarker = (x:number, y:number) => {

        return (
            <Surface style={ { left: x - 25, top: y - 25}} >
                <Avatar.Icon size={48} icon="map-marker" style={{position: 'absolute',width: 48}}/>
            </Surface>
        )
    };
    

    

	return (
		<Surface style={[styles.container, style, { height: imageSize.height, width: imageSize.width }]}>
            <Image source={{ uri: imageSource }} resizeMode="stretch" style={[StyleSheet.absoluteFill]} />
                {markerVisible && (
                    showMarker(coordinates.x, coordinates.y)
                )}
			<TouchableRipple
                onPressIn={handlePressIn}
				onPressOut={handleTouch}
				style={{ height: imageSize.height, width: imageSize.width, ...styles.imageFrame }}
                rippleColor="rgba(0, 0, 0, .32)"
			>
				<View></View>
			</TouchableRipple>
            
            {/* <Text accessibilityLiveRegion="polite" style={styles.coordinates} variant="labelMedium">
                x: {String(coordinates.x.toFixed(3))}  y: {String(coordinates.y.toFixed(3))} height: {String(imageSize.height)} width: {String(imageSize.width)}    
            </Text> */}
			
		</Surface>
	);
}

const styles = StyleSheet.create({
	container: {
        position: 'relative',
		borderRadius: 4,
		overflow: 'hidden',
		width: '100%',
	},
	imageFrame: {
        position: 'absolute',
		overflow: 'hidden',
	},
	coordinates: {
		paddingHorizontal: 8,
		paddingVertical: 4,
		textAlign: 'right',
	},
});
