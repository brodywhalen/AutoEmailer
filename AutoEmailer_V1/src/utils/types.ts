export interface AddedParam{
    param: string,
    value: string
}
export interface ParsedResults{

    data: parsedDataObject[]
    errors: string[]
    meta: metaObject


}

export interface parsedDataObject{
    [key:string]: string
}
export interface metaObject{
    aborted: boolean
    cursor: number
    delimiter: string
    fields: string[]
    linebreak: string
    truncated: boolean
}
export interface NewList {
    listName: string
    contacts: Contact[]
}
export interface Contact {
    name: {first: string, last: string}
    email: string
    linkedIn: string
    addedParams: AddedParamList[]
}
export interface Name {
    first: string,
    last: string
}
export interface AddedParamList {
    param: string,
    value: string
}
export interface ListSchema {
    listName: string
    contacts: Contact[]
    user: string  
}
