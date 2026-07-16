import { CameraView, useCameraPermissions } from 'expo-camera';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { Dispatch, useEffect, useRef, useState } from 'react';
import { Button } from 'react-native-paper';
import { useMatchInfoDispatch } from '../../contexts/MatchScoutContext';
import { useFileManager } from '../../hooks/useFileManager';
import { MatchScoutAction } from '../../types/MatchScoutTypes';

const {path} = useLocalSearchParams();

export default function QRCapture(): React.JSX.Element {
  const [permission, requestPermission ] = useCameraPermissions();
  const matchInfoDispatch: Dispatch<MatchScoutAction> = useMatchInfoDispatch();
  const [isLoading, setLoading] = useState<boolean>(false);
  const fileManager = useFileManager();
  const router = useRouter();
  const isCaptured = useRef<boolean>(false);


  useEffect(() => {
    if (!permission)  {
        requestPermission(); 
      }
    }, [permission])


  const advance: (codes: string) => Promise<void> = async (codes: string): Promise<void> => {
    if (!codes || isCaptured.current) return;

    isCaptured.current = true;
    setLoading(true);

    const assignmentTxt: string = await fileManager.unzipAssignment(codes);
    const nextMatchNum: number =
      (await fileManager.getLastMatchNumber(JSON.parse(assignmentTxt ?? '')?.e ?? '')) + 1;

    const action: MatchScoutAction = {
      type: "load",
      loadData: assignmentTxt,
      matchNum: nextMatchNum,
    };

    matchInfoDispatch(action);

    await new Promise((res) => setTimeout(res, 500));
    router.navigate('/Prematch');
    //router.push({pathname:'/[name]', params:{name: jsonScreens[0]}});
  };

  if (!permission) {
  // Permission is still loading, return an empty view or loader
  return <Box> </Box>;
}
  if (!permission.granted) {
    return (
      <Box>
        <Text>We need your permission to show the camera</Text>
        <Button   onPress={requestPermission}>You must grant permission</Button>
      </Box>
    );
  }


  return (<Box>
            <CameraView
                facing="back"
                barcodeScannerSettings={
                    {
                        barcodeTypes: ['qr']
                    }
                }
                style={{height: '100%', width: '100%'}}
                onBarcodeScanned={
                    ({ data }) => {
                        console.log(data);
                        advance(data); // here you can get your barcode id or url
                    }
                }
            />
          </Box>);
}
