import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors, FontFamily, FontSize, hei, normalize, wid } from '../../theme'
import { deleteseller, getallseller } from '../../api/Api'
import { ARcontainer,ARtext,ARbutton,ARimage } from '../../common'
import { Responsemodal } from '../../Commoncompoenent'
import { useSelector } from 'react-redux'
import Navroute from '../navigation/Navroute'
import { useNavigation } from '@react-navigation/native'
import Images from '../../Image/Images'

const Sellerlist = () => {
    const navigation = useNavigation()
    const [Hasmore,Sethasmore] = useState(false)
    const [Getdata,SetGetdata] = useState([])
    const {AsyncValue} = useSelector((state) => state.Auth)
    const OrganizerLoginId = AsyncValue.OrganizerLoginId
    const [Userid, Setuseid] = useState(0);
    const [Deletemodal,Setdeletemodal] = useState(false)
    const [Loading,SetLoading] = useState(false);
    const [Response,SetResponse] = useState('')
    const [Pageindex,Setpageindex] = useState(1)
    const Pagecount = 10;


    useEffect(() => {
        getseller()
      },[]);

      const typeWiseNavigatios = (item) => {
          navigation.navigate(Navroute.Sellerdetail,{data:item});
      };

      const getid = (item) => {
        Setdeletemodal(true)
          Setuseid(item.SelllerLoginid)
      }
    
    const callfunction = () => {
        deletedata(Userid)
    }


    const deletedata = async (id) => {
        Setdeletemodal(false)
        try{
          const response = await deleteseller(id)
          if(response.Response === -1){
            SetResponse(response.ResponseMessage)
            Setdeletemodal(true)
            console.log('Respone',response.ResponseMessage)
          }else{
            SetGetdata((pre) => pre.filter((data) => data.SelllerLoginid != id))
            console.log('deletesuccess');
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
            SetGetdata((prevData) => ([...prevData, ...response.DIscountDetails]))
            Setpageindex((pre) => pre + 1)
            SetLoading(false)
            Sethasmore(true)
          }
        }
        catch(error){
          console.log('fetch data error',error)
          SetLoading(false)
          Sethasmore(false)
        }
      }
    
    const clearrsponse  = () => {
        SetResponse('')
        Setdeletemodal(false)
    }
  return (
    <ARcontainer>
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
            </View>
          </View>
        )}
        onEndReached={() => { Hasmore ? getseller() : null}}
        onEndReachedThreshold={500}
        ListFooterComponent={() => (
         Loading ? <ActivityIndicator size={'large'} color={Colors.Placeholder}/> : null
        )}
        
      />
      <Responsemodal 
        visible={Deletemodal} 
        Images={Response ? Images.sorry : Images.deletedata} 
        message={Response ? Response : 'Are you sure that you want to delete seller ?'}
        subtext={Response ? '' : 'Are You Sure?'}
        subcolor={Colors.Placeholder}
        subfamily={FontFamily.Regular}
        subsize={FontSize.font20}
        onpress={() => clearrsponse()}
        Onok={() => callfunction()}
        Oncancle={() => Setdeletemodal(false)}
        button={Response ? false : true}
      />
    </ARcontainer>
  )
}

export default Sellerlist

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

  });
  