<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useSessionStore } from '@/stores/session';

onMounted(async () => {
    const sessionStore = useSessionStore()
    const route = useRoute()
    await sessionStore.loginCallback(route.query.code as string)
})
</script>
<template></template>