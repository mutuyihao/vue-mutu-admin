import type { GlobalThemeOverrides } from 'naive-ui'

const deepBlueColor = '#5d80b7'
const lightBlueColor = '#5d90b7'
const lightGrey = '#e0e0e6'
const blueBorder = `1px solid ${deepBlueColor}`
const lightGreyBorder = `1px solid ${lightGrey}`
const themeOverrides: GlobalThemeOverrides = {
  // common: {
  //     primaryColorHover: "#5d80b7",
  // },
  Checkbox: {
    colorChecked: deepBlueColor,
    borderChecked: blueBorder,
    borderFocus: blueBorder,
    boxShadowFocus: "0 0 0 2px rgba(93,128,183,.2)"
  },
  Radio: {
    boxShadowActive: `inset 0 0 0 1px ${deepBlueColor}`,
    boxShadowFocus: `inset 0 0 0 1px ${deepBlueColor}`,
    boxShadowHover: `inset 0 0 0 1px ${deepBlueColor}`,
    dotColorActive: deepBlueColor,
  },
  Button: {
    // textColorGhost:"",
    textColorGhostHover: deepBlueColor,
    textColorGhostPressed: deepBlueColor,
    textColorHover: deepBlueColor,
    textColorFocus: deepBlueColor,
    borderHover: blueBorder,
    borderFocus: blueBorder,
    borderInfo: lightGreyBorder,
    borderHoverInfo: blueBorder,
    rippleColor: deepBlueColor,
    colorPrimary: deepBlueColor,
    borderPrimary: blueBorder,
    colorHoverPrimary: lightBlueColor,
    colorFocusPrimary: lightBlueColor,
    colorPressedPrimary: lightBlueColor,
    borderHoverPrimary: blueBorder,
    borderFocusPrimary: blueBorder,
    borderPressedPrimary: blueBorder,
    rippleColorPrimary: deepBlueColor,
  },
  Tabs: {
    tabTextColorActiveLine: deepBlueColor,
    tabTextColorHoverLine: deepBlueColor,
    barColor: deepBlueColor
  },
  Input: {
    caretColor: deepBlueColor,
    borderHover: blueBorder,
    borderFocus: blueBorder,
    boxShadowFocus: '0 0 0 2px rgba(93,128,183,.2)'
  },
  Menu: {
    itemColorHover: 'rgba(0,0,0,0)',
    itemColorActive: '#5a5f59',
    itemColorActiveHover: '#5a5f59',
    itemColorActiveCollapsed: '#5a5f59',
    itemIconColor: '#e2dfdb',
    itemIconColorHover: 'white',
    itemIconColorActive: 'white',
    itemIconColorActiveHover: 'white',
    itemIconColorChildActive: 'white',
    itemIconColorChildActiveHover: 'white',
    itemIconColorCollapsed: '#e2dfdb',
    itemTextColor: '#e2dfdb',
    itemTextColorHover: 'white',
    itemTextColorActive: 'white',
    itemTextColorActiveHover: 'white',
    itemTextColorChildActive: 'white',
    itemTextColorChildActiveHover: 'white',
    itemColorHoverInverted: 'rgb(0,0,0)',
    itemColorActiveHoverInverted: 'rgb(255,255,255)',
    itemTextColorHoverInverted: 'rgb(255,255,255)',
    arrowColor: '#e2dfdb',
    arrowColorHover: 'white',
    arrowColorActive: 'white',
    arrowColorActiveHover: 'white',
    arrowColorChildActive: 'white',
    arrowColorChildActiveHover: 'white',
    fontSize: '12'
  },
  Dialog: {
    iconColor: deepBlueColor,

    // color
  }
}
export { themeOverrides }
