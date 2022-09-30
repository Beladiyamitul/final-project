import { async } from "@firebase/util"
import { addDoc, collection , getDocs , doc, updateDoc, deleteDoc } from "firebase/firestore"
import { deleteDoctor, deleteDoctordata, getDoctordata, postDoctordata, updateDoctor } from "../../common/apis/doctor.api"
import { db, storage } from "../../firebase"
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { BASE_URL } from "../../shared/baseUrl"
import * as Actiontype from "../ActionType"


export const getdocdata = () => async (dispatch) => {

  try {
    dispatch(loadingMedicin())

    const querySnapshot = await getDocs(collection(db, "Catagory"));

    let dataget = [];

    querySnapshot.forEach((doc) => {
      dataget.push({id: doc.id, ...doc.data()})
    });
     dispatch({type:Actiontype.GET_DOCTOR, payload: dataget})
 

    // getDoctordata()
    //   .then((data) => dispatch({ type: Actiontype.GET_DOCTOR, payload: data.data }))

  } catch (error) {
    dispatch(errorMedicin(error.message));
  }
}



export const addDoctordata = (data) => async (dispatch) => {

  try {
    dispatch(loadingMedicin())

    const randomName = Math.floor(Math.random()*1000000000).toString();
    const docStorageRef = ref(storage, 'Catagory/'+randomName);  


    uploadBytes(docStorageRef, data.file)
    .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then(async(url) => {
                const docRef = await addDoc(collection(db, "Catagory"), {
                  catagory_name : data.catagory_name,
                  // catagory_price : data.catagory_price,
                  // catagory_list : data.catagory_list,
                  url : url,
                  FileName:randomName
                });
                 dispatch({
                  type:Actiontype.POST_DOCTOR,
                   payload:{
                    id: docRef.id ,
                    catagory_name : data.catagory_name,
                    // catagory_price : data.catagory_price,
                    // catagory_list : data.catagory_list,
                    url : url,   
                    FileName:randomName
                  }})

          })
    });
        
    // postDoctordata(data)
    //     .then((data) => dispatch({ type: Actiontype.POST_DOCTOR, payload: data.data }))
    //     .catch((error) => dispatch(errorMedicin(error.message)))

  } catch (error) {
    dispatch(errorMedicin(error.message));
    console.error("Error adding document: ", error);
  }
}



export const deletDoctordata = (data) => async (dispatch) => {
  try {

    dispatch(loadingMedicin())

 
    const fileRef = ref(storage, 'Catagory/'+ data.FileName);
    
    deleteObject(fileRef).
    then(async() => {
           await deleteDoc(doc(db, "Catagory", data.id));
    dispatch({ type: Actiontype.DELETE_DOCTOR, payload: data.id})
    })
    .catch((error) => {
      dispatch(errorMedicin(error.message));
    });


    // deleteDoctor(id)
    //     .then((data) => dispatch({ type: Actiontype.DELETE_DOCTOR, payload: id}))
    //     .catch((error) => dispatch(errorMedicin(error.message)))
 

  } catch (error) {
    dispatch(errorMedicin(error.message));
  }
}


export const updateDoctordata = (data) => async (dispatch) => {
  try {

    dispatch(loadingMedicin())
    const docDataRefedit = doc(db, "Catagory", data.id);

    if(typeof data.file === "string"){
      await updateDoc(docDataRefedit, {
        catagory_name : data.catagory_name,
        // catagory_price : data.catagory_price,
        // catagory_list : data.catagory_list,
        FileName:data.FileName,
        url : data.url

      });

      dispatch({ type: Actiontype.UPDATE_DOCTOR, payload: data})
    }else{
      
      const fileRefupdate = ref(storage, 'Catagory/'+ data.FileName);
    
      deleteObject(fileRefupdate).
        then(async() => {

          const randomName = Math.floor(Math.random()*1000000000).toString();
          const docStorageins = ref(storage, 'Catagory/'+randomName);  
      
      
          uploadBytes(docStorageins, data.file)
          .then((snapshot) => {
              getDownloadURL(snapshot.ref)
                .then(async(url) => {
                  await updateDoc(docDataRefedit, {
                    catagory_name : data.catagory_name,
                    // catagory_price : data.catagory_price,
                    // catagory_list : data.catagory_list,
                    FileName:randomName,
                    url : url
            
                  });
            
                  dispatch({ type: Actiontype.UPDATE_DOCTOR, payload: {...data ,  FileName:randomName,
                    url : url}})
                })
      })



      })
    }
      

  //  return  updateDoctor(data)
  //       .then((data) => dispatch({ type: Actiontype.UPDATE_DOCTOR, payload: data.data}))
  //       .catch((error) => dispatch(errorMedicin(error.message)))
 

  } catch (error) {
    dispatch(errorMedicin(error.message));
  }
}


export const loadingMedicin = () => (dispatch) => {
  dispatch({ type: Actiontype.LOADING_MEDICINE })
}

export const errorMedicin = (error) => (dispatch) => {
  dispatch({ type: Actiontype.ERROR_MEDICINE, payload: error })
}

