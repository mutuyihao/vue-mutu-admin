import axios from 'axios'

let instance = axios.create({
    baseURL:import.meta.env.VITE_API_BASE_URL,
    headers:{
        "Content-Type":'application/json'
    }
})
function onSuccessRequest(config:any){
    return config
}
instance.interceptors.request.use(onSuccessRequest,)
export default instance