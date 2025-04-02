<template>
  <div class="container">
    <div class="number cur-up">3</div>
    <div class="number cur-down">3</div>
    <div class="number next-up">4</div>
    <div class="number next-down">23</div>
  </div>

</template>
<style scoped>
.container {
  width: 100px;
  height: 100px;
  position: relative;
}

.number {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;

}

.cur-up {

  background-color: aqua;
}

.cur-down {
  background-color: blanchedalmond;
}

.next-up {
  background-color: aqua;
}

.next-down {
  background-color: blanchedalmond;
}
</style>