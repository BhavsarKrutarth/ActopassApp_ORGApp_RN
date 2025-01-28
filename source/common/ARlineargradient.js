import React from 'react';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../theme/Color';

const ARlineargradient = ({color, start, end, children, vstyle,lstyle}) => {
  
  
  

  return (
    <View style={[vstyle]}>
      <LinearGradient
        style={[lstyle]}
        colors={color ?? [Colors.light, Colors.dark]}
        start={start ?? {x: 0, y: 0}}
        end={end ?? {x: 1, y: 1}}>
        {children}
      </LinearGradient>
    </View>
  );
};

export default ARlineargradient;
