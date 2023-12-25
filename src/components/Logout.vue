<script setup lang="ts">
import { useSessionStore } from '@/stores/session'
const sessionStore = useSessionStore()
sessionStore.logout()
</script>

<template></template>