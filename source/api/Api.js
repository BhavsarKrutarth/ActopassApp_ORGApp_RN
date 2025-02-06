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
          : "ORGApp_ScannerAccount/ScannerAdd",
      Params: {
        ...(Id === 1
          ? { SelllerLoginid: 0 }
          : Id === 2
          ? { BoxofficeUserId: 0 }
          : {ScannerLoginId: 0}),
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
        ? "Add New seller data error"
        : Id === 2
        ? "Add new boxoffice data error"
        : "Add new scanner data error",
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
    throw error;
  }
};

// ============= scanner get,update,delete =================


export const getscanner = async (PageIndex,PageCount,OrganizerLoginId) => {
  try{
      const response = await FetchMethod.GET({
        EndPoint:`ORGApp_ScannerAccount/GetScannerList/${PageIndex}/${PageCount}/${OrganizerLoginId}`
      })
      return response
  }catch(error){
    throw error
  }
}


export const editscnnerdata = async (ScannerLoginId,OrganizerLoginId,Password,Name,MobileNo,EmailId,PhotoPath) => {
  try{
    const response = await FetchMethod.PUT({
      EndPoint:'ORGApp_ScannerAccount/Update_Scanner',
      Params:{
        ScannerLoginId: ScannerLoginId,
        OrganizerLoginId: OrganizerLoginId,
        Password: Password,
        Name: Name,
        MobileNo:MobileNo,
        EmailId:EmailId,
        PhotoPath: PhotoPath
      }
    })
    return response
  }catch(error){
    throw error
  }
}

export const deletescannerdata = async (Id) => {
  try {
    const response = await FetchMethod.DELETE({
      EndPoint: "ORGApp_ScannerAccount/Delete_ScannerAccount",
      Params: {
        ScannerLoginId: Id,
      },
    });
    return response;
  } catch (error) {
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
    throw error;
  }
};

export const AddDiscount_Box = async (data, eventId) => {
  try {
    const response = await FetchMethod.POST({
      EndPoint: `ORGApp_BoxOffice/Add_Boxofficediscount`,
      Params: {
        BoxOfficeDiscountid: data.BoxOfficeDiscountid,
        ToAmount: data.ToAmount,
        FromAmount: data.FromAmount,
        DiscountAmount: data.DiscountAmount,
        EventMasterid: eventId,
        BoxofficeUserId: data.BoxofficeUserId,
      },
      NeedToken: true,
    });
  } catch (error) {
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
    return response;
  } catch (error) {
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
    throw error;
  }
};
