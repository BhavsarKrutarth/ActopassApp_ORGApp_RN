import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Navroute from "./Navroute";
import Bottomindex from "./Bottom/Bottomindex";
import Sellerdetail from "../Screen/Sellerdetail";
import Boxofficedetail from "../Screen/Boxofficedetail";
import Scannerdetail from "../Screen/Scannerdetail";
import Eventdetail from "../Screen/Eventdetails";

const Stack = createStackNavigator()

const Organzerrouteoute = () => {
    return(
            <Stack.Navigator screenOptions={{headerShown:false}}>
                <Stack.Screen component={Bottomindex} name={Navroute.Bottom}/>
                <Stack.Screen component={Sellerdetail} name={Navroute.Sellerdetail} />
                <Stack.Screen component={Boxofficedetail} name={Navroute.Boxofficedatail} />
                <Stack.Screen component={Scannerdetail} name={Navroute.Scannerdetail} />
                <Stack.Screen component={Eventdetail} name={Navroute.Eventdetail}/>
            </Stack.Navigator>
    )
}

export default Organzerrouteoute;