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
  Id) => {
  try{
      const response = await FetchMethod.POST({
        EndPoint : Id === 1 ? "ORGApp/SelllerMasterAdd" : Id === 2 ? 'ORGApp_BoxOffice/BoxofficeUser_LoginAdd' : '',
        Params:{
          ...(Id === 1 ? {SelllerLoginid:0} : Id === 2 ? {BoxofficeUserId:0} : {}),
          OrganizerLoginId:OrganizerLoginId,
          Password:Password,
          Name:Name,
          MobileNo:Number,
          EmailId:Email,
          PhotoPath:Photos
        }
      })
      return response
    }catch(error){
      console.error(Id === 1 ? "Add new seller error" : Id === 2 ? 'Add new boxoffice error' : '',error)
      throw error;
    }
  }
  
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


export const getallseller = async (PageIndex,PageCount,OrganizerLoginid) => {
  try{
    // console.log(PageIndex,PageCount,OrganizerLoginid);
    const response = await FetchMethod.GET({
      EndPoint: `ORGApp/SelllerMasterList/${PageIndex}/${PageCount}/${OrganizerLoginid}`
    });
    return response;
  }catch(error){
    console.error("Sellerget error",error)
    throw error;
  }
}


export const editsellerdata = async (SelllerLoginid,OrganizerLoginId,Password,Name,MobileNo,EmailId,PhotoPath) => 
  {
    try{
      const response = await FetchMethod.PUT({
        EndPoint: 'ORGApp/SelllerMasterUpdate',
        Params:
        {
          SelllerLoginid: SelllerLoginid,
          OrganizerLoginId: OrganizerLoginId,
          Password: Password,
          Name: Name,
          MobileNo: MobileNo,
          EmailId: EmailId,
          PhotoPath: PhotoPath
        }
      })
      return response
    }catch(error){
      console.error("Editsellerdatav error",error)
      throw error
    }
  }


  export const deleteseller = async (id) =>
  {
    try{
      const response = await FetchMethod.DELETE({
        EndPoint:'ORGApp/Delete_SelllerMaster',
        Params:{
            SelllerLoginid: id
          }
      })
      return response
    }catch(error){
      console.error("Delete data succesfully")
      throw error
    }
  }

// =========== BoxOffice get, Edit, delete ==============
  
  export const getboxoffice = async (PageIndex,PageCount,OrganizerLoginId) => {
    try{
        const response = await FetchMethod.GET({
          EndPoint:`ORGApp_BoxOffice/BoxOfficeUserList/${PageIndex}/${PageCount}/${OrganizerLoginId}`,
        })
        return response
    }catch(error){
      console.error('Getboxoffice Boxoffice error',error);
      throw error
    }
  } 


  export const editboxdata = async (BoxofficeUserId,OrganizerLoginId,Password,Name,MobileNo,EmailId,PhotoPath) => 
    {
      try{
        const response = await FetchMethod.PUT({
          EndPoint: 'ORGApp_BoxOffice/BoxofficeUser_Update',
          Params:
          {
            BoxofficeUserId: BoxofficeUserId,
            OrganizerLoginId: OrganizerLoginId,
            Password: Password,
            Name: Name,
            MobileNo: MobileNo,
            EmailId:EmailId,
            PhotoPath: PhotoPath
          }
        })
        return response
      }catch(error){
        console.error("editboxoffice error",error)
        throw error
      }
    }


    export const deleteboxoffice = async (Id) => {
      try{
        const response = await FetchMethod.DELETE({
          EndPoint:'ORGApp_BoxOffice/Delete_BoxofficeUser',
          Params:{
            BoxofficeUserId:Id
          }
        })
        return response;
      }catch(error){
        console.error("dleteboxofficeerror", error);
        throw error
      }
    }
  