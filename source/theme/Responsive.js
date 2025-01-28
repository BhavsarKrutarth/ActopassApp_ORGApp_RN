import { Dimensions,PixelRatio,Platform } from "react-native";

const {width,height} = Dimensions.get('window');

const isIos = Platform.OS =='ios'
const isAndroid = Platform.OS == 'android'
const isiPAD = height / width < 1.6;
const isTablet = height / width < 1.6;

function hei(percentage){
        const value = (percentage * height) / 100
        return PixelRatio.roundToNearestPixel(value)
}

function wid(percentage){
    const value = (percentage * width) / 100
    return PixelRatio.roundToNearestPixel(value)
}

const scale = width / 375;

function normalize(size) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    if (isiPAD) {
      return Math.round(newSize) - wp(1);
    } else {
      return Math.round(newSize);
    }
  } else {
    if (isTablet) {
      return Math.round(newSize) - wp(1);
    } else {
      return Math.round(newSize);
    }
  }
}

export {hei, wid, isAndroid, isIos, normalize, height, width}
