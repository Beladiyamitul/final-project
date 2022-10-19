import { async } from "@firebase/util";
import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail  } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";





// export const SignupApi = (data) =>{
export const LoginAPI = (data) =>{

  console.log(data);

  return new Promise ((resolve , reject) => {
    signInWithEmailAndPassword(auth , data.email , data.password)
     .then( async  (user) => {
      
          if (user.user.emailVerified) {
            // resolve({ payload: user.user.uid });
            const userRef = doc(db, "users" , user.user.uid) ;
             
            await updateDoc(userRef,{emailVerified:true});

            const userRefGet = doc(db, "users" , user.user.uid) ;
            console.log("userRefGet",userRefGet);
            const userdGet = await getDoc(userRefGet);
            console.log(userdGet);

            resolve({ payload: {id:userdGet.id , ...userdGet.data()} });


          } else {
            reject({ payload: "Please  Verify Your Email"});
          }
          console.log(user);
        })
     .catch((error) =>{

        if (error.code.localeCompare("auth/wrong-password") === 0) {
          reject({ payload: "Wrong Email Or Password" });
        } else if (error.code.localeCompare("auth/user-not-found") === 0) {
          reject({ payload: "Please Email registered" });
        } 
        else {
          reject({ payload: error });
        }

      console.log(error);
     })

  })

}



// export const LoginAPI = (data) => {
export const SignupApi = (data) => {
  console.log(data);
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);


        onAuthStateChanged(auth, (user) => {
          if (user) {

            sendEmailVerification(user);
            const uid = user.uid;
          } else {
            // User is signed out
            // ...
          }
        });
      })
      .then((emailafterverify) => {
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            if (user.emailVerified) {
              resolve({ payload: "Email Successfull" });
            } else {
              resolve({ payload: "Please Enter Verify Email" });

              await setDoc(doc(db, "users", user.uid),{
                email:data.email,
                role:"user",
                emailVerified:user.emailVerified
              })
              .then(() => console.log("user Add"))
              .catch((error) => console.log(error.code))

            }
          } else {
            reject({ payload: "somthing went wrong" });
          }
        });
      })
      .catch((error) => {
        
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode);

        if (errorCode.localeCompare("auth/email-already-in-use") === 0) {
          reject({ payload: "Email Is Already registered" });
        } else {
          reject({ payload: errorCode });
        }
      });
      

  })

}

export const GoogleLoginAPI = () =>{
  return new Promise ((resolve, reject) =>{
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;

    resolve({payload: user})

  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);

    reject({payload: errorCode})
  });

  })
}



export const LogoutApi = () =>{
  return new Promise((resolve , reject) =>{
    signOut(auth)
    .then((user) =>{
      resolve({payload: "Logout Successfull"})
    })
    .catch((error) =>{
      reject({payload : "Somthing Went wrong"})
    })
  })
}

export const ForgotpassAPI = (data) =>{
  return new Promise((resolve , reject) =>{
    sendPasswordResetEmail(auth ,data.email)
    .then((user) =>{
      resolve({payload: "Please check Your Email Verify"})
    })
    .catch((error) =>{
      reject({payload : "Somthing Went wrong"})
    })
  })
}


