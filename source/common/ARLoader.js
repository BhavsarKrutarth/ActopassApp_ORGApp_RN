import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Colors} from '../theme';
import ARstyle from './ARstyle';

const ARLoader = ({visible, style, color, size}) => {
  return visible ? (
    <View style={[styles.Container, style]}>
      <ActivityIndicator size={size ?? 'large'} color={color || Colors.Grey} />
    </View>
  ) : null;
};
const styles = StyleSheet.create({
  Container: {
    alignItems: 'center',
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.White + '10',
    zIndex: 10000,
  },
});
export default ARLoader;
