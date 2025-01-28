import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View } from 'react-native';
import Sellernavroute from "./Sellernavroute";
import { Sellerhome } from "../Sellerindex";

const Stack = createStackNavigator()

const Sellerroute = () => {
    return(
       <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen component={Sellerhome} name={Sellernavroute.Home} />
        </Stack.Navigator>
    )
}


export default Sellerroute