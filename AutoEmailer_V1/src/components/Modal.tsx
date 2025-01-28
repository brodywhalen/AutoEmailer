/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import React, { MouseEventHandler } from "react";
import ReactDom from 'react-dom'
// import { useState } from "react";


interface ModalInput {
    open: boolean
    children: React.ReactNode
    onClose: MouseEventHandler<HTMLButtonElement>
}

const Modal = (params: ModalInput) =>{

    if(!params.open) return null;
    
    return ReactDom.createPortal(
        <>
        <div className="Overlay"/>
        
        <div className = "Modal">
            {params.children}
            <button onClick={params.onClose}> Back </button>
            
        </div>
        </>, document.getElementById('Portal')!
    )
}

export default Modal;