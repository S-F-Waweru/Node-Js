export interface User {
    Id: string,
    Name : string,
    Password:string,
    isDeleted : number,
    isEmailSent : number, 
}

export interface Payload {
    Sub :string,
    Name : string
}