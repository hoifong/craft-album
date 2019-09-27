export interface responseData<T = any> {
    success: 1|0
    data: T
    msg: string
}

export interface Photo {
    _id?: string,
    originUrl?: string,
    createddAt?: string,
    username?: string,
    text?: string
}

export interface User {
    username?: string,
    password?: string,
    createdAt?: string 
}