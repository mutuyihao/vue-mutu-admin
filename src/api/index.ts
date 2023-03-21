import instance from '@/utils/request'

export async function getData(url: string) {
    try {
        const res = await instance.get(url)
        return res
    } catch (error) {
        return error
    }
}
