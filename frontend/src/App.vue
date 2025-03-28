<script setup>
const fetchDocker = () => {
  fetch('/docker/users')
    .then(res => res.text())
    .then(data => console.log(data))
}
const fetchlocal = () => {
  fetch('/local/users')
    .then(res => res.text())
    .then(data => console.log(data))
}
</script>

<template>
  <button @click="fetchDocker">fetch in docker</button>
  <button @click="fetchlocal">fetch in local</button>
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
