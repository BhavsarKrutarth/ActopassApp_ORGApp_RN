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

export const GetDiscount_Box = async (BoxofficeUserId, EventMasterid) => {
  try {
    const response = await FetchMethod.GET({
      EndPoint: `ORGApp_BoxOffice/GetBoxofficediscount_ListById/${BoxofficeUserId}/${EventMasterid}`,
      NeedToken: true,
    });
    return response;
  } catch (error) {
    console.log("box office API Error:", error);
    throw error;
  }
};

export const AddDiscount_Box = async (eventId, data, setError) => {
  try {
    const response = await FetchMethod.POST({
      EndPoint: `ORGApp_BoxOffice/Add_Boxofficediscount`,
      Params: {
        BoxOfficeDiscountid: data.BoxOfficeDiscountid,
        ToAmount: data.ToAmount,
        FromAmount: data.FromAmount,
        DiscountAmount: data.DiscountAmount,
        eventId: eventId,
        BoxofficeUserId: data.BoxofficeUserId,
      },
      NeedToken: true,
    });
    if (response.ResponseCode === 0) {
      setError("");
    } else if (response.ResponseCode === -1) {
      setError(response.ResponseMessage);
    }
  } catch (error) {
    setError("An error occurred while processing the request.");
    throw error;
  }
};

export const UpdateDiscount_Box = async (data) => {
  try {
    console.log("data", data);
    const response = await FetchMethod.PUT({
      EndPoint: `ORGApp_BoxOffice/UpdateBoxofficediscount`,
      Params: {
        BoxOfficeDiscountid: data.BoxOfficeDiscountid,
        ToAmount: data.ToAmount,
        FromAmount: data.FromAmount,
        DiscountAmount: data.DiscountAmount,
        BoxofficeUserId: data.BoxofficeUserId,
      },
      NeedToken: true,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log("TicketQty API Error:", error);
    throw error;
  }
};

export const DeleteDiscount_Box = async (BoxOfficeDiscountid) => {
  try {
    const response = await FetchMethod.DELETE({
      EndPoint: `ORGApp_BoxOffice/DeleteBoxofficediscount`,
      Params: {
        BoxOfficeDiscountid: BoxOfficeDiscountid,
      },
      NeedToken: true,
    });
    return response;
  } catch (error) {
    console.log("TicketQty API Error:", error);
    throw error;
  }
};
