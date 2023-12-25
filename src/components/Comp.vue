<script setup lang="ts">
import { onMounted, reactive, ref, watchEffect } from 'vue';
import $axios from '@/axios'
interface WeatherEntry {
    date: string,
    summary: string,
    temperatureC: string
}
let loading = ref(true)
let weatherEntries = reactive([] as WeatherEntry[])

onMounted(async () => {
    try {
        const response = await $axios.get<WeatherEntry[]>('/weatherforecast')
        weatherEntries = response.data
        loading.value = false
        console.log(weatherEntries)
    }
    catch {

    }
})
</script>

<template>
    <h1>Weather forecast</h1>
    <p v-if="loading">Loading</p>
    <ul v-else>
        <li v-for="entry in weatherEntries">
            {{ entry.date }}: {{ entry.temperatureC }} C, {{ entry.summary }}
        </li>
    </ul>
</template>
