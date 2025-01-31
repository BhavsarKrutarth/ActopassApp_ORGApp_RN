const isEmailValid = Email => {
  const regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return !regEx.test(Email)
};

const isMobileNumberValid = MobileNumber => MobileNumber.length < 0 || MobileNumber.length < 10 || MobileNumber.length > 10 
// {
//   const regEx = /^([0|\+[0-9]{1,5})?([5-9][0-9]{9})$/;
//   return regEx.test(MobileNumber) && MobileNumber.length > 9;
// };

const isName = name => name.length < 3

const isPasswordValid = Password => Password.length < 1;

const issellerpassword = password => password.length < 4 || password.length > 8 

const isID = id => id.length < 1

const isSamePasswords = (Password, ConfirmPassword) =>
  Password === ConfirmPassword;

const isPINValid = PIN => PIN.length < 4;

const isSamePIN = (PIN, ConfirmPIN) =>
  PIN.length === 4 && ConfirmPIN.length === 4 && PIN === ConfirmPIN;

const Validation = {
  isEmailValid,
  isMobileNumberValid,
  isPasswordValid,
  isSamePasswords,
  isPINValid,
  isSamePIN,
  isID,
  issellerpassword,
  isName
};

export default Validation;
