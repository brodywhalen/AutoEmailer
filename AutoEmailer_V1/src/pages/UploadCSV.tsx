import React, {useState,useEffect, ReactNode} from "react";
import Papa, { ParseResult } from 'papaparse';
import { AddedParam } from "../utils/types";
import axios from "axios";

const UploadCSV = () => {


    
    // const fileInputRef = useRef(null);
    const [myFile, setMyFile] = useState<File>();
    const [parsedFile, setParsedFile] = useState<ParseResult<string[]>>();
    const [fieldCheck, setFieldCheck] = useState<boolean>(false);
    const [addedParams, setAddedParams] =useState<AddedParam[]>([{param: 'test', value: "testy"}]) // test value at first
    const [selectValue, setSelectValue] = useState<number[]>([0,0,0,0]);
   
    // have column values stored, now just need to send to backend properly.

    
    useEffect (()=> 
        
        // console.log('data: ',parsedFile, 'header name: ',parsedFile?.meta), [parsedFile]
        console.log('selected: ', selectValue),[selectValue]   
        // console.log('paramvalues: ', addedParams[0].param), [addedParams]
    ) 

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
    
    // render options as headers pulled from file, save value as index of meta fields.
    const options = parsedFile?.meta.fields?.map((header, index) => <option value={index + 1}>{header}</option>)
    return(<><option value={0}> no column </option>{options}</>) // 0 value is set as no data assigned.
}
const renderAddedParamsList = () =>{

    
    // map all added params state to a list. Contains input for param name and dropbox to assign column. X button deletes param and + addes another param.
    const myitems = addedParams?.map((_param, index) =>{
    
        console.log("index: ", index)
        return(
        <div>
        <label> Field Name </label><input value={addedParams[index].param} onChange={(event) => changeParamTitle(index,event)}/> <select onChange={(event) => changeParamValue(index, event)}>{renderOptions()}</select>
        {((index === 0) && (addedParams.length === 1)) 
            ? (<><button onClick={(event) => addParam(event,index)}> ➕ </button></>) 
            : <><button onClick={(event) => addParam(event,index)}> ➕ </button><button onClick={(event) => removeParam(event,index)}> ➖ </button></>
        }
        
        
        </div>
        )
    }
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
    clonedArray[index].param = event.target.value;
    setAddedParams(clonedArray)
}
const changeMainColumn = (event : React.ChangeEvent<HTMLSelectElement>) => {
    
    
    console.log('this :',event.target.value)
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
const PostList =  async (event: { preventDefault: () => void; }) => {

    // need a way to store current state column ID
    // could set email --> Linkedin to 1-4, and then start custom fields from 5. 0 is no column assigned


    event.preventDefault();
    const ListObject = {
        listName: `test ${Math.random()}`,
        contacts: parsedFile?.data.map( column => {
            
            if(fieldCheck){
                return(
                    // this will return the added params
                    addedParams
                );
            }
            return(
                {
                
                }
            )
        })
        // find out how to parse file into backend document

    }
    // await axios.post('/createList', listObject)
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
                    <form className="menu-list-select" onSubmit={PostList}>
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
                        <button type="submit"> Create List </button>
                    </form>
                ): (<div></div>)}

            </ol>
        </section>
    </div>
    )
}

export default UploadCSV;