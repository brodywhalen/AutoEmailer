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