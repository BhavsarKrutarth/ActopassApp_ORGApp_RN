import Axios from 'axios';
import {Functions} from '../utils';
import URL from './URL';

const REQUEST = async ({
  Method,
  EndPoint,
  Params,
  IsformData = false,
  NeedToken = true,
}) => {

  
  try {
    const appData = await Functions.getAppData();
    // console.log('Data',appData);
    
    const Headers = Header(NeedToken, appData?.AuthorizationKey, IsformData);
    const fullUrl = `${URL.AppUrl}${EndPoint}`;

    // console.log("Request URL:", fullUrl);
    // console.log("Request Headers:", Headers);
    // console.log("Request Params:", Params);

    const response = await Axios({
      method: Method,
      url: fullUrl,
      headers: Headers,
      data: Params,
    });

    // console.log("Response Data:", response.data);
    return response.data;
  } catch (error) {
    // console.log("Error Response:", JSON.stringify(error, null, 2));
    throw error?.response?.data?.title
      ? {
          msg: error?.response?.data?.title,
          status: error?.response?.data?.status,
        }
      : error?.message;
  }
};

const Header = (NeedToken, Token, IsformData) => {
  let apiHeaders = {
    Accept: '*/*',
    'Content-Type': IsformData ? 'multipart/form-data' : 'application/json',
  };
  if (NeedToken) {
    apiHeaders = {...apiHeaders, Authorization: `Bearer ${Token}`};
  }
  return apiHeaders;
};

export default REQUEST;
