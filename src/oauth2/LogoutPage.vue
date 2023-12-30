<script setup lang="ts">
import { logout } from './session'
import { onMounted } from 'vue'

onMounted(async () => {
  await logout(false)
})
</script>

<template><div></div></template>
