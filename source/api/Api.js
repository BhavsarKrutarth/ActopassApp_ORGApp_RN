import FetchMethod from "./FetchMethod";

export const loginUser = async (Id, Password) => {
  try {
    const response = await FetchMethod.POST({
      EndPoint: "ORGApp_Login",
      Params: {
        EmpCode: Id,
        Password: Password ?? "",
      },
    });
    return response;
  } catch (error) {
    console.log("Login API Error:", error);
    throw error;
  }
};

export const Details = async (PageIndex, PageCount, OrganizerLoginid) => {
  try {
    const response = await FetchMethod.GET({
      EndPoint: `ORGApp/OrganizerEventList/${PageIndex}/${PageCount}/${OrganizerLoginid}`,
      // NeedToken: true,
    });
    return response;
  } catch (error) {
    console.error("Details API Error:", error);
    throw error;
  }
};

export const EventDetails = async (EventMasterid) => {
  try {
    const response = await FetchMethod.GET({
      EndPoint: `HomeScreen/get_eventmasterbyid/${EventMasterid}`,
    });
    return response;
  } catch (error) {
    console.log("Login API Error:", error);
    throw error;
  }
};
