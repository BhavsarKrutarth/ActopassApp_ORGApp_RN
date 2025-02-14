import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import { hei,wid,normalize, isIos } from '../../../theme';
import { FontFamily,FontSize } from '../../../theme';
import { StyleSheet, View } from 'react-native';
import {Colors} from '../../../theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ARimage } from '../../../common';
import Images from '../../../Image/Images';
import Sellernavroute from '../Sellernavroute';
import { Sellerpersonaldetails, Sellerhistory, Sellerhome } from '../../Sellerindex';



const Bottom = createBottomTabNavigator();


const Sellerbottomindex = () => {

    const insets = useSafeAreaInsets();

  return (
    <Bottom.Navigator

      screenOptions={() => ({
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: FontSize.font12,
          fontFamily: FontFamily.Regular,
        },
        tabBarHideOnKeyboard:true,
        tabBarActiveTintColor: Colors.Black,
        tabBarInactiveTintColor: Colors.lable,
        tabBarStyle: [
          style.tabstyle,
          {
            height: isIos ? hei(11) : hei(9),
            paddingTop:hei(1.2),
            paddingBottom: insets.bottom,
          },
        ],
      })}
      initialRouteName={Sellernavroute.Home}
      >
        
      <Bottom.Screen
        name={Sellernavroute.Home}
        component={Sellerhome}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{marginBottom:hei(0.5)}}>
              <ARimage
                source={focused ? Images.activeticket : Images.inactiveticket}
                style={style.imagestyle}
              />
            </View>
          ),
        }}
      />

      <Bottom.Screen
        name={Sellernavroute.History}
        component={Sellerhistory}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{marginBottom:hei(0.5)}}>
              <ARimage
                source={focused ? Images.activehistory : Images.inactivehistory}
                style={style.imagestyle}
              />
            </View>
          ),
        }}
      />

      <Bottom.Screen
        name={Sellernavroute.Sellerpersonaldetails}
        component={Sellerpersonaldetails}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{marginBottom:hei(0.5)}}>
              <ARimage
                source={focused ? Images.detailactive : Images.detail}
                style={style.imagestyle}
              />
            </View>
          ),
        }}
      />

    </Bottom.Navigator>
  )
}

export default Sellerbottomindex

const style = StyleSheet.create({
    tabstyle: {
      backgroundColor: Colors.White,
      position: 'absolute',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    imagestyle: {
      height: hei(2.8),
      width: hei(2.8),
    }
})