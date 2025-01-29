import { CommonActions, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import Login from "./Login";
import Loginnavroute from "./Loginnavroute";
import { Organzerrouteoute } from "../Organizers";
import { Boxofficeroute } from "../Boxoffices/boxindex";
import { Sellerroute } from "../Seller/Sellerindex";
import { useSelector } from "react-redux";

const Stack = createStackNavigator();

const Loginroute = () => {
  const navigation = useNavigation();
  const { isAuth, AsyncValue } = useSelector((state) => state.Auth);

  useEffect(() => {
    if (isAuth) {
      const userType = AsyncValue.UserType;
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: Loginnavroute[userType] || Loginnavroute.Login }],
        })
      );
    }
  }, [isAuth, AsyncValue, navigation]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={Login} name={Loginnavroute.Login} />
      <Stack.Screen
        component={Organzerrouteoute}
        name={Loginnavroute.Organizer}
      />
      <Stack.Screen
        component={Boxofficeroute}
        name={Loginnavroute.BoxofficeUser}
      />
      <Stack.Screen component={Sellerroute} name={Loginnavroute.Seller} />
    </Stack.Navigator>
  );
};

export default Loginroute;
