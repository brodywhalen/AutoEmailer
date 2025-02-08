import BackButton from "../components/BackButton";
import { useEffect } from "react";
import axios, {AxiosError} from "axios";
import { useState } from "react";
import { NewList } from "../utils/types";

import Flow from "../components/Flow";

// react node imports




const CreateAutomation = () => {

    const [list, setLists] = useState<NewList[]>([])
    console.log(list)

// import lists when the create automation page is open
    useEffect(() => {
        axios.get('http://localhost:3000/list/getData').then( res => {
            setLists(res.data)
            }).catch(error => {
                if(error instanceof AxiosError){
                    if(!error.response){
                        alert('No response from the server')
                    }
                    console.log(error.response!.data.error)
                    alert(error.response!.data.error)
                }
            })
    },[])



    return(<div>
        <BackButton/>
        <Flow/>

    </div>)

}

export default CreateAutomation;