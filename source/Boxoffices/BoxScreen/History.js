import React from "react";
import { View,Text, StyleSheet, ScrollView }  from 'react-native';
import { ARcontainer, ARheader, ARtext } from "../../common";
import { useNavigation } from "@react-navigation/native";
import { Colors, FontFamily, FontSize, hei,normalize,wid } from "../../theme";
import Images from "../../Image/Images";

const History = () => {

const navigation = useNavigation()

const seller = [
    {
        Id : '1',
        EventName: 'XYZ',
        EventDta: '30 Jan, 2024',
        MobileNo: '1122334455',
        Qly: '50',
        TicketType: 'XYZ',
    },
    {
        Id : '2',
        EventName: 'ABC',
        EventDta: '31 Jan, 2025',
        MobileNo: '1122334455',
        Qly: '40',
        TicketType: 'ABC',
    }
]



    return(
        <ARcontainer>
            <ARheader
            lefttch={{paddingLeft: wid(1)}}
            texts={'History'}
            size={FontSize.font18}
            textcolor={Colors.Black}
            textfontfamily={FontFamily.SemiBold}
            tint={Colors.Black}
            Lefticon={Images.backarrow}
            headerleftimgstyle={{height: hei(2.5), width: hei(2.5)}}
            Leftpress={() => navigation.goBack()}
            />
                <ScrollView style={style.scrollstyle}>
                        {
                            seller.map((item,index) => (
                            <View key={index} style={style.mainview}>
                                <View style={style.detailview}>
                                <View style={style.viewmargin}>
                                    <ARtext align={''} size={FontSize.font14}>
                                    Event Name: {''}
                                    <ARtext
                                        children={item.EventName}
                                        color={Colors.active}
                                        size={FontSize.font14}
                                    />
                                    </ARtext>
                                </View>

                                <View style={style.viewmargin}>
                                    <ARtext align={''} size={FontSize.font14}>
                                    Event Date: {''}
                                    <ARtext
                                        children={item.EventDta}
                                        color={Colors.active}
                                        size={FontSize.font14}
                                    />
                                    </ARtext>
                                </View>
                                <View style={style.viewmargin}>
                                    <ARtext align={''} size={FontSize.font14}>
                                   Mobile No: {''}
                                    <ARtext
                                        children={item.MobileNo}
                                        color={Colors.active}
                                        size={FontSize.font14}
                                    />
                                    </ARtext>
                                </View>

                                <View style={style.viewmargin}>
                                    <ARtext align={''} size={FontSize.font14}>
                                    Qly: {''}
                                    <ARtext
                                        children={item.Qly}
                                        color={Colors.active}
                                        size={FontSize.font14}
                                    />
                                    </ARtext>
                                </View>
                                <View style={style.viewmargin}>
                                    <ARtext align={''} size={FontSize.font14}>
                                    Ticket Type: {''}
                                    <ARtext
                                        children={item.TicketType}
                                        color={Colors.active}
                                        size={FontSize.font14}
                                    />
                                    </ARtext>
                                </View>

                                </View>
                            </View>))
                        }
                </ScrollView>
        </ARcontainer>
    )
}

export default History;

const style = StyleSheet.create({
  
    scrollstyle: {
        marginTop: hei(1.5),
        // backgroundColor:'red',
        flexGrow:1,
        marginHorizontal:wid(3),
      },
      mainview: 
      {
        marginTop: hei(1)
      },
      detailview: {
        backgroundColor: Colors.backgroundcolor,
        marginHorizontal: wid(3),
        paddingHorizontal: wid(4),
        paddingVertical: hei(2),
        borderWidth: normalize(1.5),
        borderColor: Colors.bordercolor,
        borderRadius: normalize(9),
        rowGap:hei(1)
      },
      viewmargin: {
        // marginTop: hei(0.8),
        justifyContent: 'center',
        // backgroundColor:'red'
      },
})