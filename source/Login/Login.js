import React, { useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { ARcontainer, ARLoader } from "../common";
import Images from "../Image/Images";
import { hei, isIos, wid } from "../theme";
import { ARtext } from "../common";
import { Colors } from "../theme";
import { ARtextinput } from "../common";
import { FontFamily, FontSize } from "../theme";
import { ARbutton } from "../common";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Functions, Validation } from "../utils";
import { useDispatch } from "react-redux";
import {
  onAuthChange,
  setAsyncStorageValue,
} from "../redux/Reducer/AuthReducers";
import { loginUser } from "../api/Api";
import LottieView from "lottie-react-native";

const Login = () => {
  const dispatch = useDispatch();
  const [toggle, settoggle] = useState(true);
  const [Fieldvalidation, setfieldvalidation] = useState(false);
  const [Passwordfield, SetPasswordField] = useState(false);
  const [Logindata, Setlogindata] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [Input, setInput] = useState({
    Id: "ORG-0001",
    Password: "04BBB12B",
    OTP: "",
  });

  const Idvalidation = Fieldvalidation && Validation.isID(Input.Id);
  const Otpvalidation = Fieldvalidation && Validation.isPINValid(Input.OTP);
  const Passwordvalidation =
    Fieldvalidation && Validation.isPasswordValid(Input.Password);

  const Login = async (Id, Password) => {
    setfieldvalidation(true);
    if (!Id) return;
    if (Passwordfield == true) {
      if (!Id || !Password) {
        setfieldvalidation(true);
        return;
      }
    }
    setLoading(true);
    try {
      const response = await loginUser(Id, Password);
      if (response) {
        if (response.Response === 2) {
          if (response.otp > 0) {
            console.log("response.otp", response.otp);
            Setlogindata(response);
            setfieldvalidation(false);
          }
        } else if (response.Response === 0) {
          dispatch(onAuthChange(true));
          dispatch(setAsyncStorageValue(response));
          Functions.setAppData(response);
          setfieldvalidation(false);
        } else if (response.Response === -1) {
          Alert.alert(response.ResponseMessage);
        }
        if (response.Response === 2 || response.Response === 0) {
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const Continue = (loginotp, otp) => {
    setfieldvalidation(true);
    if (!otp || !loginotp) {
      return;
    }

    if (loginotp == otp) {
      dispatch(onAuthChange(true));
      dispatch(setAsyncStorageValue(Logindata));
      Functions.setAppData(Logindata);
      setfieldvalidation(false);
    } else {
      Alert.alert("Invalid OTP.");
    }
  };

  const Viapassword = (Id, Password) => {
    SetPasswordField(true);
    Setlogindata({});
    setInput((prev) => ({ ...prev, OTP: "" }));
  };

  if (isLoading)
    return (
      <ARcontainer style={{ justifyContent: "center", alignItems: "center" }}>
        <LottieView
          source={Images.tickets}
          autoPlay
          loop
          style={{ height: hei(18), width: hei(18)}}
        />
      </ARcontainer>
    );

  return (
    <ARcontainer>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: wid(4) }}
        enableAutomaticScroll={Platform.OS === "ios"}
      >
        <View style={style.flex1}>
          <View style={style.imageview}>
            <Image source={Images.man} style={style.manimage} />
          </View>
          <View style={style.textview}>
            <ARtext
              children="Log In"
              size={FontSize.font22}
              fontFamily={FontFamily.SemiBold}
            />
            <ARtext
              children="Please enter your login info"
              size={FontSize.font15}
              fontFamily={FontFamily.Medium}
              mTop="5"
              color={Colors.Text}
            />
          </View>
        </View>

        <View style={style.flex2}>
          <View>
            <ARtextinput
              Containerstyle={{
                borderColor: Idvalidation ? "red" : Colors.bordercolor,
              }}
              Lefticon={Images.man}
              Tiheight={50}
              Tipadding={10}
              Tiplaceholder="Enter ID"
              Tiflex={1}
              value={Input.Id.toUpperCase()}
              onchangetext={(v) => setInput((prev) => ({ ...prev, Id: v }))}
            />
            {Idvalidation ? (
              <View style={{ marginTop: hei(0.8) }}>
                <ARtext
                  children={"Please Enter Your Id"}
                  color={"red"}
                  align={""}
                />
              </View>
            ) : (
              ""
            )}
          </View>

          {Logindata.otp > 1 && (
            <View>
              <ARtextinput
                Lefticon={Images.otp}
                Tiheight={50}
                Tipadding={10}
                Tiplaceholder="Enter OTP"
                Tiflex={1}
                value={Input.OTP}
                onchangetext={(v) =>
                  setInput((previous) => ({ ...previous, OTP: v }))
                }
              />
              {Otpvalidation && (
                <View style={{ marginTop: hei(0.8) }}>
                  <ARtext
                    children={"Please Enter Your OTP"}
                    color={"red"}
                    align={""}
                  />
                </View>
              )}
            </View>
          )}

          {Passwordfield && (
            <View>
              <ARtextinput
                Lefticon={Images.lock}
                Tiheight={50}
                Tipadding={10}
                Righticon={toggle ? Images.eyeoff : Images.eye}
                Tiplaceholder={"Enter Password"}
                Tiflex={1}
                value={Input.Password}
                onchangetext={(v) =>
                  setInput((previous) => ({ ...previous, Password: v }))
                }
                securetextentry={toggle}
                onPress={() => settoggle(!toggle)}
              />
              {Passwordvalidation && (
                <View style={{ marginTop: hei(0.8) }}>
                  <ARtext
                    children={"Please Enter Your Password"}
                    color={"red"}
                    align={""}
                  />
                </View>
              )}
            </View>
          )}
        </View>

        <View style={style.flex3}>
          <ARbutton
            height={hei(6.5)}
            onpress={() => {
              if (Logindata.otp > 0) {
                Continue(Logindata.otp, Input.OTP);
              } else {
                Login(Input.Id, Input.Password);
              }
            }}
          >
            <ARtext
              children={Logindata.otp > 0 ? "Continue" : "Login"}
              style={style.buttontext}
            />
          </ARbutton>

          <View
            style={{
              rowGap: hei(2),
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {Logindata.otp > 0 && (
              <>
                <View style={style.seperator}>
                  <View style={style.line}></View>
                  <ARtext
                    children="Or"
                    color={Colors.Placeholder}
                    size={FontSize.font16}
                    fontFamily={FontFamily.Medium}
                  />
                  <View style={style.line}></View>
                </View>
                <ARbutton
                  Touchstyle={{ height: hei(3), backgroundColor: "" }}
                  onpress={() => Login(Input.Id)}
                >
                  <ARtext
                    children="Resend OTP?"
                    color={Colors.purple}
                    size={FontSize.font14}
                    fontFamily={FontFamily.Medium}
                    textDecorationLine="underline"
                  />
                </ARbutton>
                <ARbutton
                  onpress={() => Viapassword()}
                  Touchstyle={{ height: hei(3), backgroundColor: "" }}
                >
                  <ARtext
                    children="Via Password?"
                    color={Colors.Placeholder}
                    size={FontSize.font14}
                    fontFamily={FontFamily.Regular}
                    textDecorationLine="underline"
                  />
                </ARbutton>
              </>
            )}
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ARcontainer>
  );
};

export default Login;

const style = StyleSheet.create({
  scrollviewstyle: {
    flexGrow: 1,
    // paddingLeft: 13,
    // paddingRight: 13,
    // backgroundColor:"red",
    paddingHorizontal: wid(4),
  },
  flex1: {
    flex: 1.3,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: hei(2),
    // backgroundColor:"pink"
  },
  imageview: {
    backgroundColor: Colors.lightgrey,
    justifyContent: "center",
    alignItems: "center",
    height: hei(10),
    width: hei(10),
    borderRadius: hei(10),
  },
  manimage: {
    height: wid(10),
    width: wid(10),
  },
  textview: {
    marginTop: hei(2.5),
    alignItems: "center",
  },
  flex2: {
    flex: 1.5,
    justifyContent: "center",
    rowGap: hei(2),
  },
  textinput: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginLeft: wid(2),
    marginRight: wid(2),
  },

  flex3: {
    flex: 1,
    gap: hei(4),
    paddingTop: hei(2.5),
    // backgroundColor:"blue"
  },
  buttontext: {
    color: Colors.White,
    fontFamily: FontFamily.Medium,
    fontSize: FontSize.font16,
  },
  seperator: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: wid(1.7),
    alignItems: "center",
    columnGap: wid(4),
  },
  line: {
    borderColor: Colors.bordercolor,
    borderWidth: 1,
    flex: 1,
  },
});
