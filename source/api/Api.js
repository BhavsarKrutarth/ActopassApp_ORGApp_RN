import FetchMethod from "./FetchMethod";

// =========== Login ==============

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

// =========== Add Seller,Boxoffice,Scanner =============

export const Addnewseller = async (
  OrganizerLoginId,
  Password,
  Name,
  Number,
  Email,
  Photos,
  Id
) => {
  try {
    const response = await FetchMethod.POST({
      EndPoint:
        Id === 1
          ? "ORGApp/SelllerMasterAdd"
          : Id === 2
          ? "ORGApp_BoxOffice/BoxofficeUser_LoginAdd"
          : "",
      Params: {
        ...(Id === 1
          ? { SelllerLoginid: 0 }
          : Id === 2
          ? { BoxofficeUserId: 0 }
          : {}),
        OrganizerLoginId: OrganizerLoginId,
        Password: Password,
        Name: Name,
        MobileNo: Number,
        EmailId: Email,
        PhotoPath: Photos,
      },
    });
    return response;
  } catch (error) {
    console.error(
      Id === 1
        ? "Add new seller error"
        : Id === 2
        ? "Add new boxoffice error"
        : "",
      error
    );
    throw error;
  }
};

// ============ Eventlist get, and detail =============

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

// =========== Seller get, Edit, delete ==============

export const getallseller = async (PageIndex, PageCount, OrganizerLoginid) => {
  try {
    // console.log(PageIndex,PageCount,OrganizerLoginid);
    const response = await FetchMethod.GET({
      EndPoint: `ORGApp/SelllerMasterList/${PageIndex}/${PageCount}/${OrganizerLoginid}`,
    });
    return response;
  } catch (error) {
    console.error("Sellerget error", error);
    throw error;
  }
};

export const editsellerdata = async (
  SelllerLoginid,
  OrganizerLoginId,
  Password,
  Name,
  MobileNo,
  EmailId,
  PhotoPath
) => {
  try {
    const response = await FetchMethod.PUT({
      EndPoint: "ORGApp/SelllerMasterUpdate",
      Params: {
        SelllerLoginid: SelllerLoginid,
        OrganizerLoginId: OrganizerLoginId,
        Password: Password,
        Name: Name,
        MobileNo: MobileNo,
        EmailId: EmailId,
        PhotoPath: PhotoPath,
      },
    });
    return response;
  } catch (error) {
    console.error("Editsellerdatav error", error);
    throw error;
  }
};

export const deleteseller = async (id) => {
  try {
    const response = await FetchMethod.DELETE({
      EndPoint: "ORGApp/Delete_SelllerMaster",
      Params: {
        SelllerLoginid: id,
      },
    });
    return response;
  } catch (error) {
    console.error("Delete data succesfully");
    throw error;
  }
};

// =========== BoxOffice get, Edit, delete ==============

export const getboxoffice = async (PageIndex, PageCount, OrganizerLoginId) => {
  try {
    const response = await FetchMethod.GET({
      EndPoint: `ORGApp_BoxOffice/BoxOfficeUserList/${PageIndex}/${PageCount}/${OrganizerLoginId}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const editboxdata = async (
  BoxofficeUserId,
  OrganizerLoginId,
  Password,
  Name,
  MobileNo,
  EmailId,
  PhotoPath
) => {
  try {
    const response = await FetchMethod.PUT({
      EndPoint: "ORGApp_BoxOffice/BoxofficeUser_Update",
      Params: {
        BoxofficeUserId: BoxofficeUserId,
        OrganizerLoginId: OrganizerLoginId,
        Password: Password,
        Name: Name,
        MobileNo: MobileNo,
        EmailId: EmailId,
        PhotoPath: PhotoPath,
      },
    });
    return response;
  } catch (error) {
    console.error("editboxoffice error", error);
    throw error;
  }
};

export const deleteboxoffice = async (Id) => {
  try {
    const response = await FetchMethod.DELETE({
      EndPoint: "ORGApp_BoxOffice/Delete_BoxofficeUser",
      Params: {
        BoxofficeUserId: Id,
      },
    });
    return response;
  } catch (error) {
    console.error("dleteboxofficeerror", error);
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

export const fetchAPI = async (method, endpoint, params = {}) => {
  try {
    return await FetchMethod[method]({
      EndPoint: endpoint,
      Params: params,
      NeedToken: true,
    });
  } catch (error) {
    throw error;
  }
};

// Seller Ticket API
export const TicketType = (EventMasterid) =>
  fetchAPI("GET", `ORGApp/GetEventMaster_TicketTypeList/${EventMasterid}`);

export const TicketData = (SelllerLoginid, EventMasterid) =>
  fetchAPI(
    "GET", 
    `ORGApp/TicketTypeWise_available_balanceList/${SelllerLoginid}/${EventMasterid}`
  );

export const TicketBalance = (SelllerLoginid, EventMasterid, TicketTypeid) =>
  fetchAPI(
    "GET",
    `ORGApp/TicketTypeWise_available_balance/${SelllerLoginid}/${EventMasterid}/${TicketTypeid}`
  );

export const TicketQtyAdd = (
  SelllerLoginid,
  EventMasterid,
  TicketTypeid,
  SellerTicketQty
) =>
  fetchAPI("POST", "ORGApp/Selllermasterdetails_ADD", {
    SelllerLoginid,
    EventMasterid,
    EventMaster_TicketTypeid: TicketTypeid,
    SellerTicketQty,
  });

export const TicketQtyUpdate = (
  SelllerMasterDetailsid,
  SelllerLoginid,
  EventMasterid,
  TicketTypeid,
  SellerTicketQty
) =>
  fetchAPI("PUT", "ORGApp/Selllermasterdetails_Edit", {
    SelllerMasterDetailsid,
    SelllerLoginid,
    EventMasterid,
    EventMaster_TicketTypeid: TicketTypeid,
    SellerTicketQty,
  });

export const TicketQtyDelete = (SelllerMasterDetailsid) =>
  fetchAPI("DELETE", "ORGApp/Selllermasterdetails_Delete", {
    SelllerMasterDetailsid,
  });

export const GetDiscount_Box = (BoxofficeUserId, EventMasterid) =>
  fetchAPI(
    "GET",
    `ORGApp_BoxOffice/GetBoxofficediscount_ListById/${BoxofficeUserId}/${EventMasterid}`
  );

export const AddDiscount_Box = (
  { ToAmount, FromAmount, DiscountAmount },
  BoxofficeUserId,
  EventMasterid
) =>
  fetchAPI("POST", "ORGApp_BoxOffice/Add_Boxofficediscount", {
    BoxOfficeDiscountid: 0,
    ToAmount,
    FromAmount,
    DiscountAmount,
    EventMasterid,
    BoxofficeUserId,
  });

export const UpdateDiscount_Box = (
  {
    BoxOfficeDiscountid,
    ToAmount,
    FromAmount,
    DiscountAmount,
    BoxofficeUserId,
  },
  EventMasterid
) =>
  fetchAPI("PUT", "ORGApp_BoxOffice/UpdateBoxofficediscount", {
    BoxOfficeDiscountid,
    ToAmount,
    FromAmount,
    DiscountAmount,
    EventMasterid,
    BoxofficeUserId,
  });

export const DeleteDiscount_Box = (BoxOfficeDiscountid) =>
  fetchAPI("DELETE", "ORGApp_BoxOffice/DeleteBoxofficediscount", {
    BoxOfficeDiscountid,
  });
