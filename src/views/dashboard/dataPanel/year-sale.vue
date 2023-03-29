<template>
    <card :title="'销售额'" :period="'年'" :value="value"></card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import card from '@/components/card/card.vue'

let value = computed(() => {
    return Math.random() * 10000 + 480000
})
</script>

<style scoped></style>