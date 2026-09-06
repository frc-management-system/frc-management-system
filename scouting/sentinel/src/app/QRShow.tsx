import { RelativePathString, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Button, Card, Surface } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LoadingWrapper } from '../../components/LoadingWrapper';
import { useFileManager } from '../../hooks/useFileManager';

type QRShowRouteInfo = {
  filePath: string,
  returnRoute: string,
  returnText: string
};

export default function QRShow(): React.JSX.Element {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { filePath, returnRoute, returnText } = useLocalSearchParams<QRShowRouteInfo>();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [qrContent, setQrContent] = useState<string>('a');
  const fileManager = useFileManager();

  const routePath = returnRoute as RelativePathString;

  const generateQRCode: () => Promise<void> = async (): Promise<void> => {
    console.log(filePath);
    const output: string = await fileManager.getZippedLog(filePath);
    setQrContent(output);
    setLoading(false);
  };

  useEffect((): void => {
    setLoading(true);

    generateQRCode().catch((err: Error): void => {
      console.log(JSON.stringify(err));
    });
  }, []);

  return (
    <LoadingWrapper message="QR Code Generating" isLoading={isLoading}>
      <Surface  style={{ 
          flexDirection: 'row', 
          alignContent: 'center',
          alignItems: 'center',
          height: '100%',
          paddingTop: insets.top,
          paddingBottom: insets.bottom
        }}>
        <Button
          style={{
            flex:1,
            margin: 20
          }}
          mode="contained"
          onPress={() => {
            router.navigate(routePath);
          }}
        >
          {returnText}
        </Button>
        <Card style={{ flex: 2, alignItems: 'center' }}>
          <QRCode value={qrContent} size={550} quietZone={10} />
        </Card>
      </Surface>
    </LoadingWrapper>
  );
}
