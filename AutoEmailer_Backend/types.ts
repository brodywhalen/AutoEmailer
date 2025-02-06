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

