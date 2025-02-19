import React from 'react';
import {Image, View} from 'react-native';
import Images from '../Image/Images';
import ARstyle from './ARstyle';
import Colors from '../theme/Color';

const ARimage = ({source, resizemode, style,tintColor}) => {

  return (
    <Image
      source={source}
      resizeMode={resizemode ?? 'contain'}
      style={[ARstyle.image100, style]}
      tintColor={tintColor}
      
    />
  );
};

export default ARimage;
