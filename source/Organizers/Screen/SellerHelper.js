import {
  TicketBalance,
  TicketData,
  TicketQtyAdd,
  TicketQtyDelete,
  TicketQtyUpdate,
  TicketType,
} from "../../api/Api";

export const fetchTicketDetails = async (eventId, setTicketData, setData) => {
  try {
    const response = await TicketData(11, eventId);
    if (response.Response === 0) {
      setTicketData(response.Details);
      const ticketTypes =
        response.Details?.map((item) => ({
          label: item.TicketType,
          value: item.EventMaster_TicketTypeid,
        })) || [];
      setData(ticketTypes);
    }
  } catch (error) {
    console.error(error);
  }
};

export const fetchTicketTypes = async (eventId, setData) => {
  try {
    const response = await TicketType(eventId);
    if (response) {
      const ticketTypes =
        response.map((item) => ({
          label: item.TicketType,
          value: item.EventMaster_TicketTypeid,
        })) || [];
      setData(ticketTypes);
    }
  } catch (error) {
    console.error(error);
  }
};

export const fetchTicketBalance = async (eventId, TicketTypeid, setBalance) => {
  try {
    const response = await TicketBalance(11, eventId, TicketTypeid);
    console.log("Ticket Balance Response:", response);
    setBalance(response);
  } catch (error) {
    console.error(error);
  }
};

export const addTicketQty = async (
  eventId,
  TicketTypeid,
  Balance,
  SellerTicketQty,
  setTicketData,
  setError,
  setShowEmptyView
) => {
  try {
    if (SellerTicketQty >= 10 && SellerTicketQty <= Balance) {
      const response = await TicketQtyAdd(
        11,
        eventId,
        TicketTypeid,
        SellerTicketQty
      );
      console.log(response);
      if (response.Response == 0) {
        setTicketData([]);
        setError("");
        setShowEmptyView(false);
      } else {
        setError(response.ResponseMessage);
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export const updateTicketQty = async (
  SelllerMasterDetailsid,
  eventId,
  TicketTypeid,
  SellerTicketQty,
  setError
) => {
  try {
    const response = await TicketQtyUpdate(
      SelllerMasterDetailsid,
      11,
      eventId,
      TicketTypeid,
      SellerTicketQty
    );
    if (response.Response == 0) {
      setError("");
    } else if (response.Response == -1) {
      setError(response.ResponseMessage);
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteTicketQty = async (SelllerMasterDetailsid) => {
  try {
    const response = await TicketQtyDelete(SelllerMasterDetailsid);
    console.log("response", response);
  } catch (error) {
    console.error(error);
  }
};
