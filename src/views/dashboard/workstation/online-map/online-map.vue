<template>
  <div id="container" class="rounded-lg"></div>
</template>

<script setup lang="ts">
import { useAccountStore } from '@/stores'
import AMapLoader from '@amap/amap-jsapi-loader'
import { onMounted, onUnmounted } from 'vue'
import type { Location } from '../type'
window._AMapSecurityConfig = {
  securityJsCode: '7d2787e3c3942f49652b8d5c36cd7f8d'
}
//@ts-ignore
let map = null

const setLocation = useAccountStore().setLocation

onMounted(() => {
  AMapLoader.load({
    key: '05859dfe54f49c1db54c5ae105ea9ea8',
    version: '2.0',
    plugins: ['AMap.CitySearch'],
    Loca: {
      version: '2.0.0'
    }
  })
    .then((AMap) => {
      // 初始化地图
      map = new AMap.Map('container', {
        viewMode: '2D',
        mapStyle: 'amap://styles/grey'
      })
      // 获取定位
      const citySearch = new AMap.CitySearch()
      citySearch.getLocalCity(
        async (status: string, result: Location) => {
          setLocation(result)
          // 获取边界经纬度，计算中心点
          const location = result.rectangle
            .split(';')
            .map((item) => {
              return item.split(',').map(Number)
            })
          const longitude =
            (location[0][0] + location[1][0]) / 2
          const latitude =
            (location[0][1] + location[1][1]) / 2
          // 添加点
          const pulseDiv = document.createElement('div')
          pulseDiv.className = 'pulse-marker'

          const marker = new AMap.Marker({
            position: new AMap.LngLat(longitude, latitude),
            content: pulseDiv
          })
          //@ts-ignore
          map?.add(marker)
        }
      )
    })
    .catch((e) => {
      console.log(e)
    })
})
onUnmounted(() => {
  //@ts-ignore
  map.destroy()
})
</script>
<style>
.pulse-marker {
  width: 20px;
  height: 20px;
  background: rgba(0, 153, 255, 0.5);
  border-radius: 50%;
  position: absolute;
  animation: pulse 2s infinite;
  box-shadow: 0 0 6px rgba(0, 153, 255, 0.8);
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.6);
    opacity: 0.2;
  }
  100% {
    transform: scale(1);
    opacity: 0.7;
  }
}
</style>
<style scoped>
#container {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
