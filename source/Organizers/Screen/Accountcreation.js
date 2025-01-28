import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {ARcontainer} from '../../common';
import {ARheader} from '../../common';
import {hei, wid, normalize, height} from '../../theme';
import {FontFamily, FontSize} from '../../theme';
import {Colors} from '../../theme';
import {ARbutton} from '../../common';
import {ARtext} from '../../common';
import {ARimage} from '../../common';
import Images from '../../Image/Images';
import {useNavigation} from '@react-navigation/native';
import Navroute from '../navigation/Navroute';

const Accountcreation = ({}) => {
  const navigation = useNavigation();

  const tempdata = [
    {
      id: 1,
      name: 'Seller',
      detail: [
        {
          Code: 'SEL-0001',
          Name: 'ABC',
          Mobile: '1122334455',
          Email: 'acto@gmail.com',
          CratedBy: 'Actopass',
        },
        {
          Code: 'SEL-0002',
          Name: 'XYZ',
          Mobile: '0123456789',
          Email: 'Test@gmail.com',
          CratedBy: 'Actopass',
        },
      ],
    },
    {
      id: 2,
      name: 'Box office',
      detail: [
        {
          Code: 'Box-0001',
          Name: 'DEF',
          Mobile: '1234567890',
          Email: 'acto@gmail.com',
          CratedBy: 'Actopass',
        },
        {
          Code: 'Box-0002',
          Name: 'GHI',
          Mobile: '112233445566',
          Email: 'Test@gmail.com',
          CratedBy: 'Actopass',
        },
      ],
    },
    {
      id: 3,
      name: 'Scanner',
      detail: [
        {
          Code: 'Sca-0001',
          Name: 'JKL',
          Mobile: '8787878787',
          Email: 'acto@gmail.com',
          CratedBy: 'Actopass',
        },
        {
          Code: 'Sca-0002',
          Name: 'MNO',
          Mobile: '9090909090',
          Email: 'Test@gmail.com',
          CratedBy: 'Actopass',
        },
      ],
    },
  ];

  const [btn, setbtn] = useState(1);
  const [sellerdata, setsellerdata] = useState(tempdata[0].detail);

  const dataset = item => {
    setbtn(item.id);
    setsellerdata(item.detail);
  };

  const typeWiseNavigatios = () => {
    if (btn === 1) {
      navigation.navigate(Navroute.Sellerdetail);
    } else if (btn === 2) {
      navigation.navigate(Navroute.Boxofficedatail);
    } else {
      navigation.navigate(Navroute.Scannerdetail);
    }
  };

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
              backgroundColor={btn === item.id ? Colors.button : Colors.White}
              height={hei(4.5)}
              Touchstyle={{
                borderRadius: normalize(9),
                borderWidth: normalize(1.5),
                borderColor: Colors.bordercolor,
              }}>
              <ARtext
                children={item.name}
                color={btn === item.id ? Colors.White : Colors.Placeholder}
                size={FontSize.font14}
              />
            </ARbutton>
          </View>
        ))}
      </View>
      <ScrollView style={style.scrollstyle}>
        {sellerdata.map((item, index) => (
          <View style={[style.mainview]} key={index}>
            <View key={index} style={[style.detailview]}>
              <View style={style.content}>
                <View style={style.codeview}>
                  <ARtext align={''} size={FontSize.font14}>
                    Code: {''}
                    <ARtext
                      children={item.Code}
                      color={Colors.active}
                      size={FontSize.font14}
                    />
                  </ARtext>
                </View>

                <View style={[style.codeview, {alignItems: 'flex-end'}]}>
                  <View style={style.imageview}>
                    <ARbutton
                      height={hei(2)}
                      width={hei(2)}
                      borderRadius={0}
                      backgroundColor={''}
                      onpress={() => typeWiseNavigatios()}>
                      <ARimage source={Images.edit} style={style.imagestyle} />
                    </ARbutton>
                    <View style={style.line}></View>

                    <ARbutton
                      height={hei(2)}
                      width={hei(2)}
                      borderRadius={0}
                      backgroundColor={''}>
                      <ARimage
                        source={Images.delete}
                        style={style.imagestyle}
                      />
                    </ARbutton>
                  </View>
                </View>
              </View>

              <View style={style.viewmargin}>
                <ARtext align={''} size={FontSize.font14}>
                  Name: {''}
                  <ARtext
                    children={item.Name}
                    color={Colors.active}
                    size={FontSize.font14}
                  />
                </ARtext>
              </View>

              <View style={style.viewmargin}>
                <ARtext align={''} size={FontSize.font14}>
                  Mobile: {''}
                  <ARtext
                    children={item.Mobile}
                    color={Colors.active}
                    size={FontSize.font14}
                  />
                </ARtext>
              </View>

              <View style={style.viewmargin}>
                <ARtext align={''} size={FontSize.font14}>
                  Email: {''}
                  <ARtext
                    children={item.Email}
                    color={Colors.active}
                    size={FontSize.font14}
                  />
                </ARtext>
              </View>

              <View style={style.viewmargin}>
                <ARtext align={''} size={FontSize.font14}>
                  Crated By:{' '}
                  <ARtext
                    color={Colors.active}
                    size={FontSize.font14}
                    children={item.CratedBy}
                  />
                </ARtext>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
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
});
