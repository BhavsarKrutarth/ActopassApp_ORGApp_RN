import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import {} from 'react-native';
import Boxooficeravroute from "./Boxnavroute";
import { Boxbottomindex } from "../boxindex";

const Stack = createStackNavigator();


const Boxofficeroute = () => {
    return(
            <Stack.Navigator screenOptions={{headerShown:false}}>
                <Stack.Screen component={Boxbottomindex} name={Boxooficeravroute.Boxbottom} />
            </Stack.Navigator>
    )
}

export default Boxofficeroute;

