<template>
    <div class="c-loader" />
</template>

<style>
@keyframes is-rotating {
  to {
    transform: rotate(1turn);
  }
}

.c-loader {
  animation: is-rotating 1s infinite;
  width: 30px;
  height: 30px;
  margin: 5%;
  border: 6px solid #888888;
  border-radius: 50%;
  border-top-color: #51d4db;
  border-bottom-color: #e79185;
  display: inline-block;
}
</style>