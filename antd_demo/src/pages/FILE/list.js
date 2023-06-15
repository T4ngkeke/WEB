import React from "react"
import { useLocation } from "react-router-dom"


const FileList = () => {
  const location=useLocation()
  return (
    <>
    <button onClick={()=>{
      console.log(location)
    }
    }>recieve
    </button>
    </>
  )
}

export default FileList
