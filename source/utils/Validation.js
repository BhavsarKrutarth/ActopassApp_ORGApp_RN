const isEmailValid = (Email) => {
  const regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return !regEx.test(Email);
};

const isMobileNumberValid = (MobileNumber) =>
  MobileNumber.length < 0 ||
  MobileNumber.length < 10 ||
  MobileNumber.length > 10;
const isSameMobileNumber = (Number, Conformnumber) =>
  // Number.length < 0 &&
  // Conformnumber.length < 0 &&
  // Number.length < 10 &&
  // Conformnumber.length < 0 && 
  Number != Conformnumber;

const isName = (name) => name.length < 2;

const isPasswordValid = (Password) => Password.length < 1;

const issellerpassword = (password) => password.length < 4;

const isID = (id) => id.length < 1;

const isSamePasswords = (Password, ConfirmPassword) =>
  Password === ConfirmPassword;

const isPINValid = (PIN) => PIN.length < 4;

const isSamePIN = (PIN, ConfirmPIN) =>
  PIN.length === 4 && ConfirmPIN.length === 4 && PIN === ConfirmPIN;

const Validation = {
  isEmailValid,
  isMobileNumberValid,
  isSameMobileNumber,
  isPasswordValid,
  isSamePasswords,
  isPINValid,
  isSamePIN,
  isID,
  issellerpassword,
  isName,
};

export default Validation;
