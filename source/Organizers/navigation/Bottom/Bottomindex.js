import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Navroute from '../Navroute';
import {FontFamily, FontSize, isIos} from '../../../theme';
import {ARimage} from '../../../common';
import Images from '../../../Image/Images';
import {hei, wid} from '../../../theme';
import {Colors} from '../../../theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Home from '../../Screen/Home';
import Accountcreation from '../../Screen/Accountcreation';
import Detail from '../../Screen/Detail';
import Setting from '../../Screen/Setting';

const Bottom = createBottomTabNavigator();

const Bottomindex = () => {
  const insets = useSafeAreaInsets();

  return (
    <Bottom.Navigator
      screenOptions={() => ({
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: FontSize.font12,
          fontFamily: FontFamily.Regular,
        },
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
      initialRouteName={Navroute.Home}>
        
      <Bottom.Screen
        name={Navroute.Home}
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{marginBottom:hei(0.5)}}>
              <ARimage
                source={focused ? Images.homeactive : Images.home}
                style={style.imagestyle}
              />
            </View>
          ),
        }}
      />

      <Bottom.Screen
        name={Navroute.Accountcreation}
        component={Accountcreation}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{marginBottom:hei(0.5)}}>
              <ARimage
                source={focused ? Images.accountcreation : Images.creation}
                style={{height: hei(2.8), width: hei(2.8)}}
              />
            </View>
          ),
        }}
      />

      <Bottom.Screen
        name={Navroute.Details}
        component={Detail}
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

  {/* <Bottom.Screen
        name={Navroute.Setting}
        component={Setting}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{marginBottom:hei(0.5)}}>
              <ARimage
                source={focused ? Images.settingactive : Images.settinginactive}
                style={style.imagestyle}
              />
            </View>
          ),
        }}
      /> */}

    </Bottom.Navigator>
    
  );
};

export default Bottomindex;

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
  },
});
