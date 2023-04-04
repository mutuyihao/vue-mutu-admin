import {
    createDiscreteApi,
    darkTheme,
    lightTheme,
    type ConfigProviderProps,
  } from 'naive-ui'

export function registerDiscreteApi(){
  const { message, notification, dialog, loadingBar } = createDiscreteApi(
    ['message', 'dialog', 'notification', 'loadingBar'],
    {
      configProviderProps: {theme:lightTheme},
      messageProviderProps:{themeOverrides:{iconColorLoading:"#5d80b7",iconColorSuccess:"#5d80b7"}}
    }
  )
  window['$message']=message
  window.$notification=notification
  window.$dialog=dialog
  window.$loadingBar=loadingBar
}