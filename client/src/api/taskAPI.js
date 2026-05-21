import { api } from "./api"



export const addTask=(data)=>{
    return api.post('/task/addTask',data)
}

export const deleteTask=(taskId)=>{
    return api.delete(`/task/deleteTask/${taskId}`)
}

export const editTask=(data,taskId)=>{
    return api.put(`/task/editTask/${taskId}`,data)
}

export const getCreatedTask = (params) => {
  return api.get("/task/getCreatedTask", {
    params,
  });
};

export const getAssignedTask = (params) => {
  return api.get("/task/getAssignedTask", {
    params,
  });
};
export const getSingleTask = (taskId)=>{
    return api.get(`/task/getSingleTask/${taskId}`)
}