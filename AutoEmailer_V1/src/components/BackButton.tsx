import React from "react";
import { useNavigate } from "react-router-dom";
import '../component-styles/backbutton.css'





const BackButton = () => {
    const navigate = useNavigate()
    return(
        <button className="backbutton" onClick={()=> navigate(-1)}>Back</button>
    )
}

export default BackButton