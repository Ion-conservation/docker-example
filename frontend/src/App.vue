<script setup>
const fetchData = () => {
  fetch('/backend/users')
    .then(res => res.json())
    .then(data => console.log(data))
}
</script>

<template>
  <button @click="fetchData">fetch</button>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
