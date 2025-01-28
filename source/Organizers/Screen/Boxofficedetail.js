import React, { useEffect } from "react";
import {KeyboardAvoidingView, ScrollView, StyleSheet, View,Text, Platform, Dimensions } from 'react-native';
import { ARbutton, ARcontainer, ARtext, ARtextinput } from "../../common";
import {ARheader} from "../../common";
import { hei,wid,normalize, height, width, isIos } from "../../theme";
import Images from "../../Image/Images";
import { FontSize,FontFamily } from "../../theme";
import {Colors} from "../../theme";
import { useNavigation } from "@react-navigation/native";
import { Eventdropdown, Inputdata, Scbutton, Uploadphoto } from "../../Commoncompoenent";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { NativeModules } from "react-native";



const Boxofficedetail = () => {

    const navigation = useNavigation()

    return (
       <ARcontainer backgroundColor={Colors.backgroundcolor}>
            <ARheader
                lefttch={{paddingLeft: wid(1)}}
                texts={'Boxoffice Details'}
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
                    <Uploadphoto oneditpress={() => console.log('')}/>
                     <View style={style.inputcontainerview}>
                      <Inputdata
                        txtchildren={'Code'}
                        placeholder={'012345678'}
                        inputvalue={''}
                        onchange={v => console.log(v)}
                        />
                        <Inputdata
                        txtchildren={'Name'}
                        placeholder={'Enter your name'}
                        inputvalue={''}
                        onchange={v => console.log(v)}
                        />
                        <Inputdata
                        txtchildren={'Email ID'}
                        placeholder={'acto@gmail.com'}
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
                    <Eventdropdown eventpress={() => console.log('press')}/>
                    <View style={[style.inputcontainerview,{marginTop:hei(1)}]}>
                        <View style={style.eventview}>
                        <ARtextinput
                            Containerstyle={{
                              borderWidth: 1,
                            //   borderTopLeftRadius: normalize(6),
                              backgroundColor: Colors.backgroundcolor,
                              width:wid(70)
                            }}
                            Tipadding={7}
                            Tifontsize={FontSize.font12}
                            Tiheight={hei(4)}
                            Tiplaceholder={'Event Name'}
                            Tiplacrholdertextcolor={Colors.lable}
                            value={''}
                            onchangetext={(v) => console.log('s')}
                        />
                        <ARbutton Touchstyle={{height:hei(4.1),backgroundColor:Colors.purple,width:wid(14),borderRadius:0}}>
                            <ARtext children={'Reset'} color={Colors.White} />
                        </ARbutton>
                        </View>
                        <Inputdata
                        txtchildren={'Name'}
                        placeholder={'Actoscript'}
                        inputvalue={''}
                        onchange={v => console.log(v)}
                        />
                        <Inputdata
                        txtchildren={'To Amount'}
                        placeholder={'10'}
                        inputvalue={''}
                        onchange={v => console.log(v)}
                        />
                        <Inputdata
                        txtchildren={'From Amount'}
                        placeholder={'100'}
                        inputvalue={''}
                        onchange={v => console.log(v)}
                        />
                        <Inputdata
                        txtchildren={'Discount'}
                        placeholder={'10'}
                        inputvalue={''}
                        onchange={v => console.log(v)}
                        />
                    </View>
                    <Scbutton 
                    onsavepress={() => console.log('press')}
                    oncanclepress={() => console.log('pressd')} 
                    styles={{marginVertical:hei(3)}}
                    />
                </View>
                </KeyboardAwareScrollView>
       </ARcontainer>
    )
}

export default Boxofficedetail;

const style = StyleSheet.create({
    // scrollstyle: {
    //     flexGrow: 1,
    //     paddingHorizontal: wid(4),
    //   },
      containerview: {
      paddingHorizontal: wid(4),
      flex:1,
      // backgroundColor:"green"
      },
      inputcontainerview: {
        marginTop: hei(3),
        backgroundColor: Colors.progressbackground,
        borderWidth: normalize(1),
        borderColor: Colors.bordercolor,
        borderRadius: normalize(10),
        paddingHorizontal: wid(4),
        paddingVertical: hei(1.5),
      },
      eventview:{
        // backgroundColor:'red',
        overflow:"hidden",
        flexDirection:"row",
        alignItems:"center",
        borderRadius:normalize(6),
        marginVertical:hei(1)
    }
})