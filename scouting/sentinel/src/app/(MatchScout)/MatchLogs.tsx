import { useFocusEffect, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Appbar, Divider, IconButton, List, Surface, useTheme } from 'react-native-paper';
import { LoadingWrapper } from '../../../components/LoadingWrapper';
import { useFileManager } from '../../../hooks/useFileManager';
import { TFileManager, TLogStructure } from '../../../types/CommonTypes';

//export type PMatchLogsProps = NativeStackScreenProps<TRootStackParamList, 'MatchLogs'>;

export default function MatchLogs(): React.JSX.Element {
  const theme = useTheme();
  const router = useRouter();
  const [logStructure, setLogStructure] = useState<TLogStructure>({});
  const [isLoading, setIsLoading] = useState(true);
  const fileManager: TFileManager = useFileManager();

  useFocusEffect(
    React.useCallback((): void => {
      setIsLoading(true);
      fileManager
        .getLogStructure("MatchScout")
        .then((value: TLogStructure): void => {
          setLogStructure(value);
          setIsLoading(false);
        })
        .catch((err: any): void => {
          console.log('ERROR');
          console.log(JSON.stringify(err, null, 1));
          setIsLoading(false);
        });
    }, [])
  );

  const createLogButton: (path: string, deleteFile: () => void) => React.ReactNode = (
    path: string,
    deleteFile: () => void
  ): React.ReactNode => {
    return (
      <Surface style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
        <IconButton
          icon={(): React.ReactElement => <List.Icon color="red" icon="delete" />}
          onPress={deleteFile}
        />
        <IconButton
          icon={(): React.ReactElement => <List.Icon icon="export" />}
          onPress={(): void => {
            //router.navigate('QRShow', { routeName: 'MatchLogs', path: path });
          }}
        />
      </Surface>
    );
  };

  const createEventList: () => React.ReactNode = (): React.ReactNode => {
    const events: React.ReactNode[] = [];
    for (const eventName in logStructure) {
      events.push(
        <List.Accordion title={eventName} id={eventName} key={eventName} style={{backgroundColor: theme.colors.secondaryContainer}}>
          {logStructure[eventName]
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((matchLog, index) => {
              return (
                <List.Item
                  key={matchLog.name}
                  title={matchLog.name}
                  right={() =>
                    createLogButton(matchLog.path, () => {
                      fileManager.deleteFile(matchLog.path);
                      logStructure[eventName].splice(index, 1);
                      setLogStructure({ ...logStructure });
                    })
                  }
                />
              );
            })}
        </List.Accordion>
      );
    }

    return <List.AccordionGroup>{events}</List.AccordionGroup>;
  };

  return (
    <LoadingWrapper isLoading={isLoading} message="Loading Logs">
      <Appbar.Header>
        <Appbar.BackAction onPress={(): void => {
          router.navigate('/(MatchScout)');
          }} />
        <Appbar.Content title="Match Logs" />
      </Appbar.Header>
      <Divider />
      <Surface style={{height: '100%', width: '100%'}}>
        <ScrollView>{createEventList()}</ScrollView>
      </Surface>
    </LoadingWrapper>
  );
}
