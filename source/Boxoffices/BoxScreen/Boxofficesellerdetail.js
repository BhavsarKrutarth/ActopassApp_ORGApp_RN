import React from "react";
import { StyleSheet, View } from 'react-native'
import { ARcontainer, ARheader } from "../../common";
import { useNavigation } from "@react-navigation/native";
import { Colors, FontFamily, FontSize, hei, isIos, normalize, wid } from "../../theme";
import Images from "../../Image/Images";
import { Inputdata, Scbutton, Uploadphoto } from "../../Commoncompoenent";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';


const Boxofficesellerdetail = () => {
      const navigation = useNavigation();
    
    return(
        <ARcontainer>
        <ARheader
            lefttch={{paddingLeft: wid(1)}}
            texts={'Account Details'}
            size={FontSize.font18}
            textcolor={Colors.Black}
            textfontfamily={FontFamily.SemiBold}
            tint={Colors.Black}
            Lefticon={Images.backarrow}
            headerleftimgstyle={{height: hei(2.5), width: hei(2.5)}}
            Leftpress={() => navigation.goBack()}
        />
       {/* <KeyboardAvoidingView
                behavior={isIos ? 'padding' : 'height'}
                keyboardVerticalOffset={ isIos ? 64 : hei(0)}
                style={{flex: 1}}> */}

      <KeyboardAwareScrollView
        extraScrollHeight={isIos ? hei(1) : hei(0.9)}
        keyboardShouldPersistTaps="handled" // Dismiss keyboard on outside tap
        enableOnAndroid={true}
        contentContainerStyle={{
          // flexGrow: 1,
          paddingHorizontal: wid(4),
          // backgroundColor:"red"
        }}
        enableAutomaticScroll={isIos ? true : false}>
        {/* <ScrollView
             contentContainerStyle={style.scrollstyle}
             keyboardShouldPersistTaps="handled"
             keyboardDismissMode={isIos ? 'on-drag' : 'interactive'}> */}

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
              txtchildren={'Password'}
              placeholder={'1234'}
              inputvalue={''}
              onchange={v => console.log(v)}
            />

            <Inputdata
              txtchildren={'Mobile No'}
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
    )
}

export default Boxofficesellerdetail;


const style = StyleSheet.create({
    scrollstyle: {
      flexGrow: 1,
      // backgroundColor: Colors.Placeholder,
      paddingHorizontal: wid(4),
    },
    containerview: {
      // paddingBottom:hei(1),
      // backgroundColor:"red"
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
  