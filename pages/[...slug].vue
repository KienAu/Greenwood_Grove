<template>
  <StoryblokComponent v-if="story" :blok="story.content" :slug="slug"/>
</template>

<script setup>
    let { slug } = useRoute().params
    
    const { locale } = useI18n()
    
    const url = slug && slug.length > 0 ? slug.join('/') : 'home'

    const story = await useAsyncStoryblok(url.replace(/\/$/, ''),
      {
        version: 'draft',
        language: locale.value,
      }
    )
</script>