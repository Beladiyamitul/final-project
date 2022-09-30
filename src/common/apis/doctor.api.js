import { deleteRequest, getRequest, postRequest, putRequest } from "../request"


export const getDoctordata = () =>{
    return getRequest('doctors')
}

export const postDoctordata = (data) =>{
    return postRequest('doctors', data)
}

export const deleteDoctor= (id) =>{
    return deleteRequest('doctors/', id)
}

export const updateDoctor = (data) =>{
    return putRequest('doctors/', data)
}