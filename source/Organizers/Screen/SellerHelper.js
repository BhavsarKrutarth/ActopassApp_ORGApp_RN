import { Alert } from "react-native";
import {
  TicketBalance,
  TicketData,
  TicketQtyAdd,
  TicketQtyDelete,
  TicketQtyUpdate,
  TicketType,
} from "../../api/Api";

export const fetchTicketDetails = async (SelllerLoginid, eventId, setData) => {
  try {
    const response = await TicketData(SelllerLoginid, eventId);
    console.log("response", response.Details);

    if (response.Response === 0) {
      setData(response.Details);
    }
  } catch (error) {}
};

export const fetchTicketTypes = async (eventId, setTicketType) => {
  try {
    const response = await TicketType(eventId);
    if (response) {
      const ticketTypes =
        response.map((item) => ({
          label: item.TicketType,
          value: item.EventMaster_TicketTypeid,
        })) || [];
      setTicketType(ticketTypes);
    }
  } catch (error) {}
};

export const fetchTicketBalance = async (
  SelllerLoginid,
  eventId,
  TicketTypeid
) => {
  try {
    const response = await TicketBalance(SelllerLoginid, eventId, TicketTypeid);
  } catch (error) {}
};

export const addTicketQty = async (
  SelllerLoginid,
  eventId,
  TicketTypeid,
  Balance,
  SellerTicketQty,
  setError,
  setEmptyView
) => {
  try {
    if (SellerTicketQty <= Balance) {
      const response = await TicketQtyAdd(
        SelllerLoginid,
        eventId,
        TicketTypeid,
        SellerTicketQty
      );
      if (response.Response == 0) {
        setError("");
        Alert.alert("Data add successfully.");
        setEmptyView(false);
      } else {
        setError(response.ResponseMessage);
      }
    }
  } catch (error) {}
};

export const updateTicketQty = async (
  SelllerLoginid,
  index,
  SelllerMasterDetailsid,
  eventId,
  TicketTypeid,
  Balance,
  SellerTicketQty,
  setError,
  IsError,
  Setsuccesmodal
) => {
  try {
    if (SellerTicketQty <= Balance) {
      const response = await TicketQtyUpdate(
        SelllerMasterDetailsid,
        SelllerLoginid,
        eventId,
        TicketTypeid,
        SellerTicketQty
      );
      if (response.Response == 0) {
        Setsuccesmodal(true);
      } else {
        const updatedErrors = [...IsError];
        updatedErrors[index] = response.ResponseMessage;
        setError(updatedErrors);
      }
    }
  } catch (error) {}
};

export const deleteTicketQty = async (
  SelllerMasterDetailsid,
  setData,
  setError,
  IsError,
  index
) => {
  try {
    setError("");
    const response = await TicketQtyDelete(SelllerMasterDetailsid);
    if (response.Response == 0) {
      setData((prevData) => {
        const updatedData = [...prevData];
        updatedData[index] = {
          ...updatedData[index],
          TicketQty: 0,
          Available_balance: 0,
          isVisible: false,
        };
        return updatedData;
      });
    } else {
      const updatedErrors = [...IsError];
      updatedErrors[index] = response.ResponseMessage;
      setError(updatedErrors);
    }
  } catch (error) {}
};
