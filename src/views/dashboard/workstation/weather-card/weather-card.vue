<template>
    <div v-if="!loading" style="padding: 20px;">
        <n-skeleton text :repeat="2" :size="'large'" />
        <n-skeleton text style="width: 100%" />
        <n-skeleton text style="width: 60%" />
        <n-skeleton text style="width: 80%" />
        <n-skeleton text style="width: 60%" />
        <n-skeleton text style="width: 60%" />
        <n-skeleton text style="width: 80%" />
        <n-skeleton text style="width: 60%" />
        <n-skeleton text style="width: 60%" />
        <n-skeleton text style="width: 80%" />
        <n-skeleton text style="width: 60%" />
        <n-skeleton text style="width: 60%" />
        <n-skeleton text style="width: 100%" />
    </div>
    <div v-else :class="['weather-card-main', { sunny: weather.text == '晴', rainy: weather.text.indexOf('雨') > -1 }]">
        <div class="special-card-main" :style="{ backgroundImage: 'url(' + bgUrl + ')', }">
            <div class="flex-between" style="height: 34px">
                <div class="flex-center">
                    <h2 style="font-weight: normal">{{ location.city }}</h2>
                    <div class="vise-text small-vise-text" style="margin-left: 1rem">
                        {{ location.province }}/中国
                    </div>
                </div>
                <div class="vise-text small-vise-text">
                    {{ formatTime(weather.updateTime, 'YYYY-MM-DD HH:mm') }}
                </div>
            </div>
            <div class="air-main flex">
                <div class="air" :style="{ backgroundColor: airColor }">
                    AQI {{ air.category }}
                </div>
            </div>
            <div>
                <div class="flex-center">
                    <div>
                        <img v-if="loading" width="88"
                            :src="`https://a.hecdn.net/img/common/icon/202106d/${weather.icon}.png`" alt="weather-icon" />
                    </div>
                    <div>
                        <div class="temp-text">{{ weather.temp }}°</div>
                        <div style="font-weight: 500; line-height: 16px">
                            {{ weather.text }}
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div class="flex-center" style="flex:1;margin:20px 0px;font-size:15px;font-weight:5 00">
                    {{ weather.abstract }}
                </div>
            </div>
            <div style="flex:1;height:auto"></div>
            <div>
                <div class="flex-between bottom-bg">
                    <div>
                        <div class="strongth">{{ weather.windScale }}级</div>
                        <div class="vise-text">{{ weather.windDir }}</div>
                    </div>
                    <div>
                        <div class="strongth">{{ weather.humidity }}%</div>
                        <div class="vise-text">相对湿度</div>
                    </div>
                    <div>
                        <div class="strongth">{{ air.pm2p5 }}</div>
                        <div class="vise-text">pm2.5</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import AMapLoader from '@amap/amap-jsapi-loader'
import type { Location } from '../type'
import { ref } from 'vue'
import * as http from '@/api'
import { formatTime } from '@/utils'
import { computed } from 'vue'
import rainy from '@/assets/img/rainy--day.png'
import cloudy from '@/assets/img/cloudy--day.png'

let props = defineProps<{ isMobile: boolean }>()
let loading = ref(false)
let location = ref<Location>({
    abcode: '',
    bounds: {},
    city: '',
    gEa: '',
    info: '',
    province: ''
})
window._AMapSecurityConfig = {
    securityJsCode: '7d2787e3c3942f49652b8d5c36cd7f8d'
}
AMapLoader.load({
    key: '05859dfe54f49c1db54c5ae105ea9ea8',
    version: '',
    plugins: ['AMap.CitySearch']
}).then((Amap) => {
    let citySearch = new Amap.CitySearch()
    citySearch.getLocalCity(async (status: string, result: any) => {
        location.value = result
        let data = (await http.getWeather(location.value.city)).data
        weather.value = data.weather
        air.value = data.air
        loading.value = true
    })
})
let weather = ref<any>({

    humidity: '',
    icon: '',
    temp: '',
    text: '',
    windDir: '',
    windScale: ''

})
let air = ref<any>({

    category: '',
    icon: '101'

})
let airColor = computed(() => {
    switch (air.value.category) {
        case '优':
            return '#95b359'
        default:
            return '#95b359'
    }
})
let bgUrl = computed(() => {
    if (weather.value.text.indexOf('雨') > 0) {
        return rainy
    } else if (weather.value.text == '多云') {
        return cloudy
    }
})
</script>

<style scoped>
.weather-card-main {
    background: linear-gradient(225deg, #D0DAE8, #CCD4DF 55%, #A5B3C5);
    border-radius: 16px;
    height: 320px;
    padding: 20px;
}

.special-card-main {
    background-size: 100% auto;
    background-repeat: no-repeat;
    background-position: right top;
    display: flex;
    flex-direction: column;
    height: 100%;
}

.sunny {
    background: linear-gradient(45deg, #dde4fc 40%, #fde5cd);
}

.rainy {
    background: linear-gradient(225deg, #D0DAE8, #CCD4DF 55%, #A5B3C5);
}

.air-main {
    justify-content: end;
    color: white;
}

.air {
    border-radius: 15px;
    padding: 2px 15px;
}

.vise-text {
    color: rgba(0, 0, 0, 0.5);
}

.small-vise-text {
    font-size: 12px;
    font-weight: 300;
}

.strongth {
    font-size: 16px;
    font-weight: 500;
}

.temp-text {
    font-weight: 400;
    font-size: 40px;
    line-height: 1;
    color: black;
}

.bottom-bg {
    padding: 10px 20px;
    background-color: rgba(0, 0, 0, 0.03);
    border-radius: 10px;
}

@media screen and (max-width:800px) {

    .weather-card-main {
        height: auto;
    }

}
</style>
