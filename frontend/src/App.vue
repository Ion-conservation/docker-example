<template>
  <DateTimeDisplay></DateTimeDisplay>
  <nav>
    <RouterLink to="/login">Go to Ho1ffssm1ee</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>
<script setup lang="ts">
import { useUserStore } from '@store/userStore.ts'
import { storeToRefs } from 'pinia'
import DateTimeDisplay from '@components/DateTimeDisplay/index.vue'

const userStore = useUserStore()
const { isLoggedIn } = storeToRefs(userStore)
</script>
