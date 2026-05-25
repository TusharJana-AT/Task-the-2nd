import React from 'react'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router'
import { AuthProvider } from './context/AuthContext'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router}/>
      </AuthProvider>
      <ToastContainer />
    </>
  )
}

export default App