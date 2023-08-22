<template>
    <div v-editable="blok"
      class="hero">
      <div class="container__fullwidth">
        <img :src="blok.image.filename" :alt="blok.image.alt" />
      </div>
    </div>
  </template>
   
  <script setup>
    const props = defineProps({ blok: Object })
  </script>