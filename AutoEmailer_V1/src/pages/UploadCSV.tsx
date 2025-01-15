import React, {useState,useEffect, ReactNode} from "react";
import Papa, { ParseResult } from 'papaparse';
import { AddedParam } from "../utils/types";

const UploadCSV = () => {


    
    // const fileInputRef = useRef(null);
    const [myFile, setMyFile] = useState<File>();
    const [parsedFile, setParsedFile] = useState<ParseResult<string[]>>();
    const [fieldCheck, setFieldCheck] = useState<boolean>(false);
    const [addedParams, setAddedParams] =useState<AddedParam[]>([{param: 'test', value: "testy"}]) // test value at first
    
    useEffect (()=> console.log('data: ',parsedFile, 'header name: ',parsedFile?.meta), [parsedFile]) 

    const onFileChange = (event:React.ChangeEvent<HTMLInputElement>)=> {
        console.log('useState method filechange: ', event.target.files![0])
        setMyFile(event.target.files![0]);

        // parse file right after whcih will set to state
        parseStringyFile(event.target.files![0]);

        // if(myFile && checkFileType(event.target.files![0])){

        // }
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
                const parsed: ParseResult<string[]> = Papa.parse(myString, {header: true})
                //saves to state
                setParsedFile(parsed)
            }
            fileIntoString(myFile, localParse)
        } else {
            setParsedFile(undefined);
        }
    }
const renderOptions = ():ReactNode => {
    
    // render options as headers pulled from file
    const options = parsedFile?.meta.fields?.map(header => <option value={header}>{header}</option>)
    return(options)
}
const renderAddedParamsList = () =>{

    
    // map all added params state to a list. Contains input for param name and dropbox to assign column. X button deletes param and + addes another param.
    const myitems = addedParams?.map( (param, index) => <div><label> Field Name </label><input value={addedParams[index].param} onChange={(event) => changeParamValue(index,event)}/> <select>{renderOptions()}</select>
        <button onClick={(event) => addParam(event,index)}> ➕ </button><button> ➖ </button></div>
       
    )
    console.log(addedParams)
    return( myitems)
}
const addParam = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, index:number) => {
    event.preventDefault()
    console.log('adding after index: ', index)
    // need to copy objects with spread syntax
    const clonedArray = addedParams.map(a => {return {...a}})
    //splice in the addition with an empty state
    clonedArray.splice(index +1, 0, { param: "", value: ""})
   // set state
    setAddedParams(clonedArray)
}
const changeParamValue = (index:number, event: React.ChangeEvent<HTMLInputElement>) => {
    const clonedArray = addedParams.map(a => {return {...a}})
    clonedArray[index].param = event.target.value;
    setAddedParams(clonedArray);
}




    return(
    <div>
        <h1 className="menu-header">Upload CSV</h1>
        <section className="menu-section">
            <h2 style={{margin: 0, textAlign: "left"}} > Steps </h2>
            <ol style={{margin:0}}className="menu-list-wrapper">
                <li className="menu-list"> 
                {myFile && checkFileType(myFile) ? (<text>✔️</text>) : <text>❌</text>}<text> Upload CSV </text>
                    <form>
                        <input type='file' accept=".csv" id="myCSV" name="filename" onChange={onFileChange}></input>
                    </form>

                </li>
                <li className="menu-list"> Map Columns </li>
                {myFile && checkFileType(myFile) ? (
                    <form className="menu-list-select">
                        <section className="menu-list-column-select">
                        <h3 className="select-row"> Email Address* <select>{renderOptions()}</select></h3>
                        <h3 className="select-row"> First Name <select>{renderOptions()}</select></h3>
                        <h3 className="select-row"> Last Name <select>{renderOptions()}</select></h3>
                        <h3 className="select-row"> LinkedIn URL <select>{renderOptions()}</select></h3>
                        </section>
                        <section>
                            <h3> Custom Fields <input type="checkbox" checked={fieldCheck} onChange={() => setFieldCheck(!fieldCheck)}></input></h3>
                            {fieldCheck ? (renderAddedParamsList()): (<div></div>)}
                        </section>
                    </form>
                ): (<div></div>)}

            </ol>
        </section>
    </div>
    )
}

export default UploadCSV;