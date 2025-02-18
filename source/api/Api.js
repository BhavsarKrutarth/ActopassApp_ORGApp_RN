import FetchMethod from "./FetchMethod";
const { AsyncValue } = useSelector((state) => state.Auth);

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
    const response = await FetchMethod.POST({
      EndPoint: `ORGApp/OrganizerEventList/${PageIndex}/${PageCount}/${OrganizerLoginid}`,
      NeedToken: AsyncValue.AuthorizationKey,
    });
    return response;
  } catch (error) {
    console.log("Login API Error:", error);
    throw error;
  }
};
