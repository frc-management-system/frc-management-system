import { Directory, File, Paths } from 'expo-file-system';
import { unzip, zip } from 'react-native-zip-archive';
import { MatchScout } from '../contexts/MatchScoutContext';
import { TFileManager, TLogStructure } from '../types/CommonTypes';

export const useFileManager: () => TFileManager = (): TFileManager => {

  const logsRoot = new Directory(Paths.document, "logs");
  const matchScoutLogsPath = new Directory(logsRoot, "MatchScout");
  
  const tempPath =  new Directory(Paths.document, "temp");
  const matchScoutFilePath = new Directory(Paths.document, "matchScoutAssignment");
  

  const createBaseDirs: TFileManager['createBaseDirs'] =  (): void => {

    if(!logsRoot.exists) {logsRoot.create()}
    if(!tempPath.exists) {tempPath.create()}

  };

  const saveMatchScoutLog: TFileManager['saveMatchScoutLog'] = async (
    context: MatchScout
  ): Promise<string> => {

    const matchScoutLogsEvent = new Directory(matchScoutLogsPath, context.matchInfo.event);
    const unzippedLogsPath = new Directory(matchScoutLogsEvent, "unzipped");
    const zippedLogsPath = new Directory(matchScoutLogsEvent, "zipped");
    const fileName: string = `${context.matchInfo.alliance}-${context.matchInfo.alliancePosition}-match-${context.matchInfo.currentMatch?.matchNum}`;
    const logString: string = JSON.stringify(context.eventLog);
    
    if (!unzippedLogsPath.exists) {unzippedLogsPath.create({intermediates: true})};
    if (!zippedLogsPath.exists) {zippedLogsPath.create({intermediates: true})};

    const file = new File(unzippedLogsPath, fileName);
    file.create({intermediates: true, overwrite: true});
    file.write(logString);
    console.log(logString); 
    await zip([`${file.uri}`], `${zippedLogsPath.uri}${fileName}`);
    file.delete();
    return `${zippedLogsPath.uri}${fileName}`;
  };

  const getZippedLog: TFileManager['getZippedLog'] = async (path: string): Promise<string> => {
    const file = new File(path);

    return await file.base64();
  };

  const deleteFile: TFileManager['deleteFile'] = (path: string): void => {
    const file = new File(path);
    file.delete()
  };

  const unzipB64: TFileManager['unzipB64'] = async (
    inputB64: string,
    outFilePath: string,
    fileName: string
  ): Promise<string> => {

    const tempZipFile = new File(tempPath,"t.zip");
    if (!tempZipFile.exists) {tempZipFile.create()};
    try {
      tempZipFile.write(inputB64, {encoding: 'base64'});
      //await fs.writeFile(tempZip, inputB64, 'base64');
    } catch (e) {
      console.log('Unable to write file: ', e);
    }

    try {
      await unzip(tempZipFile.uri, outFilePath, 'US-ASCII');
    } catch (e) {
      console.log('Unable to unzip file: ', e);
    }

    try {
      tempZipFile.delete();
      //await fs.unlink(tempZip);
    } catch (e) {
      console.log('Deleting zip file failed: ', e);
    }

    //const output: string = await fs.readFile(`${outFilePath}/${fileName}`);
    const outputFile = new File(`${outFilePath}`, `${fileName}`);
    const output = outputFile.text();
    return output;
  };


  const unzipAssignment: TFileManager['unzipAssignment'] = async (
    assignmentB64: string
    ): Promise<string> => {

      return await unzipB64(assignmentB64, matchScoutFilePath.uri, 'assignment.txt');
  };

  const getLogStructure: TFileManager['getLogStructure'] = async (scoutType: 'MatchScout' | 'QualitativeScout' | 'PitScout'): Promise<TLogStructure> => {
    const scoutLogRoot = getScoutRootPath(scoutType);
    const eventDirs: (Directory | File)[] = scoutLogRoot.list();
    const logStructure: TLogStructure = eventDirs
      .filter(dir => dir instanceof Directory)
      .reduce(
        (structure: TLogStructure, eventDir: Directory): TLogStructure => ({
          ...structure,
          [eventDir.name]: [],
        }),
        {}
      );

    for (const event in logStructure) {
      try {
        logStructure[event] = await getEventLogInfo(event, scoutType);
      } catch (error) {
        console.log(error);
      }
    }

    return logStructure;
  };

  const getEventLogInfo: TFileManager['getEventLogInfo'] = async (
    eventName: string,
    scoutType: 'MatchScout' | 'QualitativeScout' | 'PitScout'
  ): Promise<TLogStructure['event']> => {
    
    const scoutLogRoot = getScoutRootPath(scoutType);
    const zippedLogsPath = new Directory(scoutLogRoot, eventName, "zipped");
    if (!zippedLogsPath.exists) {zippedLogsPath.create({intermediates: true})};
    const files: (Directory | File)[] = zippedLogsPath.list();


    const logInfo: TLogStructure['event'] = files
      .filter((file: Directory | File) => file instanceof File)
      .map((file: File): { name: string; path: string } => ({
        name: file.name,
        path: file.uri,
      }));

    return logInfo;
  };

  const getLastMatchNumber: TFileManager['getLastMatchNumber'] = async (
    eventName: string,
    scoutType: 'MatchScout' | 'QualitativeScout' | 'PitScout'
  ): Promise<number> => {
    console.log(`Loading event ${eventName}`);
    const eventUnzipped = new Directory(logsRoot, eventName, "unzipped");
    const eventZipped = new Directory(logsRoot, eventName, "zipped");
    console.log(eventUnzipped.uri);
    if (!eventUnzipped.exists) {eventUnzipped.create({intermediates: true});}
    if (!eventZipped.exists) {eventZipped.create({intermediates: true});}

    const logInfo: TLogStructure['event'] = await getEventLogInfo(eventName, scoutType);
    const lastMatchNum: number | undefined = logInfo
      .map((x): number => {
        return parseInt(x.name.split('-')[3], 10);
      })
      .sort((a: number, b: number): number => b - a)[0];
    console.log(`Starting ${eventName} from match ${lastMatchNum}`);
    return lastMatchNum;
  };

  const getScoutRootPath= (scoutType: 'MatchScout' | 'QualitativeScout' | 'PitScout'): Directory => {
    switch (scoutType) {
      case 'MatchScout':
        return matchScoutLogsPath;  
      default:
        return matchScoutLogsPath;
    }
  };

  return {
    createBaseDirs,
    saveMatchScoutLog,
    getZippedLog,
    getEventLogInfo,
    getLogStructure,
    deleteFile,
    getLastMatchNumber,
    unzipAssignment,
    unzipB64,
  };
};
