<template>
    <div :class="page + '-page'" v-editable="blok">
      <StoryblokComponent v-for="blok in blok.hero" :key="blok._uid" :blok="blok" />
      <StoryblokComponent v-for="blok in blok.body" :key="blok._uid" :blok="blok" />
    </div>
  </template>
   
  <script setup>
    defineProps({ blok: Object })
    let page = useRoute().fullPath.replace('/', '').toLowerCase()

    if (page === '') {
      page = 'home'
    }
  </script>