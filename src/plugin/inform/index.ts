import {
    createDiscreteApi,
    darkTheme,
    lightTheme,
    type ConfigProviderProps
  } from 'naive-ui'

export function registerDiscreteApi(){
  const { message, notification, dialog, loadingBar } = createDiscreteApi(
    ['message', 'dialog', 'notification', 'loadingBar'],
    {
      configProviderProps: {theme:lightTheme}
    }
  )
  window['$message']=message
  window.$notification=notification
  window.$dialog=dialog
  window.$loadingBar=loadingBar
}