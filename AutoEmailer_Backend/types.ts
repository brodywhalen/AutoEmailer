export interface NewList {
    listName: string
    contacts: Contact[]
}
export interface Contact {
    name: Name
    email: string
    addedParams: AddedParamList[]
    userId: string
}
export interface Name {
    first: string,
    last: string
}
export interface AddedParamList {
    param: string,
    value: string
}