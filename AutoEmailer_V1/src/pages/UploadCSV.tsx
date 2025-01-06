import React, {useState} from "react";

const UploadCSV = () => {
    // const fileInputRef = useRef(null);
    const [myFile, setMyFile] = useState<File>();

    // const submitCSV = (event: React.FormEvent) => {
    //     event.preventDefault()
    //     console.log("my file is ", fileInputRef.current)
    //     if(fileInputRef.current)
    //     {   
            
    //         //print uploaded file metadata
    //         console.log("File Uploade MetaData: ",(fileInputRef.current as HTMLInputElement).files![0])
    //         //read and print the file
    //         const file = (fileInputRef.current as HTMLInputElement).files![0]
    //         const reader = new FileReader()
    //         reader.onload = event => console.log((event.target as FileReader).result);
    //         reader.onerror = error => {throw(error)};
    //         reader.readAsText(file)
        
    //         // if((fileInputRef.current as HTMLInputElement).hasAttribute("files"))
    //         // {
    //         //     console.log((fileInputRef.current as HTMLInputElement).files)
    //         // }
    //     }
    // }
    const onFileChange = (event:React.ChangeEvent<HTMLInputElement>)=> {
        console.log('useState method filechange: ', event.target.files![0])
        setMyFile(event.target.files![0]);
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
            </ol>
        </section>
    </div>
    )
}

export default UploadCSV;