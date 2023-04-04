import instance from '@/utils/request'

export interface RegisterParams{
    username:string,
    email:string,
    password:string
}
export interface LoginParams{
    identifier:string,
    password:string
}

export async function register(params:RegisterParams) {
    return instance.post("auth/local/register",params)
}

export async function login(params:LoginParams) {
    return instance.post("auth/local",params)
}