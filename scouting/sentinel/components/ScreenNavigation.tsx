import { globalStyles } from "@/styles/globalStyles";
import { RelativePathString, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Appbar, Button } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getNumberOfScreens } from "../helpers/jsonScreenConfigs";
import { EventProps } from "../types/CommonTypes";

type ScreenNavigationProps = {
    scoutType: string;
    page: string;
    baseRoute: string;
    onStartClick: Function;
    onSubmitClick: Function;
}


export default function ScreenNavigation({scoutType, page, baseRoute, onStartClick, onSubmitClick}: ScreenNavigationProps){
    
    const { bottom } = useSafeAreaInsets();
    const router = useRouter();
    const [ pageNumber, setPageNumber ] = useState(Number(page));
    const BOTTOM_APP_BAR_HEIGHT = 20;
    const nextPageNumber = String(Number(page) + 1);
    const previousPageNumber = String(Number(page) - 1);
    const numberOfScreens = getNumberOfScreens(scoutType);

    const onStart: EventProps = {
        eventType: 'StartMatch',
        field: '',
        logCurrentRobotState: true
    };
    const onSubmit: EventProps = {
        eventType: 'SubmitMatch',
        field: '',
        logCurrentRobotState: false
    };

    useEffect(() => {
        setPageNumber(Number(page));
    }, [page]);

    function getStartButton() {
        if (pageNumber == 0)
        {
            return (
                <Button
                    mode="contained"
                    style={{flex:4}}
                    onPress={() => onStartClick([onStart])}
                >
                    Start
                </Button>
            )
        }
        else if (pageNumber == numberOfScreens - 1)
        {
           return (
                <Button
                    mode="contained"
                    style={{flex:4}}
                    onPress={() => onSubmitClick([onSubmit])}
                >
                    Submit
                </Button>
            ) 
        }
        else
        {
            return (<View style={{flex:4}}></View>);
        }
    }


    return (
        <Appbar style={[globalStyles.bottom, {display: 'flex',height: BOTTOM_APP_BAR_HEIGHT + bottom, justifyContent: 'space-between', alignItems: 'center'}]} >
            <Appbar.Action 
                icon="chevron-left"
                onPress={() => {
                    setPageNumber(Number(previousPageNumber));
                    router.dismissTo({pathname: baseRoute as RelativePathString, params:{matchpage: previousPageNumber}})
                }}
                disabled = { pageNumber == 0 ? true : false}
                size={40}
                style={{flex:1}}
            >
            </Appbar.Action>
            {getStartButton()}
            <Appbar.Action
                icon="chevron-right"
                onPress={() => {
                    setPageNumber(Number(nextPageNumber));
                    router.dismissTo({pathname: baseRoute as RelativePathString, params:{matchpage: nextPageNumber}})
                }}
                disabled={ pageNumber < getNumberOfScreens(scoutType) - 1 ? false : true}
                size={40}
                style={{flex:1}}
            >
            </Appbar.Action>
        </Appbar>
    );
}