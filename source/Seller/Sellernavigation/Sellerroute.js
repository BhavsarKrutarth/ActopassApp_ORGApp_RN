import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View } from 'react-native';
import Sellernavroute from "./Sellernavroute";
import { Sellerbottomindex, Sellerhome } from "../Sellerindex";

const Stack = createStackNavigator()

const Sellerroute = () => {
    return(
       <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen component={Sellerbottomindex} name={Sellernavroute.Sellerbottomindex} />
        </Stack.Navigator>
    )
}


export default Sellerroute