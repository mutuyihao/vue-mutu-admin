import instance from '@/utils/request'
export interface PaginationOffsetParams {
  populate?: any,
  start: number
  limit: number
}
export async function getData(url: string) {
  try {
    const res = await instance.get(url)
    return res
  } catch (error) {
    return error
  }
}
export * from './staff'
export * from './role'
export * from './account'
export * from './website'


