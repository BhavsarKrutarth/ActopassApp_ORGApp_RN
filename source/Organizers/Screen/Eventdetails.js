import React from 'react';
import {ScrollView, StyleSheet, View, Text} from 'react-native';
import {ARcontainer, ARimage, ARtext} from '../../common';
import {ARheader} from '../../common';
import {hei, wid, normalize} from '../../theme';
import {FontSize, FontFamily} from '../../theme';
import Images from '../../Image/Images';
import {Colors} from '../../theme';
import {useNavigation} from '@react-navigation/native';

const Eventdetail = () => {
  const navigation = useNavigation();

  return (
    <ARcontainer>
      <ARheader
        lefttch={{paddingLeft: wid(1)}}
        texts={'Event Details'}
        size={FontSize.font18}
        textcolor={Colors.Black}
        textfontfamily={FontFamily.SemiBold}
        tint={Colors.Black}
        Lefticon={Images.backarrow}
        headerleftimgstyle={{height: hei(2.5), width: hei(2.5)}}
        Leftpress={() => navigation.goBack()}
      />
      <ScrollView style={style.scrollstyle}>
        <View style={style.imageview}>
          <ARimage source={Images.comd} resizemode={'stretch'} />
        </View>
        <View style={style.contentview}>
          
          <View style={style.showtexts}>
            <View style={style.showcontent}>
              <ARtext
                children={'COMADY SHOWS'}
                align={''}
                size={FontSize.font13}
                color={Colors.Placeholder}
              />
            </View>
          </View>
          
          <View style={style.eventview}>
            <ARtext
              children={'Bar Crawl, Gurgaon'}
              align={''}
              size={FontSize.font22}
              fontFamily={FontFamily.Bold}
            />
            <View style={style.longcontent}>
              <ARtext
                children={
                  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the...'
                }
                align={''}
                size={FontSize.font12}
                color={Colors.Placeholder}
              />
            </View>
            <View style={style.dateview}>
              <View style={style.datetime}>
                <ARimage
                  source={Images.menu}
                  style={{height: hei(2.5), width: hei(2.5)}}
                />
              </View>
              <View style={style.datetext}>
                <ARtext
                  children={'14 September,2023'}
                  color={Colors.Placeholder}
                  size={FontSize.font13}
                  align={''}
                />
                <ARimage
                  source={Images.swip}
                  style={{height: hei(2.5), width: hei(2.5)}}
                />
                <ARtext
                  children={'24 September,2023'}
                  color={Colors.Placeholder}
                  size={FontSize.font13}
                  align={''}
                />
              </View>
            </View>
            <View style={[style.showtexts, {alignItems: 'flex-start'}]}>
              <View
                style={[
                  style.showcontent,
                  {
                    paddingHorizontal: wid(2),
                    flexDirection: 'row',
                    alignItems: 'center',
                    // width: wid(45),
                    columnGap: wid(2.5),
                  },
                ]}>
                <ARimage
                  source={Images.clock}
                  style={{height: hei(2.5), width: hei(2.5)}}
                />
                <ARtext
                  children={'9:00 PM to 12:00 PM'}
                  align={''}
                  size={FontSize.font13}
                  color={Colors.Placeholder}
                />
              </View>
            </View>
          </View>

          <View style={style.address}>
                <ARtext children={'ADDRESS'} align={''} size={FontSize.font14} fontFamily={FontFamily.Bold}/>
                <View style={style.locationview}>
                    <View style={style.locationtext}>
                      <ARimage
                      source={Images.location}
                      style={{height: hei(2.5), width: hei(2.5)}}
                      />
                      <ARtext
                        children={'New Delhi'}
                        size={FontSize.font14}
                        FontFamily={FontFamily.Bold}
                        align={''}
                      />
                    </View>
                    <ARtext 
                    children={'New Barakhamba Rd, Connaught Lane, Barakhamba, New Delhi, Delhi 110001'}
                    color={Colors.Placeholder} 
                    size={FontSize.font12}
                    style={{backgroundColor:"",width:wid(80),paddingLeft:wid(6.5)}}
                    align={''}
                    />
                </View>
                <ARtext 
                  // children={'3 More Venues'} 
                  onpress={() => console.log('')}
                  align={''} 
                  size={FontSize.font14}
                  FontFamily={FontFamily.Bold} 
                  color={Colors.purple} 
                  textDecorationLine={'underline'}>
                    3 More Venues 
                  <ARtext children={`${''} >`} 
                  size={FontSize.font14}
                  FontFamily={FontFamily.Bold} 
                  color={Colors.purple} />
                </ARtext>
          </View>

          <View style={style.detail}>
                <ARtext 
                  children={'MORE INFORMATION'} 
                  fontFamily={FontFamily.Bold} 
                  size={FontSize.font15}
                  align={''}
                />
                <View style={style.evedataview}>
                  <View style={style.locationtext}>
                      <ARimage
                        source={Images.cmd}
                        style={{height: hei(2.5), width: hei(2.5)}}
                      />
                      <ARtext
                        children={'Comedy'}
                        color={Colors.Placeholder}
                        size={FontSize.font14}
                        FontFamily={FontFamily.Bold}
                        align={''}
                      />
                    </View>
                    <View style={style.locationtext}>
                      <ARimage
                        source={Images.clock}
                        style={{height: hei(2.5), width: hei(2.5)}}
                      />
                      <ARtext
                        children={'1hr 3mins'}
                        color={Colors.Placeholder}
                        size={FontSize.font14}
                        FontFamily={FontFamily.Bold}
                        align={''}
                      />
                    </View>
                    <View style={style.locationtext}>
                      <ARimage
                        source={Images.language}
                        style={{height: hei(2.5), width: hei(2.5)}}
                      />
                      <ARtext
                        children={'Hindi'}
                        color={Colors.Placeholder}
                        size={FontSize.font14}
                        FontFamily={FontFamily.Bold}
                        align={''}
                      />
                    </View>
                    <View style={style.locationtext}>
                      <ARimage
                        source={Images.profile}
                        style={{height: hei(2.5), width: hei(2.5)}}
                      />
                      <ARtext
                        children={'16yrs +'}
                        color={Colors.Placeholder}
                        size={FontSize.font14}
                        FontFamily={FontFamily.Bold}
                        align={''}
                      />
                    </View>
                </View>
          </View>

        </View>
      </ScrollView>
    </ARcontainer>
  );
};

export default Eventdetail;

const style = StyleSheet.create({
  scrollstyle: {
    flexGrow: 1,
    // backgroundColor: Colors.Placeholder,
  },
  imageview: {
    // backgroundColor:"red",
    height: hei(30),
  },
  contentview: {
    paddingHorizontal: wid(4),
    paddingTop: hei(2),
    // backgroundColor: 'red',
  },
  showtexts: {
    alignItems: 'flex-start',
    // backgroundColor: 'green',
  },
  showcontent: {
    backgroundColor: Colors.lightgrey,
    paddingHorizontal: wid(3),
    paddingVertical: hei(0.5),
    borderRadius: normalize(5),
  },
  eventview: {
    paddingVertical: hei(1.5),
    // backgroundColor: 'pink',
    rowGap: hei(1.7),
    paddingBottom:hei(3),
    borderBottomWidth:normalize(1),
    borderColor:Colors.bordercolor
  },
  longcontent: {
    // backgroundColor:"yellow"
  },
  dateview: {
    justifyContent: 'space-between',
    paddingVertical: hei(0.8),
    paddingHorizontal: wid(1),
    backgroundColor: Colors.lightgrey,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: normalize(5),
  },
  datetime: {
    alignItems: 'center',
    // backgroundColor:'red',
    width: wid(7),
  },
  datetext: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor:"green",
    width: wid(80),
    alignItems: 'center',
  },
  address: {
    // backgroundColor:"yellow",
    paddingVertical: hei(1.5),
    paddingTop:hei(3),
    paddingBottom:hei(2.5),
    borderBottomWidth:normalize(1),
    borderColor:Colors.bordercolor,
    rowGap: hei(1.7),
  },
  locationview:{
    paddingVertical:hei(1.8),
    paddingHorizontal:wid(3),
    backgroundColor:Colors.lightgrey,
    borderRadius:normalize(6),
    rowGap:hei(0.8)
  },
  locationtext:{
    flexDirection:"row",
    alignItems:"center",
    columnGap:wid(1.5),
    // backgroundColor:"red"
  },
  detail:{
    paddingVertical:hei(2.5),
    // backgroundColor:"red",
    rowGap:hei(3)
  },
  evedataview:{
  rowGap:hei(1.5)
  }
  
});
