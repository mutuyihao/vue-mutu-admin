import instance from '@/utils/request'
export interface RegisterParams {
    username: string,
    email: string,
    password: string
}
export interface LoginBody {
    username: string,
    password: string
}

export async function register(params: RegisterParams) {
    return instance.post("auth/local/register", params)
}

export async function login(body: LoginBody) {
    return instance.post("auth/login", body, { headers: { "Authorization": "" } })
}