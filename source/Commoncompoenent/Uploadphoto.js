import React from 'react';
import {StyleSheet} from 'react-native';
import { Colors,hei,wid,normalize } from '../theme';
import { View } from 'react-native';
import { ARimage } from '../common'
import {ARtext} from '../common';
import Images from '../Image/Images';
import { FontFamily,FontSize } from '../theme';
import {ARbutton} from '../common';

const Uploadphoto = ({oneditpress,onpress,Imagedata,editicontrue,validate,Addphotoicon,maintext,subtext}) => {
  return (
    <View style={style.uploadview}>
      {/* <ARbutton Touchstyle={style.imageview(validate)} disable={true}>
        <ARimage source={Imagedata ? {uri:Imagedata} : Images.man} style={Imagedata ? '' : style.image} />
      </ARbutton> */}
      <View style={style.uploadtext}>
        {/* <ARtext
          children={maintext ?? 'Upload Photo'}
          align={''}
          fontFamily={FontFamily.Bold}
          size={FontSize.font14}
        /> */} 
        <ARtext align={''} fontFamily={FontFamily.Medium} size={FontSize.font14}>
          Code: {' '}
          <ARtext children={maintext} size={FontSize.font13} color={Colors.active}/>
        </ARtext>
        <ARtext
          // children={subtext ?? 'Please add your photo'}
          children={subtext}
          align={''}
          size={FontSize.font12}
          color={Colors.active}
        />
      </View>
      {editicontrue && (
          <ARbutton
              Touchstyle={{
                height: hei(2),
                width: hei(2),
                position: 'absolute',
                top: hei(1.5),
                right: hei(1.5),
              }}
              backgroundColor={''}
              onpress={oneditpress}>
              <ARimage
                source={Images.edit}
                style={{height: hei(2), width: hei(2)}}
              />
          </ARbutton>
      )}

      {Addphotoicon && (
          <ARbutton
              Touchstyle={{
                height: hei(2),
                width: hei(2),
                position: 'absolute',
                top: hei(5.3),
                left: hei(6),
              }}
              backgroundColor={''}
              onpress={onpress}>
              <ARimage
                source={Images.creation}
                style={{height: hei(2), width: hei(2)}}
                // tintColor={''}
              />
          </ARbutton>
      )}
    </View>
  );
};

export default Uploadphoto;

const style = StyleSheet.create({
  uploadview: {
    backgroundColor:Colors.White,
    flexDirection: 'row',
    borderWidth:normalize(1),
    borderRadius:normalize(5),
    borderColor:Colors.bordercolor,
    paddingVertical:hei(1.5),
    paddingHorizontal:wid(4)
  },
  imageview: (validate) => ({
    backgroundColor: Colors.lightgrey,
    justifyContent: 'center',
    alignItems: 'center',
    height: hei(8),
    width: hei(8),
    borderRadius: normalize(50),
    overflow:"hidden",
    borderColor:validate ? 'red' : '',
    borderWidth:validate ? normalize(1) : normalize(0)
  }),
  image: {
    height: wid(8.5),
    width: wid(8.5),
  },
  uploadtext: {
    // backgroundColor:Colors.purple,
    // width: wid(67),
    // marginHorizontal: wid(4),
    justifyContent: 'center',
    gap:2
  },
});
