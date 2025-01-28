import React from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import Colors from '../theme/Color';
import { isIos } from '../theme';


const ARcontainer = ({
  backgroundColor,
  children,
  style,
  barStyle,
}) => {
  return (
    <SafeAreaView
      style={[{ flex: 1, backgroundColor: backgroundColor ||  Colors.White}]}>
      <View style={[{ flex: 1, backgroundColor: backgroundColor || Colors.White }, style]}>
        <StatusBar
          barStyle={barStyle ?? 'dark-content'}
          backgroundColor={Colors.White}
        />
        {children}
      </View>
    </SafeAreaView>
  );
};
export default ARcontainer;
