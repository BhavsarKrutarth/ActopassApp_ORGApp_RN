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
import { deleteseller, getallseller } from '../../api/Api';
import { useSelector } from 'react-redux';
import { Responsemodal } from '../../Commoncompoenent';

const Accountcreation = ({}) => {
  const navigation = useNavigation();
  
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
  
  const {AsyncValue} = useSelector((state) => state.Auth)
  const OrganizerLoginId = AsyncValue.OrganizerLoginId
  const [btn, setbtn] = useState(1);
  const [Userid, Setuseid] = useState(0);
  const [Deletemodal,Setdeletemodal] = useState(false)
  const [Loading,SetLoading] = useState(false);
  const [Alldata,Setalldata] = useState({})
  const [Getdata,SetGetdata] = useState([])
  const [Pageindex,Setpageindex] = useState(1)
  const Pagecount = 4;

  useEffect(() => {
    getseller()
  },[]);
  
  
  const dataset = item => {
    setbtn(item.Id);
    // setsellerdata(item);
  };

  const typeWiseNavigatios = (item) => {
    if (btn === 1) {
      navigation.navigate(Navroute.Sellerdetail,{data:item});
    } else if (btn === 2) {
      navigation.navigate(Navroute.Boxofficedatail);
    } else {
      navigation.navigate(Navroute.Scannerdetail);
    }
  };

  const getid = (item) => {
    Setdeletemodal(true)
    if(btn === 1){
      Setuseid(item.SelllerLoginid)
    }else if(btn === 2){

    }else{

    }
  }

const callfunction = () => {
  if(btn === 1)
  {
    deletedata(Userid)
  }else if(btn === 2){

  }else{

  }
}
  
  const deletedata = async (id) => {
    Setdeletemodal(false)
    try{
      const response = await deleteseller(id)
      if(response){
        console.log('deletesuccess');
        // Setalldata('')
        // SetGetdata([])
        Setpageindex(1)
        getseller()
      }
    }catch(error){
      console.log('Fetch data error',error);
    }
  }

  const getseller = async () => {
    if(Loading) return;
    SetLoading(true)
    try{
      const response = await getallseller(Pageindex,Pagecount,OrganizerLoginId)
      if(response){
        Setalldata(response)
        SetGetdata((prevData) => ([...prevData, ...response.DIscountDetails]))
        Setpageindex((pre) => pre + 1)
        SetLoading(false)
      }
    }
    catch(error){
      console.log('fetch data error',error)
      SetLoading(false)
    }
  }


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

      <FlatList contentContainerStyle={style.scrollstyle}
        data={Getdata}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item,index) => index.toString()}
        renderItem={({item, index}) => (
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
                {/* <Image source={{uri:item.PHOTOPATH}} style={{height:hei(100),width:wid(100)}}/> */}
                <View style={[style.codeview, {alignItems: 'flex-end'}]}>
                  <View style={style.imageview}>
                    <ARbutton
                      height={hei(2)}
                      width={hei(2)}
                      borderRadius={0}
                      backgroundColor={''}
                      onpress={() => typeWiseNavigatios(item)}>
                      <ARimage source={Images.edit} style={style.imagestyle} />
                    </ARbutton>
                    <View style={style.line}></View>
                    <ARbutton
                      height={hei(2)}
                      width={hei(2)}
                      borderRadius={0}
                      backgroundColor={''}
                      onpress={() => getid(item)}
                      >
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
                    children={item.MobileNo}
                    color={Colors.active}
                    size={FontSize.font14}
                  />
                </ARtext>
              </View>

              <View style={style.viewmargin}>
                <ARtext align={''} size={FontSize.font14}>
                  Email: {''}
                  <ARtext
                    children={item.EmailId}
                    color={Colors.active}
                    size={FontSize.font14}
                  />
                </ARtext>
              </View>

              {/* <View style={style.viewmargin}>
                <ARtext align={''} size={FontSize.font14}>
                  Crated By:{' '}
                  <ARtext
                    color={Colors.active}
                    size={FontSize.font14}
                    children={item.CratedBy}
                  />
                </ARtext>
              </View> */}
            </View>
          </View>
        )}
        onEndReached={() => {Alldata.TotalRecords != Getdata.length ? getseller() : null}}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => (
         Loading ? <ActivityIndicator size={'large'} color={Colors.Placeholder}/> : null
        )}
/>
      <View style={style.addbutton}>
              <ARbutton
                Touchstyle={{
                  height: hei(6.5),
                  width: hei(6.5),
                  borderRadius: normalize(50),
                  backgroundColor:""
                }}
                onpress={() => navigation.navigate(Navroute.Createseller)}
              >
                <ARimage source={Images.accountcreation} 
                style={{}}/>
              </ARbutton>
            </View>
            <Responsemodal 
                visible={Deletemodal} 
                Images={Images.delete} 
                message={'Are you sure that you want to delete seller'}
                Onok={() => callfunction()}
                Oncancle={() => Setdeletemodal(false)}
                button={true}
            />
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
