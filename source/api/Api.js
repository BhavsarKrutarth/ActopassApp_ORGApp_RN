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
// ===================Dashboard======================= //

  export const loistofevent = async (OrganizerLoginid) => {
    try{
      const response = await FetchMethod.GET({
        EndPoint: `ORGApp/OrganizerEventList/${1}/${1000}/${OrganizerLoginid}`,
      })
      return response
    }catch(error){
      console.log('Dashboard event list error',error);
      throw error
    }
  }


  export const percentagedata = async (BoxId,EvntId) => {
    console.log(BoxId,EvntId);
    
    try{
      const response = await FetchMethod.GET({
        EndPoint:`ORGApp/GetOrganizationdashborad/${BoxId}/${EvntId}`,
      })
      return response
    }catch(error){
      console.log('Dashboard percentage data error',error);
      throw error
    }
  } 


// =============================================== //


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
          : { ScannerLoginId: 0 }),
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
// ==================================================== //

// =========== Seller get, Edit, delete ==============

export const getallseller = async (PageIndex, PageCount, OrganizerLoginid) => {
  try {
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
// ====================================================//

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
// =============================================== ///

// ============= scanner get,update,delete =================

export const getscanner = async (PageIndex, PageCount, OrganizerLoginId) => {
  try {
    const response = await FetchMethod.GET({
      EndPoint: `ORGApp_ScannerAccount/GetScannerList/${PageIndex}/${PageCount}/${OrganizerLoginId}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const editscnnerdata = async (
  ScannerLoginId,
  OrganizerLoginId,
  Password,
  Name,
  MobileNo,
  EmailId,
  PhotoPath
) => {
  try {
    const response = await FetchMethod.PUT({
      EndPoint: "ORGApp_ScannerAccount/Update_Scanner",
      Params: {
        ScannerLoginId: ScannerLoginId,
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


// =============================================== //

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

// Organizer Ticket API
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

// ==================== BoxofficeTicketsend ======================

export const geteventlist = async (BoxofficeUserId) => {
  try {
    const response = await FetchMethod.GET({
      EndPoint: `ORGAPP_BoxOfficeTicketBook/ToDayEvent_BoxOffice/${BoxofficeUserId}`,
    });
    return response;
  } catch (error) {
    console.log("Get EventList Error", error);
    throw error;
  }
};

export const geteventdate = async (EventMasterid) => {
  try {
    const response = await FetchMethod.GET({
      EndPoint: `ORGAPP_BoxOfficeTicketBook/Upcoming_boxofficeeventdateList/${EventMasterid}`,
    });
    return response;
  } catch (error) {
    console.log("Event Date Get Error", error);
    throw error;
  }
};

export const ticketget = async (EventMasterid) => {
  try {
    const response = await FetchMethod.GET({
      EndPoint: `ORGAPP_BoxOfficeTicketBook/Upcoming_boxofficeevent_tickettypeList/${EventMasterid}`,
    });
    return response;
  } catch (error) {
    console.log("Event Ticket Type Get Error", error);
    throw error;
  }
};

export const applydis = async (BoxuserId, Amount, EventId) => {
  try {
    const response = await FetchMethod.GET({
      EndPoint: `ORGAPP_BoxOfficeTicketBook/Upcoming_boxofficeevent_discountchk/${BoxuserId}/${Amount}/${EventId}`,
    });
    return response;
  } catch (error) {
    console.log("Discount Apply Error", error);
    throw error;
  }
};

export const bookingtickets = async (sendobject) => {
  // console.log(JSON.stringify(sendobject, null, 2));
  try {
    const response = await FetchMethod.POST({
      EndPoint: "ORGAPP_BoxOfficeTicketBook/TicketBooking",
      Params: sendobject,
    });
    return response;
  } catch (error) {
    console.log("Booking Ticket Error", error);
    throw error;
  }
};

export const getboxhistory = async (
  PageIndex,
  PageCount,
  Boxofficediscountid
) => {
  try {
    const response = await FetchMethod.GET({
      EndPoint: `ORGAPP_BoxOfficeTicketBook/GetBoxOfficeUserHistoryList/${PageIndex}/${PageCount}/${Boxofficediscountid}`,
    });
    return response;
  } catch (error) {
    console.log("GetBox History error", error);
  }
};



// ==================== BoxofficeTicketsend ======================

export const geteventlist = async (BoxofficeUserId) => {
  try{
    const response = await FetchMethod.GET({
      EndPoint:`ORGAPP_BoxOfficeTicketBook/ToDayEvent_BoxOffice/${BoxofficeUserId}`,
    })
    return response
  }catch(error){
    console.log('Get EventList Error',error);
    throw error
  }
}

export const geteventdate = async (EventMasterid) => {
  try{
    const response  = await FetchMethod.GET({
      EndPoint:`ORGAPP_BoxOfficeTicketBook/Upcoming_boxofficeeventdateList/${EventMasterid}`
    })
    return response;
  }catch(error){
    console.log('Event Date Get Error',error);
    throw error;
  }
}


export const ticketget = async (EventMasterid) => {
  try{
    const response = await FetchMethod.GET({
      EndPoint:`ORGAPP_BoxOfficeTicketBook/Upcoming_boxofficeevent_tickettypeList/${EventMasterid}`
    })
    return response
  }catch(error){
    console.log('Event Ticket Type Get Error',error);
    throw error;
  }
}

export const applydis = async (BoxuserId,Amount,EventId) => {
  try{
    const response = await FetchMethod.GET({
      EndPoint:`ORGAPP_BoxOfficeTicketBook/Upcoming_boxofficeevent_discountchk/${BoxuserId}/${Amount}/${EventId}`
    })
    return response
  }catch(error){
    console.log('Discount Apply Error',error);
    throw error;
  }
} 


export const bookingtickets = async (sendobject) => {
  // console.log(JSON.stringify(sendobject, null, 2));
  try{
    const response = await FetchMethod.POST({
      EndPoint:'ORGAPP_BoxOfficeTicketBook/TicketBooking',
      Params:sendobject
    }) 
    return response;
  }catch(error){
    console.log('Booking Ticket Error',error);
    throw error
  }
}

export const getboxhistory = async (PageIndex,PageCount,Boxofficediscountid) => {
  console.log(PageIndex,PageCount,Boxofficediscountid);
  
  try{  
    const response = await FetchMethod.GET({
      EndPoint:`ORGAPP_BoxOfficeTicketBook/GetBoxOfficeUserHistoryList/${PageIndex}/${PageCount}/${Boxofficediscountid}`,
    })
    return response
  }catch(error){
    console.log('GetBox History error',error);
    throw error
  }
}

// ===================================== //
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

// Seller Ticket Book
export const SEL_UpComingEvents = (SelllerLoginid) =>
  fetchAPI(
    "GET",
    `ORGApp_SellerTicketBook/Upcoming_Seller_event_List/${SelllerLoginid}`
  );

export const SEL_EventDate = (EventMasterid) =>
  fetchAPI(
    "GET",
    `ORGApp_SellerTicketBook/Upcoming_Seller_eventDate_List/${EventMasterid}`
  );

export const SEL_TicketType = (EventMasterid, SelllerLoginid) =>
  fetchAPI(
    "GET",
    `ORGApp_SellerTicketBook/Upcoming_seller_tickettype_List/${EventMasterid}/${SelllerLoginid}`
  );

export const SEL_TicketBook = (
  sellerLoginId,
  mobileNo,
  bookingTicketQty,
  bookingAmount,
  eventMasterId,
  bookTicketName,
  remark,
  confirmMobileNo,
  eventDate,
  ticketTypes
) =>
  fetchAPI("POST", "ORGApp_SellerTicketBook/SellerTicketBooking", {
    SelllerLoginid: sellerLoginId,
    MobileNo: mobileNo,
    BookingTicketQty: bookingTicketQty,
    BookingAmount: bookingAmount,
    EventMasterid: eventMasterId,
    BookTicket_Name: bookTicketName,
    Remark: remark,
    Confirm_Moblie_No: confirmMobileNo,
    EventDate: eventDate,
    TicketTypes: ticketTypes,
  });

export const SEL_History = (PageIndex, PageCount, SelllerLoginid) =>
  fetchAPI(
    "GET",
    `ORGApp_SellerTicketBook/Sellerticketbook_history_List/0/10/11`
  );

