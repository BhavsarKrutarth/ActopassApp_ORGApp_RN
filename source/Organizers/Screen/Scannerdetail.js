import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ARcontainer} from '../../common';
import {Colors, isIos} from '../../theme';
import {hei, wid, normalize} from '../../theme';
import {FontSize, FontFamily} from '../../theme';
import Images from '../../Image/Images';
import {ARheader} from '../../common';
import {useNavigation} from '@react-navigation/native';
import {Inputdata, Scbutton, Uploadphoto} from '../../Commoncompoenent';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Scannerdetail = () => {
  const navigation = useNavigation();

  return (
    <ARcontainer backgroundColor={Colors.backgroundcolor}>
      <ARheader
        lefttch={{paddingLeft: wid(1)}}
        texts={'Scanner Details'}
        size={FontSize.font18}
        textcolor={Colors.Black}
        textfontfamily={FontFamily.SemiBold}
        tint={Colors.Black}
        Lefticon={Images.backarrow}
        headerleftimgstyle={{height: hei(2.5), width: hei(2.5)}}
        Leftpress={() => navigation.goBack()}
      />

      <KeyboardAwareScrollView
        contentContainerStyle={{
          // backgroundColor: "pink",
        }}
        enableAutomaticScroll={isIos ? true : false}  // Prevent automatic scroll behavior
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={true}
        extraHeight={0}
        extraScrollHeight={0} // Prevent extra space from being added when the keyboard opens
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0} // Adjust for platform-specific behavior
      >
       
        <View style={style.containerview}>
          <Uploadphoto oneditpress={() => console.log('')} />
          <View style={style.inputcontainerview}>
            <Inputdata
              txtchildren={'Code'}
              placeholder={'012345678'}
              inputvalue={''}
              onchange={v => console.log(v)}
            />

            <Inputdata
              txtchildren={'Name'}
              placeholder={'Enter your Name'}
              inputvalue={''}
              onchange={v => console.log(v)}
            />

            <Inputdata
              txtchildren={'Email ID'}
              placeholder={'Acto123@.com'}
              inputvalue={''}
              onchange={v => console.log(v)}
            />

            <Inputdata
              txtchildren={'Mobile No'}
              placeholder={'012345678'}
              inputvalue={''}
              onchange={v => console.log(v)}
            />

          <Inputdata
              txtchildren={'Password'}
              placeholder={'012345678'}
              inputvalue={''}
              onchange={v => console.log(v)}
            />
          </View>
          <Scbutton
            onsavepress={() => console.log('press')}
            oncanclepress={() => console.log('pressd')}
          />
        </View>
        {/* </ScrollView> */}
      </KeyboardAwareScrollView>
      {/* </KeyboardAvoidingView> */}
    </ARcontainer>
  );
};

export default Scannerdetail;

const style = StyleSheet.create({
  scrollstyle: {
    flexGrow: 1,
    // backgroundColor: Colors.Placeholder,
    paddingHorizontal: wid(4),
  },
  containerview: {
    // paddingBottom:hei(1),
    // backgroundColor:"red"
    paddingHorizontal: wid(4),
      flex:1,
  },
  inputcontainerview: {
    marginTop: hei(3),
    backgroundColor: Colors.White,
    borderWidth: normalize(1),
    borderColor: Colors.bordercolor,
    borderRadius: normalize(10),
    paddingHorizontal: wid(4),
    paddingVertical: hei(1.5),
  },
});
