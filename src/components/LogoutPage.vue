<script setup lang="ts">
import { logout } from '@/oauth2'
import { onMounted } from 'vue'

onMounted(async () => {
  await logout(false)
})
</script>

<template><div></div></template>
