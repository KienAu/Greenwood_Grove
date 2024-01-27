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

    useSeoMeta({
      title: 'Greenwood Grove',
      ogTitle: 'Greenwood Grove',
      description: 'Workshops at the Greenwood Grove are based on the idea of community-driven learning. They are led by a diverse range of community members, including Coveners, Maidens and High Priestesses, who come together to share their knowledge on a weekly basis. Many are professionals in specialized fields such as veterinary technology, mental health, medical health, landscaping, accounting, art, herbology, early-childhood development, teaching and other professional domains.',
      ogDescription: 'Workshops at the Greenwood Grove are based on the idea of community-driven learning. They are led by a diverse range of community members, including Coveners, Maidens and High Priestesses, who come together to share their knowledge on a weekly basis. Many are professionals in specialized fields such as veterinary technology, mental health, medical health, landscaping, accounting, art, herbology, early-childhood development, teaching and other professional domains.',
    })
  </script>