import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  SectionList,
} from 'react-native';
import {ARcontainer} from '../../common';
import {ARlineargradient} from '../../common';
import {Colors} from '../../theme';
import {hei, wid, normalize} from '../../theme';
import {ARimage} from '../../common';
import Images from '../../Image/Images';
import {ARtext} from '../../common';
import {FontFamily, FontSize} from '../../theme';
import {ARbutton} from '../../common';
import {useNavigation} from '@react-navigation/native';
import {ARheader} from '../../common';
import {ARprogressbar} from '../../common';
import {useSelector} from 'react-redux';
import { Dropdown } from 'react-native-element-dropdown';


const Home = () => {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const tempDataArray = [
    {
      id: 1,
      name: '137510',
      email: 'Total Book Tickets',
      info: 'Percentage',
      data: {
        Web: '20%',
        Mob: '20%',
        Erp: '40%',
      },
    },
    {
      id: 2,
      name: 'Bob',
      email: 'Total Sale',
      info: 'Amount',
      data: {
        Web: '30%',
        Mob: '40%',
        Erp: '60%',
      },
    },
    {
      id: 3,
      name: 'Charlie',
      email: 'Total Sale',
      info: 'Quantity',
      data: {
        Web: '12%',
        Mob: '14%',
        Erp: '15%',
      },
    },
  ];
  const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];
  const [currentindex, setcurrentindex] = useState(0);
  const [btn, setbtn] = useState(1);
  const [itm, setitm] = useState(tempDataArray[0].data);
  const [value,setValue] = useState(null)
  const [isFocus, setIsFocus] = useState(false);

  const onScroll = event => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / screenWidth);
    setcurrentindex(index);
  };

  const progressdata = percenatge => {
    return parseFloat(percenatge) / 100;
  };

  const dataset = item => {
    setbtn(item.id);
    setitm(item.data);
  };

  


  return (
    <ARcontainer backgroundColor={Colors.backgroundcolor}>
      <View style={{height: hei(43)}}>
        <ARlineargradient lstyle={{height: hei(22)}}>
          <ARheader
            texts={'ERP System'}
            // lefttch={{paddingLeft: wid(1)}}
            // Lefticon={Images.drawer}
            headerleftimgstyle={{height: hei(2.3), width: hei(2.3)}}
            size={FontSize.font17}
            textcolor={Colors.White}
            textfontfamily={FontFamily.SemiBold}
            // Leftpress={() => navigation.openDrawer()}
          />
         
          <View style={styles.secview}>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                showsVerticalScrollIndicator={false}
                containerStyle={styles.ContainerStyle}
                data={data}
                maxHeight={230}
                labelField="label"
                valueField="value"
                placeholder="Select Event"
                value={value}
                onChange={item => {
                  setValue(item.value);
                }}
                renderLeftIcon={() => (
                  <ARimage source={Images.event}
                  style={styles.eventimage}
                  tintColor={Colors.White}
                  />
                )}
              />
          </View>
          </ARlineargradient>

        <View style={styles.container}>
          <FlatList
            horizontal
            pagingEnabled
            onScroll={onScroll}
            showsHorizontalScrollIndicator={false}
            data={tempDataArray}
            keyExtractor={item => item.id.toString()}
            style={{width: wid(90)}}
            renderItem={({item}) => (
              <View style={styles.dashmainview}>
                <View style={styles.dashview}>
                  <View style={styles.contentview}>
                    <View
                      style={
                        {
                          // width: wid(50),
                          //  backgroundColor: 'blue'
                        }
                      }>
                      <ARtext
                        size={FontSize.font14}
                        fontFamily={FontFamily.Bold}
                        children={'Dashboard'}
                        align={''}
                      />
                      <ARtext
                        size={FontSize.font14}
                        children={'Organization Interface'}
                        align={''}
                        color={Colors.line}
                      />
                    </View>
                    <View
                      style={{
                        // width: wid(44),
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        // backgroundColor: 'pink',
                      }}>
                      <ARimage source={Images.actopass} style={styles.img} />
                    </View>
                  </View>
                  <View style={styles.salesview}>
                    <View style={styles.salsfontview}>
                      <ARtext
                        size={FontSize.font25}
                        fontFamily={FontFamily.Bold}
                        children={item.name}
                        align={''}
                      />
                      <ARtext
                        size={FontSize.font12}
                        children={item.email}
                        align={''}
                      />
                    </View>
                    <View style={styles.lineview}></View>
                    <View style={styles.salsfontview}>
                      <ARtext
                        size={FontSize.font25}
                        fontFamily={FontFamily.Bold}
                        children={item.name}
                        align={''}
                      />
                      <ARtext
                        size={FontSize.font12}
                        children={item.email}
                        align={''}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'center',
                    }}>
                    {tempDataArray.map((item, index) => (
                      <View
                        key={index}
                        style={[
                          styles.dot,
                          {
                            backgroundColor:
                              currentindex === index
                                ? Colors.active
                                : Colors.inactive,
                          },
                        ]}></View>
                    ))}
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </View>
      <View style={{marginHorizontal: wid(3)}}>
        <ARtext
          children={'Sell By Channal'}
          align={''}
          size={FontSize.font16}
          fontFamily={FontFamily.Bold}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: hei(1),
          }}>
          {tempDataArray.map((item, index) => (
            <View style={{width: wid(29)}} key={index}>
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
                  children={item.info}
                  color={btn === item.id ? Colors.White : Colors.Placeholder}
                  size={FontSize.font14}
                />
              </ARbutton>
            </View>
          ))}
        </View>
        <View style={styles.progresview}>
          <View style={styles.gap}>
            <View style={styles.content}>
              <ARtext size={FontSize.font12} children={'Web'} />
              <ARtext size={FontSize.font12} children={itm.Web} />
            </View>
            <View>
              <ARprogressbar
                progress={progressdata(itm.Web)}
                color={Colors.web}
              />
            </View>
          </View>
          <View style={styles.gap}>
            <View style={styles.content}>
              <ARtext size={FontSize.font12} children={'Mobile'} />
              <ARtext size={FontSize.font12} children={itm.Mob} />
            </View>
            <View>
              <ARprogressbar
                progress={progressdata(itm.Mob)}
                color={Colors.mob}
              />
            </View>
          </View>
          <View style={styles.gap}>
            <View style={styles.content}>
              <ARtext size={FontSize.font12} children={'ERP'} />
              <ARtext size={FontSize.font12} children={itm.Erp} />
            </View>
            <View>
              <ARprogressbar
                progress={progressdata(itm.Mob)}
                color={Colors.erp}
              />
            </View>
          </View>
        </View>
      </View>
    </ARcontainer>
  );
};

export default Home;

const styles = StyleSheet.create({
  dot: {
    width: wid(1.5),
    height: wid(1.5),
    borderRadius: normalize(50),
    marginHorizontal: wid(0.5),
  },
  container: {
    position: 'absolute',
    zIndex: 1,
    top: hei(15),
    backgroundColor: Colors.White,
    marginHorizontal: wid(3),
    paddingVertical: hei(2),
    paddingHorizontal: wid(2),
    borderRadius: normalize(12),
    borderWidth: normalize(2),
    borderColor: Colors.bordercolor,
  },
  dashmainview: {
    // backgroundColor: 'red',
    width: wid(90),
    alignItems: 'center',
  },
  dashview: {
    // backgroundColor: 'green',
    width: wid(88),
    // marginHorizontal:wid(1),
    // borderWidth: 1,
  },
  contentview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    // backgroundColor: 'yellow',
  },
  img: {
    height: hei(4),
    width: hei(4),
  },
  salesview: {
    // backgroundColor: 'pink',
    flexDirection: 'row',
    height: hei(15),
    justifyContent: 'space-between',
    paddingVertical: hei(2),
  },
  salsfontview: {
    width: wid(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  lineview: {
    borderWidth: 1,
    borderColor: Colors.line,
  },
  secview: {
    paddingHorizontal:wid(4),
    position:'absolute',
    zIndex:1,
    top:hei(7),
    width:wid(100),
    // backgroundColor:'red'
  },
  eventimage: {
    height: hei(2.3),
    width: hei(2.3),
    marginRight:wid(3)
  },
  progresview: {
    backgroundColor: Colors.White,
    marginTop: hei(2),
    borderRadius: normalize(9),
    borderWidth: normalize(1.5),
    borderColor: Colors.bordercolor,
    paddingHorizontal: wid(4),
    paddingVertical: hei(1.5),
    gap: hei(2),
  },
  gap: {
    gap: hei(0.5),
  },
  content: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  ContainerStyle:{
    // backgroundColor:"red",
    borderRadius:normalize(9),
    shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.3,
      shadowRadius: 2.41,

      elevation: 2,
  },
  dropdown: {
    paddingHorizontal:wid(4),
    height: hei(5),
    borderColor: 'white',
    borderWidth: normalize(1.5),
    borderRadius:normalize(9),
  },
  placeholderStyle: {
    fontSize: FontSize.font15,
    color:"white"
  },
  selectedTextStyle: {
    fontSize: FontSize.font16,
    color:'white'
  },
  iconStyle: {
    width: 20,
    height: 20,
    tintColor:'white'
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
