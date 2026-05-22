import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Spinner from "../components/Loader/Spinner"

const GuestRoute=()=>{
    const {user,loading}= useAuth()

    if(loading) return <div><Spinner/></div>
    return user? <Navigate to='/' /> : <Outlet/>
}

export default GuestRoute