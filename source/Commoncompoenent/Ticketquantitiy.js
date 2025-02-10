import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  wid,
  hei,
  normalize,
  Colors,
  FontSize,
  FontFamily,
  isIos,
} from '../theme';
import ARtext from '../common/ARtext';
import ARbutton from '../common/ARbutton';

const Ticketquantitiy = ({onincrese, ondecrese,item}) => {
  
    const [isQTY, setIsQTY] = useState(false)
    const [Quantity, SetQuantity] = useState(0);
   

    const increase = (itemdata) => {
        SetQuantity(Quantity + 1)
        onincrese({...itemdata, QTY:Quantity + 1})
    }

    const decrese = (decreseitem) => {
        SetQuantity(Math.max(Quantity - 1,0))
        ondecrese({...decreseitem,QTY:Math.max(Quantity - 1,0)})
    }


  return (
    <View>
      {!isQTY ? 
        <ARbutton
          Touchstyle={{
            backgroundColor: Colors.White,
            borderRadius: normalize(10),
            height: hei(9),
            borderWidth: normalize(1),
            borderColor:item.Colorcode
          }}
            onpress={() => setIsQTY(!isQTY)}
        >
          <ARtext
            children={item.TicketType}
            align={''}
            size={FontSize.font13}
            fontFamily={FontFamily.SemiBold}
          />
          <ARtext
            children={`₹${item.Price}`}
            align={''}
            size={FontSize.font12}
            fontFamily={FontFamily.SemiBold}
          />
        </ARbutton>
    :
      <View style={style.qun}>
        <View style={style.texts}>
          <ARtext
            children={item.TicketType}
            align={''}
            size={FontSize.font12}
            fontFamily={FontFamily.SemiBold}
          />
          <ARtext
            children={`₹${item.Price}`}
            align={''}
            size={FontSize.font12}
            fontFamily={FontFamily.SemiBold}
          />
        </View>
        <View style={style.increse}>
          <ARbutton Touchstyle={style.tch} onpress={() => decrese(item)} disable={Quantity === 0 ? true : false}>
            <ARtext children={'-'} align={''} />
          </ARbutton>
          <ARtext children={Quantity} />
          <ARbutton Touchstyle={style.tch} onpress={() => increase(item)} >
            <ARtext children={'+'} align={''} />
          </ARbutton>
        </View>
      </View>}
    </View>
  );
};

export default Ticketquantitiy;

const style = StyleSheet.create({
  qun: {
    borderRadius: normalize(8),
    backgroundColor: Colors.quantity,
    paddingHorizontal: hei(0.3),
    paddingVertical: hei(0.3),
  },
  texts: {
    paddingHorizontal: wid(2),
    paddingVertical: hei(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  increse: {
    backgroundColor: Colors.White,
    borderBottomLeftRadius: normalize(6),
    borderBottomRightRadius: normalize(6),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hei(1.3),
    paddingHorizontal: wid(4),
    columnGap: wid(11),
  },
  tch: {
    backgroundColor: Colors.bordercolor,
    height: hei(3),
    width: hei(3),
    borderRadius: normalize(5),
    justifyContent: isIos ? 'center' : '',
  },
});
