import { api } from "./api"


export const loginUser=(data)=>{
    return api.post('/user/login',data,{ showSuccessToast: true })
}

export const registerUser=(data)=>{
    return api.post('/user/register',data,{ showSuccessToast: true })
}

export const getUser=()=>{
    return api.get('/user/get-user')
}

export const getAllUser=()=>{
    return api.get('/user/getAllUser')
}