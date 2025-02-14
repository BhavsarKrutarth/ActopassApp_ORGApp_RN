import React, { useEffect, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  ARbutton,
  ARcontainer,
  ARheader,
  ARimage,
  ARlineargradient,
  ARtext,
} from '../../common';
import {
  Colors,
  FontFamily,
  FontSize,
  hei,
  height,
  isIos,
  normalize,
  wid,
} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import Images from '../../Image/Images';
import {Inputdata, Ticketquantitiy} from '../../Commoncompoenent';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Ticketsend = () => {
  const navigation = useNavigation();

  const Tickets= [
    {
      Id:'1',
      Type:'GOLDEN ZONE',
      Price:'200'
    },
    {
      Id:'2',
      Type:'PLATNIUM ZONE',
      Price:'400'
    },
  ]
  
  const [QTYdata, SetQTYdata] = useState([]);
  const [TotalQty,SetToatalQty] = useState({
    TQTY:0,
    TPRICE:0
  })

  useEffect(() => {
      let totalprice = 0;
      let totqty = 0
        for(let i =  0; i < QTYdata.length; i++ ){
          totalprice += QTYdata[i].QTY * QTYdata[i].Price
          totqty += QTYdata[i].QTY
        }
        SetToatalQty({
          TQTY:totqty,
          TPRICE:totalprice
        })
    },[QTYdata])
  
  
    const increaseQTY = v => {
      if (QTYdata.length === 0) {
        SetQTYdata([v]);
      } else {
        let newdata = [];
        for (let i = 0; i < QTYdata.length; i++) {
          if (QTYdata[i].Type === v.Type) {
            SetQTYdata(prev =>
              prev.map(item =>
                item.Type == QTYdata[i].Type ? {...QTYdata[i], QTY: v.QTY} : item,
              ),
            );
            return;
          } else {
            newdata.push(v)
          }      
        }
        SetQTYdata((prev) => ([...prev,...newdata]) )
      }
    };

  return (
    <ARcontainer backgroundColor={Colors.backgroundcolor}>
      <View>
        <ARlineargradient>
          <ARheader
            texts={'ERP system'}
            size={FontSize.font17}
            textcolor={Colors.White}
            textfontfamily={FontFamily.SemiBold}
          />
        </ARlineargradient>
      </View>

      <KeyboardAwareScrollView
        contentContainerStyle={{paddingBottom:hei(10)}}
        enableAutomaticScroll={isIos ? true : false} // Prevent automatic scroll behavior
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={true}
        extraHeight={0}
        extraScrollHeight={0} // Prevent extra space from being added when the keyboard opens
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0} // Adjust for platform-specific behavior
      >
        <View style={styles.heightview}>
          <View
            style={styles.shadowview}>
            <View style={styles.secview}>
              <ARbutton Touchstyle={styles.tochstyle}>
                <View style={styles.buttonview}>
                  <ARimage
                    source={Images.event}
                    style={styles.eventimage}
                    tintColor={Colors.Placeholder}
                  />
                  <View style={styles.tetview}>
                    <ARtext
                      children={'Event'}
                      fontFamily={FontFamily.SemiBold}
                      color={Colors.Placeholder}
                      align={''}
                      size={FontSize.font13}
                    />
                  </View>
                  <ARimage
                    source={Images.downarrow}
                    style={styles.downarrpeimg}
                    tintColor={Colors.Placeholder}
                  />
                </View>
              </ARbutton>
            </View>
            {/* </ARlineargradient> */}

            <View style={styles.container}>
              <View style={styles.dashview}>
                <View>
                  <ARtext
                    size={FontSize.font16}
                    fontFamily={FontFamily.Bold}
                    children={'Dashboard'}
                    align={''}
                  />

                  <ARtext
                    size={FontSize.font14}
                    children={'Organization Interface'}
                    align={''}
                    color={Colors.Text}
                  />
                </View>
                <View style={styles.profileimageview}>
                  <ARimage
                    source={Images.exa}
                    style={styles.profileimage}
                    resizemode={'stretch'}
                  />
                </View>
              </View>
              <View style={styles.location}>
                <ARtext
                  children={'Location'}
                  align={''}
                  size={FontSize.font12}
                  color={Colors.Text}
                />
              </View>
              <View style={styles.eventndetailview}>
                <ARtext size={FontSize.font13}>
                  Event Detail: {''}
                  <ARtext
                    children={'EVN-0002'}
                    size={FontSize.font14}
                    fontFamily={FontFamily.SemiBold}
                    align={''}
                  />
                </ARtext>
                <ARtext
                  children={'Surat'}
                  size={FontSize.font14}
                  color={Colors.Placeholder}
                  align={''}
                />
              </View>
              <View style={styles.eventname}>
                <ARtext size={FontSize.font13} align={''}>
                  Event Name: {''}
                  <ARtext
                    children={'ActoScript Online Workshop'}
                    size={FontSize.font14}
                    fontFamily={FontFamily.SemiBold}
                    align={''}
                  />
                </ARtext>
              </View>
              <ARbutton Touchstyle={styles.ticketupload}>
                <ARimage
                  source={Images.ticket}
                  style={styles.tiketimage}
                  tintColor={Colors.White}
                />
                <ARtext
                  children={'BULK TICKETS UPLOAD'}
                  size={FontSize.font12}
                  align={''}
                  color={Colors.White}
                  fontFamily={FontFamily.Bold}
                />
              </ARbutton>
            </View>
          </View>
        </View>

        <View style={styles.inputcontainerview}>
          <Inputdata
            txtchildren={'Name'}
            placeholder={'Enter Your Name'}
            inputvalue={''}
            onchange={v => console.log(v)}
          />
          <Inputdata
            txtchildren={'Mobile No'}
            placeholder={'Enter Your Number'}
            inputvalue={''}
            onchange={v => console.log(v)}
          />
          <Inputdata
            txtchildren={'Confirm Mobile No'}
            placeholder={'Enter Your Number'}
            inputvalue={''}
            onchange={v => console.log(v)}
          />
          <Inputdata
            txtchildren={'Remark'}
            placeholder={'125896325'}
            inputvalue={''}
            onchange={v => console.log(v)}
          />
          <Inputdata
            txtchildren={'Select Date'}
            placeholder={'Enter Date'}
            inputvalue={''}
            onchange={v => console.log(v)}
          />
        </View>


      <View style={styles.ticketdetail}>
              <ARtext
                children={'Loream Pique'}
                align={''}
                size={FontSize.font14}
                fontFamily={FontFamily.Bold}
              />
              {Tickets.map((item, index) => (
                <Ticketquantitiy
                  key={index}
                  item={item}
                  onincrese={v => increaseQTY(v)}
                  ondecrese={v => increaseQTY(v)}
                />
              ))}
            </View>
       

        
        <View style={styles.gridview}>
        {QTYdata.length >= 1 ?(
              <View style={styles.maingrid}>
                  <View style={styles.gridlist}>
                        {
                          QTYdata.map((item,index) => (
                            <View key={index} style={styles.datalist}>
                              <ARtext children={item.Type} align={''} size={FontSize.font15} fontFamily={FontFamily.SemiBold}/>
                              <View style={{marginTop:hei(0.6)}}>
                                <ARtext children={`Qty: ${item.QTY}`} size={FontSize.font14} align={''}/>
                                <ARtext children={`Price: ${item.Price}`} size={FontSize.font14} align={''}/>
                              </View>
                            </View>
                          ))
                        }
                  </View>
                  <View style={styles.btnview}>
                        <View style={{rowGap:hei(0.4)}}>
                          <ARtext 
                          children={`Qty: ${TotalQty.TQTY}`} 
                          size={FontSize.font14} 
                          fontFamily={FontFamily.SemiBold}
                          align={''}
                          color={Colors.Placeholder}
                          />
                          <ARtext 
                          children={`${TotalQty.TPRICE}`} 
                          size={FontSize.font17} 
                          fontFamily={FontFamily.Bold}
                          align={''}
                          />
                        </View>
                        <View>
                            <ARbutton Touchstyle={{backgroundColor:Colors.btncolor,height:hei(5.6),width:wid(60),borderRadius:normalize(7)}}>
                              <ARtext 
                              children={'Send Now'} 
                              color={Colors.White}
                              size={FontSize.font14}
                              fontFamily={FontFamily.SemiBold}
                              />
                            </ARbutton>
                        </View>
                  </View>
              </View> ) : null}


        </View>
        
      </KeyboardAwareScrollView>
    </ARcontainer>
  );
};

export default Ticketsend;

const styles = StyleSheet.create({
  secview: {
    // alignItems: 'center',
    paddingHorizontal: wid(3),
  },
  tochstyle: {
    marginTop: hei(2),
    height: hei(5),
    width: wid(94),
    borderRadius: 20,
    backgroundColor: '',
    borderWidth: normalize(1.5),
    borderColor: Colors.line,
    justifyContent: '',
    alignItems: '',
    paddingHorizontal: wid(4),
  },
  buttonview: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tetview: {
    flex: 1,
    marginLeft: wid(3),
    marginTop: hei(0),
  },
  eventimage: {
    height: hei(2.3),
    width: hei(2.3),
  },
  downarrpeimg: {
    height: hei(1.5),
    width: hei(1.5),
  },
  container: {
    position: 'absolute',
    zIndex: 1,
    top: hei(9),
    backgroundColor: Colors.White,
    marginHorizontal: wid(3),
    paddingVertical: hei(2),
    paddingHorizontal: wid(4),
    borderRadius: normalize(12),
    borderWidth: normalize(2),
    width: wid(94),
    borderColor: Colors.bordercolor,
  },
  dashview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileimageview: {
    backgroundColor: Colors.lable,
    height: hei(5),
    width: hei(5),
    borderRadius: normalize(50),
  },
  profileimage: {
    height: hei(5),
    width: hei(5),
  },
  location: {
    alignItems: 'flex-end',
    marginVertical: hei(0.6),
  },
  eventndetailview: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    // alignItems: 'center',
    // backgroundColor:'red'
  },
  eventname: {
    marginTop: hei(0.7),
  },
  tiketimage: {
    height: hei(2.2),
    width: hei(2.2),
  },
  ticketupload: {
    height: hei(4),
    backgroundColor: Colors.btncolor,
    borderRadius: normalize(5),
    marginTop: hei(1.8),
    marginBottom: hei(0.5),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // paddingVertical:hei(1),
    // paddingHorizontal:wid(1),
    alignItems: 'center',
    width: wid(isIos ? 50 : 52),
  },
  inputcontainerview: {
    // marginTop: hei(3),
    backgroundColor: Colors.White,
    borderWidth: normalize(1),
    borderColor: Colors.bordercolor,
    borderRadius: normalize(10),
    paddingHorizontal: wid(4),
    paddingVertical: hei(1.5),
    marginHorizontal: wid(4),
  },
  heightview:{
    height: hei(isIos ? 36 : 39), 
    backgroundColor: ''
  },
  shadowview:{
      height: hei(16.5),
      backgroundColor: Colors.White,
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.1,
      shadowRadius: 6,
      shadowColor: Colors.Black,
      elevation: 5,
  },
  ticketdetail:{
    marginHorizontal:wid(4),
    rowGap:hei(1.5),
    marginVertical:hei(3)
  },
  ticketzone:{
    rowGap:hei(1.5),
    // backgroundColor:'red'
  },
  zoneview:{
  },
  gridview:{
    marginHorizontal:wid(4),
    paddingVertical:hei(1),
    // backgroundColor:"pink",
    rowGap:hei(3)
  },
  gridbtn:{
    // backgroundColor:'red',
    justifyContent:"center",
    alignItems:"flex-end"
  },
  maingrid:{
    borderWidth:normalize(1.5),
    borderRadius:normalize(7),
    borderColor:Colors.bordercolor,
    rowGap:hei(0.4),
    backgroundColor:Colors.bordercolor
  },
  gridlist:{
    paddingHorizontal:wid(3),
    paddingVertical:hei(2),
    rowGap:hei(1.5),
    backgroundColor:Colors.White,
    borderTopLeftRadius:normalize(10),
    borderTopRightRadius:normalize(10)
  },
  datalist:{
      paddingHorizontal:wid(3),
      paddingVertical:hei(2),
      borderRadius:normalize(7),
      backgroundColor:Colors.lightgrey,
      borderColor:Colors.purple,
      borderLeftWidth:wid(1)
    },
    btnview:{
      justifyContent:"space-between",
      flexDirection:'row',
      paddingHorizontal:wid(3),
      backgroundColor:Colors.White,      
      paddingBottom:hei(2),
      alignItems:"center",
      paddingVertical:hei(2),
      borderBottomLeftRadius:normalize(10),
      borderBottomRightRadius:normalize(10)
    }

});
