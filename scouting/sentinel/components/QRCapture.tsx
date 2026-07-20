import { CameraView, useCameraPermissions } from 'expo-camera';
import { ImperativeRouter, RelativePathString } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { MatchScout } from '../contexts/MatchScoutContext';
import { useFileManager } from '../hooks/useFileManager';

export type QRCaptureProps = {
  context: MatchScout
  nextPath: string
  style: {}
  router: ImperativeRouter
}

export default function QRCapture({context, nextPath, style, router}: QRCaptureProps): React.JSX.Element {
  const [permission, requestPermission ] = useCameraPermissions();
  //const [isLoading, setLoading] = useState<boolean>(false);
  const fileManager = useFileManager();
  const isCaptured = useRef<boolean>(false);


  useEffect(() => {
    if (!permission)  {
        requestPermission(); 
      }
    }, [permission])

  const relativePath = '/'.concat(nextPath) as RelativePathString;
  const advance: (codes: string) => Promise<void> = async (codes: string): Promise<void> => {
    if (!codes || isCaptured.current) return;

    isCaptured.current = true;
    //setLoading(true);

    if ("load" in context) {
        const assignmentTxt: string = await fileManager.unzipAssignment(codes);
        const nextMatchNum: number =
          (await fileManager.getLastMatchNumber(JSON.parse(assignmentTxt ?? '')?.e ?? '')) + 1;

        context.matchInfo = context.load(assignmentTxt, nextMatchNum);

        await new Promise((res) => setTimeout(res, 500));
        router.navigate(relativePath);
    }
  };

  if (!permission) {
  // Permission is still loading, return an empty view or loader
  return <View></View>;
}
  if (!permission.granted) {
    return (
      <View style={{flex:1}}>
        <Text>We need your permission to show the camera</Text>
        <Button   onPress={requestPermission}>You must grant permission</Button>
      </View>
    );
  }

  return (<View style={style}>
            <CameraView
                facing="back"
                barcodeScannerSettings={
                    {
                        barcodeTypes: ['qr']
                    }
                }
                style={style}
                onBarcodeScanned={
                    ({ data }) => {
                        console.log(data);
                        advance(data); // here you can get your barcode id or url
                    }
                }
                
            />
          </View>);
}
