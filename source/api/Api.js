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

export const EventList = async (OrganizerLoginId) => {
  try {
    const response = await FetchMethod.GET({
      EndPoint: `ORGApp/Seller_eventmaster_dropdownList/${OrganizerLoginId}`,
      NeedToken: true,
    });
    return response;
  } catch (error) {
    console.log("Login API Error:", error);
    throw error;
  }
};

export const TicketType = async (EventMasterid) => {
  try {
    console.log("SelllerLoginid, EventMasterid", EventMasterid);

    const response = await FetchMethod.GET({
      EndPoint: `ORGApp/GetEventMaster_TicketTypeList/${EventMasterid}`,
      NeedToken: true,
    });
    return response;
  } catch (error) {
    console.log("TicketType API Error:", error);
    throw error;
  }
};

export const TicketData = async (SelllerLoginid, EventMasterid) => {
  try {
    const response = await FetchMethod.GET({
      EndPoint: `ORGApp/TicketTypeWise_available_balanceList/${SelllerLoginid}/${EventMasterid}`,
      NeedToken: true,
    });
    return response;
  } catch (error) {
    console.log("TicketType API Error:", error);
    throw error;
  }
};

export const TicketBalance = async (
  SelllerLoginid,
  EventMasterid,
  TicketTypeid
) => {
  try {
    const response = await FetchMethod.GET({
      EndPoint: `ORGApp/TicketTypeWise_available_balance/${SelllerLoginid}/${EventMasterid}/${TicketTypeid}`,
      NeedToken: true,
    });
    return response;
  } catch (error) {
    console.log("TicketType API Error:", error);
    throw error;
  }
};

export const TicketQtyAdd = async (
  SelllerLoginid,
  EventMasterid,
  TicketTypeid,
  SellerTicketQty
) => {
  try {
    console.log(SelllerLoginid, EventMasterid, TicketTypeid, SellerTicketQty);

    const response = await FetchMethod.POST({
      EndPoint: `ORGApp/Selllermasterdetails_ADD`,
      Params: {
        SelllerLoginid: SelllerLoginid,
        EventMasterid: EventMasterid,
        EventMaster_TicketTypeid: TicketTypeid,
        SellerTicketQty: SellerTicketQty,
      },
      NeedToken: true,
    });
    return response;
  } catch (error) {
    console.log("TicketQty API Error:", error);
    throw error;
  }
};

export const TicketQtyUpdate = async (
  SelllerMasterDetailsid,
  SelllerLoginid,
  EventMasterid,
  TicketTypeid,
  SellerTicketQty
) => {
  try {
    const response = await FetchMethod.PUT({
      EndPoint: `ORGApp/Selllermasterdetails_Edit`,
      Params: {
        SelllerMasterDetailsid: SelllerMasterDetailsid,
        SelllerLoginid: SelllerLoginid,
        EventMasterid: EventMasterid,
        EventMaster_TicketTypeid: TicketTypeid,
        SellerTicketQty: SellerTicketQty,
      },
      NeedToken: true,
    });
    return response;
  } catch (error) {
    console.log("TicketQty API Error:", error);
    throw error;
  }
};

export const TicketQtyDelete = async (SelllerMasterDetailsid) => {
  try {
    console.log(SelllerMasterDetailsid);

    const response = await FetchMethod.DELETE({
      EndPoint: `ORGApp/Selllermasterdetails_Delete`,
      Params: {
        SelllerMasterDetailsid: SelllerMasterDetailsid,
      },
      NeedToken: true,
    });
    return response;
  } catch (error) {
    console.log("TicketQty API Error:", error);
    throw error;
  }
};
