import React, {useState,useEffect} from "react";
import Papa, { ParseResult } from 'papaparse';

const UploadCSV = () => {

    
    // const fileInputRef = useRef(null);
    const [myFile, setMyFile] = useState<File>();
    const [parsedFile, setParsedFile] = useState<ParseResult<unknown>>();
    
    useEffect (()=> console.log('data: ',parsedFile?.data, 'header name: ',parsedFile?.meta), [parsedFile]) 

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
                const parsed = Papa.parse(myString, {header: true})
                //saves to state
                setParsedFile(parsed)
            }
            fileIntoString(myFile, localParse)
        } else {
            setParsedFile(undefined);
        }
    }
// const selectOptions = () => {
//     return(
        
//     )
// }



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
                        <h3 className="select-row"> First Name <select></select></h3>
                        <h3 className="select-row"> Last Name <select></select></h3>
                        <h3 className="select-row"> Email Address <select></select></h3>
                        <h3 className="select-row"> LinkedIn URL<select></select></h3>
                    </form>
                ): (<div></div>)}

            </ol>
        </section>
    </div>
    )
}

export default UploadCSV;