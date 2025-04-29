import instance from '@/utils/request'

export async function getWeather(cityName: string) {
  return instance.get(`/website/weather/${cityName}`)
}
export async function updateViews() {
  return instance.put(`/website/views/`)
}
export async function getViews(days: number) {
  return instance.get(`/website/views/${days}`)
}
export async function getMonthViews(months: number) {
  return instance.get(`/website/monthViews/${months}`)
}
