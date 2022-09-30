import { async } from "@firebase/util"
import { addDoc, collection , getDocs , doc, updateDoc, deleteDoc } from "firebase/firestore"
import { deleteDoctor, deleteDoctordata, getDoctordata, postDoctordata, updateDoctor } from "../../common/apis/doctor.api"
import { db, storage } from "../../firebase"
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { BASE_URL } from "../../shared/baseUrl"
import * as Actiontype from "../ActionType"


export const getProduct = () => async (dispatch) => {
  try {
    dispatch(loadingMedicin())

    const querySnapshot = await getDocs(collection(db, "Product"));

    let dataget = [];

    querySnapshot.forEach((doc) => {
      dataget.push({id: doc.id, ...doc.data()})
    });
     dispatch({type:Actiontype.GET_PRODUCT, payload: dataget})
 

    // getDoctordata()
    //   .then((data) => dispatch({ type: Actiontype.GET_DOCTOR, payload: data.data }))

  } catch (error) {
    dispatch(errorMedicin(error.message));
  }
}



export const addProductdata = (data) => async (dispatch) => {

  try {
    dispatch(loadingMedicin())

    const randomName = Math.floor(Math.random()*1000000000).toString();
    const docStorageRef = ref(storage, 'Product/'+randomName);  


    uploadBytes(docStorageRef, data.file)
    .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then(async(url) => {
                const docRef = await addDoc(collection(db, "Product"), {
                  product_name : data.product_name,
                  product_price : data.product_price,
                  product_list : data.product_list,
                  product_description : data.product_description,
                  url : url,
                  FileName:randomName
                });
                 dispatch({
                  type:Actiontype.POST_PRODUCT,
                   payload:{
                    id: docRef.id ,
                    product_name : data.product_name,
                    product_price : data.product_price,
                    product_list : data.product_list,
                    product_description : data.product_description,
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



export const deletCatagorydata = (data) => async (dispatch) => {
  try {

    dispatch(loadingMedicin())

 
    const fileRef = ref(storage, 'Product/'+ data.FileName);
    
    deleteObject(fileRef).
    then(async() => {
           await deleteDoc(doc(db, "Product", data.id));
    dispatch({ type: Actiontype.DELETE_PRODUCT, payload: data.id})
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


export const updateCatagoryata = (data) => async (dispatch) => {
  try {

    dispatch(loadingMedicin())
    const docDataRefedit = doc(db, "Product", data.id);

    if(typeof data.file === "string"){
      await updateDoc(docDataRefedit, {
        product_name : data.product_name,
        product_price : data.product_price,
        product_list : data.product_list,
        product_description : data.product_description,
        FileName:data.FileName,
        url : data.url

      });

      dispatch({ type: Actiontype.UPDATE_PRODUCT, payload: data})
    }else{
      
      const fileRefupdate = ref(storage, 'Product/'+ data.FileName);
    
      deleteObject(fileRefupdate).
        then(async() => {

          const randomName = Math.floor(Math.random()*1000000000).toString();
          const docStorageins = ref(storage, 'Product/'+randomName);  
      
      
          uploadBytes(docStorageins, data.file)
          .then((snapshot) => {
              getDownloadURL(snapshot.ref)
                .then(async(url) => {
                  await updateDoc(docDataRefedit, {
                    product_name : data.product_name,
                    product_price : data.product_price,
                    product_list : data.product_list,
                    product_description : data.product_description,
                    FileName:randomName,
                    url : url
            
                  });
            
                  dispatch({ type: Actiontype.UPDATE_PRODUCT, payload: {...data ,  FileName:randomName,
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

