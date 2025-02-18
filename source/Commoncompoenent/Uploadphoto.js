import React from 'react';
import {StyleSheet} from 'react-native';
import { Colors,hei,wid,normalize } from '../theme';
import { View } from 'react-native';
import { ARimage } from '../common'
import {ARtext} from '../common';
import Images from '../Image/Images';
import { FontFamily,FontSize } from '../theme';
import {ARbutton} from '../common';

const Uploadphoto = ({oneditpress}) => {
  return (
    <View style={style.uploadview}>
      <View style={style.imageview}>
        <ARimage source={Images.man} style={style.image} />
      </View>
      <View style={style.uploadtext}>
        <ARtext
          children={'Upload Photo'}
          align={''}
          fontFamily={FontFamily.Bold}
          size={FontSize.font14}
        />
        <ARtext
          children={'Please add your photo'}
          align={''}
          size={FontSize.font14}
          color={Colors.line}
        />
      </View>
      <ARbutton
              Touchstyle={{
                height: hei(2),
                width: hei(2),
                position: 'absolute',
                top: hei(4),
                right: hei(1),
              }}
              backgroundColor={''}
              onpress={oneditpress}>
              <ARimage
                source={Images.edit}
                style={{height: hei(2), width: hei(2)}}
              />
            </ARbutton>

    </View>
  );
};

export default Uploadphoto;

const style = StyleSheet.create({
  uploadview: {
    // backgroundColor:'yellow',
    flexDirection: 'row',
  },
  imageview: {
    backgroundColor: Colors.lightgrey,
    justifyContent: 'center',
    alignItems: 'center',
    height: hei(8),
    width: wid(17),
    borderRadius: normalize(50),
  },
  image: {
    height: wid(10),
    width: wid(10),
  },
  uploadtext: {
    // backgroundColor:Colors.purple,
    width: wid(67),
    marginHorizontal: wid(4),
    justifyContent: 'center',
  },
});
