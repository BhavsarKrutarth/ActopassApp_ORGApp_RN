import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";



const Drawer = createDrawerNavigator()

const Drawerindex = () => {
    return (
        <Drawer.Navigator screenOptions={{headerShown:true}}>
            {/* <Drawer.Screen name="Home" component={Home} /> */}
        </Drawer.Navigator>
    )
}

export default Drawerindex;