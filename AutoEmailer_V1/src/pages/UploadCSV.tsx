import React, {useState,useEffect, ReactNode} from "react";
import Papa, { ParseResult } from 'papaparse';
import { AddedParam } from "../utils/types";
import Modal from "../components/Modal";
import { useRef } from "react";
// import { ParsedResults } from "../utils/types";
// import { parsedDataObject } from "../utils/types";
import axios, { AxiosError } from "axios";

const UploadCSV = () => {


    
    // const fileInputRef = useRef(null);
    const [myFile, setMyFile] = useState<File>();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [parsedFile, setParsedFile] = useState<ParseResult<any>>();
    const [fieldCheck, setFieldCheck] = useState<boolean>(false);
    const [addedParams, setAddedParams] =useState<AddedParam[]>([{param: '', value: "0"}]) // test value at first
    const [selectValue, setSelectValue] = useState<number[]>([0,0,0,0]);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const inputRef = useRef<any>(null);
    
   
    // have column values stored, now just need to send to backend properly.

    
    useEffect (()=> 
        
        console.log('parsedfile: ',parsedFile), [parsedFile]
        // console.log('selected: ', selectValue)
        // console.log('paramvalues: ', addedParams)}, [addedParams,selectValue]
       
    ) 

    const onFileChange = (event:React.ChangeEvent<HTMLInputElement>)=> {
        console.log('useState method filechange: ', event.target.files![0])
        setMyFile(event.target.files![0]);

        // parse file right after whcih will set to state
        parseStringyFile(event.target.files![0]);
        
        setFieldCheck(false)
        setSelectValue([0,0,0,0])
        setAddedParams([{param: '', value: "0"}])
        
        
    }
    const checkFileType = (myFile: File): boolean => {
        const filenameEXT = (myFile.name.split('.').pop() as string).toLowerCase();
        const allowedExtensions = ['csv'];

        if(allowedExtensions.includes(filenameEXT)) {
            return true;
        } else {
            return false
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    const fileIntoString = (myFile:File, myFunc:Function):void => {

        //read file
        const reader = new FileReader();
        reader.onload = event => {myFunc((event.target as FileReader).result)}
        reader.onerror = error => {throw(error)}
        reader.readAsText(myFile);
           
        // const parsedFile = Papa.parse(stringyFile)
        
    }
    const parseStringyFile = (myFile:File): void => {

        if(myFile){
            //call back function that runs after file is read
            const localParse = (myString:string):void => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const parsed: ParseResult<any> = Papa.parse(myString, {header: true})
                //saves to state
                setParsedFile(parsed)
            }
            fileIntoString(myFile, localParse)
        } else {
            setParsedFile(undefined);
        }
    }
const renderOptions = ():ReactNode => {
    
    // render options as headers pulled from file, save value as index of meta fields.
    const options = parsedFile?.meta.fields?.map((header, index) => <option key={index + 1} value={index + 1}>{header}</option>)
    return(<><option value={0}> no column </option>{options}</>) // 0 value is set as no data assigned.
}
const renderAddedParamsList = () =>{

    
    // map all added params state to a list. Contains input for param name and dropbox to assign column. X button deletes param and + addes another param.
    const myitems = addedParams?.map((_param, index) =>{
    
        // console.log("index: ", index)
        return(
        <div>
        <label> Field Name </label><input value={addedParams[index].param} onChange={(event) => changeParamTitle(index,event)}/> <select value = {addedParams[index].value} onChange={(event) => changeParamValue(index, event)}>{renderOptions()}</select>
        {((index === 0) && (addedParams.length === 1)) 
            ? (<><button onClick={(event) => addParam(event,index)}> ➕ </button></>) 
            : <><button onClick={(event) => addParam(event,index)}> ➕ </button><button onClick={(event) => removeParam(event,index)}> ➖ </button></>
        }
        
        
        </div>
        )
    }
    )
    // console.log(addedParams)
    return( myitems)
}
const addParam = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, index:number) => {
    event.preventDefault()
    // console.log('adding after index: ', index)
    // need to copy objects with spread syntax
    const clonedArray = addedParams.map(a => {return {...a}})
    //splice in the addition with an empty state
    clonedArray.splice(index +1, 0, { param: "", value: "0"})
   // set state
    setAddedParams(clonedArray)
}
const removeParam = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
    event.preventDefault();
    const clonedArray = addedParams.map(a => { return {...a}})
    clonedArray.splice(index, 1)
    setAddedParams(clonedArray)
}
const changeParamTitle = (index:number, event: React.ChangeEvent<HTMLInputElement>) => {
    const clonedArray = addedParams.map(a => {return {...a}})
    clonedArray[index].param = event.target.value;
    setAddedParams(clonedArray);
}
const changeParamValue = (index: number, event: React.ChangeEvent<HTMLSelectElement>) => {
    const clonedArray = addedParams.map(a => {return {...a}})
    clonedArray[index].value = event.target.value;
    setAddedParams(clonedArray)
}
const changeMainColumn = (event : React.ChangeEvent<HTMLSelectElement>) => {
    
    
    // console.log('this :',event.target.value)
    const fieldID = event.target.id;

    const newArray = selectValue.map( (c,i) => {
        if( i === Number(fieldID)){
            return Number(event.target.value);
        } else{
            return c
        }
    })
    setSelectValue(newArray)


    // setSelectValue(Number(event.target.value));
    
    // const nextState = mainColumns.map( (c,i) => {
    //     if(this.id
    // })
}
const createList =  async (event: { preventDefault: () => void; }) => {

    // need a way to store current state column ID
    // could set email --> Linkedin to 1-4, and then start custom fields from 5. 0 is no column assigned


    event.preventDefault();
    // console.log('emailheader: ', emailHeader)
    setIsOpen(true)

}
const postList = async () => {
    // alert(`Name:  ${inputRef.current!.value}`)

    const headerArray = parsedFile?.meta.fields; // get header array and add no columns as first index
    const emailHeader = (headerArray as string[])[selectValue[0]-1]
    const firstNameHeader = (headerArray as string[])[selectValue[1]-1]
    const lastNameHeader = (headerArray as string[])[selectValue[2]-1]
    const LIHeader = (headerArray as string[])[selectValue[3]-1]

    const ListObject = {
        listName: inputRef.current.value,
        contacts: parsedFile?.data.map(row => {        
            return ({
                email: row[emailHeader],
                name: {first: row[firstNameHeader], last: row[lastNameHeader]},
                linkedIn: row[LIHeader],
                addedParams: addedParams.map(param => {
                    const paramHeader = (headerArray as string[])[Number(param.value) -1]
                    return(
                        {
                            param: param.param,
                            value: row[paramHeader]
                        }
                    )
                })
            })
        }),
        user: 'test user'
    }
    console.log('listobj: ',ListObject);
    // communicate with backend

    try{
        const response = await axios.post('http://localhost:3000/list/createList', ListObject)
        alert('List Created!')
        setIsOpen(false)  
        console.log('myres: ', response);
    } catch (error){

        if(error instanceof AxiosError){
            console.log(error.response!.data.error)
            alert(error.response!.data.error)
        }
        
        // console.log(err.response.data)
    }

    

}




    return(
    <div>
        <h1 className="menu-header">Upload CSV</h1>
        <section className="menu-section">
            <h2 style={{margin: 0, textAlign: "left"}} > Steps </h2>
            <ol style={{margin:0}}className="menu-list-wrapper">
                <li key= "step1" className="menu-list"> 
                {myFile && checkFileType(myFile) ? (<div>✔️</div>) : <div>❌</div>}<div> Upload CSV </div>
                    <form>
                        <input type='file' accept=".csv" id="myCSV" name="filename" onChange={onFileChange}></input>
                    </form>

                </li>
                <li key = "step2" className="menu-list"> Map Columns </li>
                {myFile && checkFileType(myFile) ? (
                    <form className="menu-list-select" onSubmit={createList}>
                        <section className="menu-list-column-select">
                        <h3 className="select-row"> Email Address* <select onChange={changeMainColumn} id = "0" value={selectValue[0]}>{renderOptions()}</select></h3>
                        <h3 className="select-row"> First Name <select onChange={changeMainColumn} id = "1" value={selectValue[1]}>{renderOptions()}</select></h3>
                        <h3 className="select-row"> Last Name <select onChange={changeMainColumn} id = "2" value={selectValue[2]}>{renderOptions()}</select></h3>
                        <h3 className="select-row"> LinkedIn URL <select onChange={changeMainColumn} id = "3" value={selectValue[3]}>{renderOptions()}</select></h3>
                        </section>
                        <section>
                            <h3> Custom Fields <input type="checkbox" checked={fieldCheck} onChange={() => setFieldCheck(!fieldCheck)}></input></h3>
                            {fieldCheck ? (renderAddedParamsList()): (<div></div>)}
                        </section>
                        <Modal open={isOpen} onClose = {() => setIsOpen(false)}>
                           <input type= "text" name= "name" ref = {inputRef} placeholder ='Name your list'/><button onClick={postList}> Submit </button>
                        </Modal>
                        <button type="submit"> Create List </button>
                    </form>
                ): (<div></div>)}

            </ol>
        </section>
    </div>
    )
}

export default UploadCSV;