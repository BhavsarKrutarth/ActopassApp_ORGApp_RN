import React from 'react';
import {KeyboardAvoidingView, StyleSheet, Text, View} from 'react-native';
import {
  ARbutton,
  ARcontainer,
  ARheader,
  ARimage,
  ARtext,
  ARtextinput,
} from '../../common';
import {
  Colors,
  FontSize,
  FontFamily,
  hei,
  wid,
  normalize,
  height,
  width,
  isIos,
} from '../../theme';
import Images from '../../Image/Images';
import {ScrollView} from 'react-native-gesture-handler';
import {
  Eventdropdown,
  Inputdata,
  Scbutton,
  Uploadphoto,
} from '../../Commoncompoenent';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Sellerdetail = () => {
  const navigation = useNavigation();

  return (
    <ARcontainer backgroundColor={Colors.backgroundcolor}>
      <ARheader
        lefttch={{paddingLeft: wid(1)}}
        texts={'Sellers Details'}
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
            enableAutomaticScroll={isIos ? true : false}  
            enableOnAndroid={true}
            keyboardShouldPersistTaps="handled"
            scrollEnabled={true}
            extraHeight={0}
            extraScrollHeight={0} 
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0} 
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
              placeholder={'Enter Your Name'}
              inputvalue={''}
              onchange={v => console.log(v)}
            />
            <Inputdata
              txtchildren={'Email ID'}
              placeholder={'abc@gmail.com'}
              inputvalue={''}
              onchange={v => console.log(v)}
            />
            <Inputdata
              txtchildren={'Password'}
              placeholder={'125896325'}
              inputvalue={''}
              onchange={v => console.log(v)}
            />
            <Inputdata
              txtchildren={'Mobile No'}
              placeholder={'012589632584'}
              inputvalue={''}
              onchange={v => console.log(v)}
            />
          </View>

          <Scbutton
            onsavepress={() => console.log('press')}
            oncanclepress={() => console.log('pressd')}
          />

          <Eventdropdown eventpress={() => console.log('press')} />

          <View style={[style.inputcontainerview, {marginTop: hei(0)}]}>
            <View style={style.content}>
              <View style={style.codeview}>
                <ARtext
                  align={''}
                  size={FontSize.font14}
                  children={'Event 1'}
                />
              </View>

              <View style={[style.codeview, {alignItems: 'flex-end'}]}>
                <View style={style.imageview}>
                  <ARbutton
                    height={hei(2)}
                    width={hei(2)}
                    borderRadius={0}
                    backgroundColor={''}
                    onpress={() => console.log('press')}>
                    <ARimage
                      source={Images.selectevent}
                      style={style.imagestyle}
                    />
                  </ARbutton>

                  <ARbutton
                    height={hei(2)}
                    width={hei(2)}
                    borderRadius={0}
                    backgroundColor={''}>
                    <ARimage source={Images.delete} style={style.imagestyle} />
                  </ARbutton>
                </View>
              </View>
            </View>
            <Inputdata
              txtchildren={'Name'}
              placeholder={'Suvarn Navaratri'}
              inputvalue={''}
              onchange={v => console.log(v)}
            />
            <Inputdata
              txtchildren={'Ticket Type'}
              placeholder={'Gold'}
              inputvalue={''}
              onchange={v => console.log(v)}
            />
            <Inputdata
              txtchildren={'Avaiable Ticket'}
              placeholder={'9950'}
              inputvalue={''}
              onchange={v => console.log(v)}
            />
            <Inputdata
              txtchildren={'Name'}
              placeholder={'60'}
              inputvalue={''}
              onchange={v => console.log(v)}
            />
          </View>
        </View>
        {/* </ScrollView> */}
      </KeyboardAwareScrollView>
      {/* </KeyboardAvoidingView> */}
    </ARcontainer>
  );
};

export default Sellerdetail;

const style = StyleSheet.create({
  scrollstyle: {
    flexGrow: 1,
    // backgroundColor:Colors.Placeholder,
    paddingHorizontal: wid(4),
  },
  containerview: {
    // paddingBottom:hei(1),
    // backgroundColor:"red"
    paddingHorizontal:wid(4),
    flex:1
    
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
  content: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    // backgroundColor:"red",
    marginBottom: hei(1),
  },
  codeview: {
    width: wid(41),
    justifyContent: 'center',
    // backgroundColor:"yellow"
  },
  imageview: {
    flexDirection: 'row',
    // backgroundColor:"green",
    width: wid(20.5),
    justifyContent: 'flex-end',
    columnGap: wid(3),
  },
  imagestyle: {
    height: hei(2),
    width: hei(2),
  },
});
