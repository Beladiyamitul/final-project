


export const IsLogin = () =>{
    if(sessionStorage.getItem("user")){
        return true
    }else{
        return false
    }
}

