<template>
  <div class="clock-container">
    <single-number></single-number>
  </div>
</template>
<script lang="ts" setup>
import singleNumber from './single-number.vue'
</script>

<style scoped>
.clock-container {
  height: 100px;
  display: flex;
  width: 100px;
}
</style>