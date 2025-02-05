import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {ARcontainer, ARLoader} from '../../common';
import {ARheader} from '../../common';
import {hei, wid, normalize, height, isIos} from '../../theme';
import {FontFamily, FontSize} from '../../theme';
import {Colors} from '../../theme';
import {ARbutton} from '../../common';
import {ARtext} from '../../common';
import {ARimage} from '../../common';
import Images from '../../Image/Images';
import {useNavigation} from '@react-navigation/native';
import Navroute from '../navigation/Navroute';
import Sellerlist from './sellerlist';
import Boxofficelist from './boxofficelist';


const Accountcreation = ({}) => {
  const navigation = useNavigation();
  const [btn, setbtn] = useState(1);
  const tempdata = [
    {
      Id: 1,
      name: 'Seller',
      detail: [
        
      ],
    },
    {
      Id: 2,
      name: 'Box office',
      detail: [
        
      ],
    },
    {
      Id: 3,
      name: 'Scanner',
      detail: [
        
      ],
    },
  ];
  
  const dataset = item => {
    setbtn(item.Id);
    // setsellerdata(item);
  };

// if (Loading) return <ARLoader visible={Loading}/>


  return (
    <ARcontainer>
      <ARheader
        lefttch={{paddingLeft: wid(1)}}
        texts={'Accounts Details'}
        Lefticon={Images.backarrow}
        headerleftimgstyle={{height: hei(2.5), width: hei(2.5)}}
        size={FontSize.font18}
        textcolor={Colors.Black}
        textfontfamily={FontFamily.SemiBold}
        tint={Colors.Black}
        Leftpress={() => navigation.goBack()}
      />
      <View style={style.mapview}>
        {tempdata.map((item, index) => (
          <View style={style.btnview} key={index}>
            <ARbutton
              onpress={() => dataset(item)}
              backgroundColor={btn === item.Id ? Colors.button : Colors.White}
              height={hei(4.5)}
              Touchstyle={{
                borderRadius: normalize(9),
                borderWidth: normalize(1.5),
                borderColor: Colors.bordercolor,
              }}>
              <ARtext
                children={item.name}
                color={btn === item.Id ? Colors.White : Colors.Placeholder}
                size={FontSize.font14}
              />
            </ARbutton>
          </View>
        ))}
      </View>
      
        {btn === 1 ? <Sellerlist /> : btn === 2 ? <Boxofficelist/> : ''}
     
      <View style={style.addbutton}>
              <ARbutton
                Touchstyle={{
                  height: hei(6.5),
                  width: hei(6.5),
                  borderRadius: normalize(50),
                  backgroundColor:""
                }}
                onpress={() => navigation.navigate(Navroute.Createseller,{Id:btn})}
              >
                <ARimage source={Images.accountcreation} 
                style={{}}/>
              </ARbutton>
      </View>
            
    </ARcontainer>
  );
};

export default Accountcreation;

const style = StyleSheet.create({
  mapview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hei(1),
    marginHorizontal: wid(3),
  },
  btnview: {
    width: wid(30),
  },
  detailview: {
    backgroundColor: Colors.backgroundcolor,
    marginHorizontal: wid(3),
    paddingHorizontal: wid(4),
    paddingVertical: hei(2),
    borderWidth: normalize(1.5),
    borderColor: Colors.bordercolor,
    borderRadius: normalize(9),
  },
  scrollstyle: {
    marginTop: hei(1.5),
    paddingBottom:wid(18),
    // backgroundColor:"red"
  },
  mainview: {
    marginTop: hei(1),
  },
  content: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  codeview: {
    width: wid(42),
    justifyContent: 'center',
  },
  imageview: {
    flexDirection: 'row',
    gap: wid(2),
  },
  imagestyle: {
    height: hei(2.5),
    width: hei(2.5),
  },
  viewmargin: {
    marginTop: hei(0.8),
    justifyContent: 'center',
  },
  line: {
    borderWidth: 1,
    borderColor: Colors.bordercolor,
  },
  addbutton: {
    // backgroundColor: "red",
    height: hei(6.5),
    width: hei(6.5),
    borderRadius: normalize(50),
    position: "absolute",
    bottom: hei(isIos ? 9 : 11),
    right: wid(4),
  },
});
