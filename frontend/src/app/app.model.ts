export interface User{
    id ?: string|number;
    fname : string;
    lname : string;
    email : string;
    mobile : string;
    password : string;
}

export interface Response{
    status : string;
    data : User[]
}