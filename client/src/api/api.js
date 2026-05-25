import axios from 'axios'
import { toast } from 'react-toastify'

export const api=axios.create({
    baseURL:'http://localhost:7000/api'
})

api.interceptors.request.use((config)=>{
    const token=localStorage.getItem("token")

    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }

  return config  
})

api.interceptors.response.use(
  (response) => {
    // Show success toast only when needed
    if (response.config?.showSuccessToast) {
      const message =
        response.config.successMessage ||
        response.data?.message ||   //the backend respomse
        "successful";

      toast.success(message, {
        theme: "colored",
      });
    }

    return response;
  },

  (error) => {
    const message = error.response?.data?.message || "Something went wrong";

    const status = error.response?.status;

    if (!error.config?.skipToast && status !== 401) {
      toast.error(message, {
        theme: "colored",
      });
    }


    if (status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    } 
 
    // //  FOrbidden
    // if (status === 403) {
    //   toast.error(message, {
    //     theme: "colored",
    //   });
    // }

    return Promise.reject(error);
  },
);