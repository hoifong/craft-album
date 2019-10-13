export interface responseData<T = any> {
    success: 1|0
    data: T
    msg: string
}

export interface Photo {
    uploaded: boolean,
    username: string,
    createddAt: string,
    photoId: string,
    text: string
}

export interface User {
    username?: string,
    password?: string,
    createdAt?: string 
}

export interface returnForAddPhoto {
    token: string
    id: string
}

export interface payloadForDeletePhoto {
    photoId: string
}

export interface returnForLogin {
    username: string,
    createdAt: string,
    photos: Photo[]
}