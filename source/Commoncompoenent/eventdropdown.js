import React from "react";
import { StyleSheet,View } from 'react-native'
import { hei,wid,normalize } from "../theme";
import {Colors} from "../theme";
import { FontFamily,FontSize } from "../theme";
import { ARtext } from "../common";
import {ARbutton} from "../common";

const Eventdropdown = ({eventpress}) => {
    return(
        <View style={style.textassignview}>
              <View style={style.txtsubview}>
                <ARtext children={'Ticket Assign'} align={''} size={FontSize.font14} fontFamily={FontFamily.Bold}/>
              </View>
              <View style={[style.txtsubview,{alignItems:"flex-end"}]}>
                <ARbutton onpress ={eventpress} Touchstyle={{height:hei(4),width:wid(22.5),borderRadius:normalize(7),borderWidth:normalize(1),backgroundColor:Colors.lightgrey,borderColor:Colors.bordercolor}}>
                      <ARtext children={'Event'} align={''} size={FontSize.font12} color={Colors.lable}/>
                </ARbutton>
              </View>
          </View>  
    )
}

export default Eventdropdown;

const style = StyleSheet.create({
    textassignview:{
        // backgroundColor:"yellow",
        flexDirection:"row",
        justifyContent:"space-between",
        marginVertical:hei(2)
      },
      txtsubview:{
        // backgroundColor:"red",
        width:wid(45),
        justifyContent:"center"
      }
})