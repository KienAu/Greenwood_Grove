<template>
  <section class="article" v-editable="blok">
    <img
      v-if="blok.image?.filename"
      :src="blok.image.filename + '/m/1600x0'"
      :alt="blok.image.alt"
      class="article__image"
    />
    <div class="container">
      <h1 class="">{{ blok.title }}</h1>
      <h2 class="">
        {{ blok.subtitle }}
      </h2>
      <div v-html="resolvedRichText"></div>
    </div>
  </section>
  </template>
   
  <script setup>
  const props = defineProps({ blok: Object })

  const resolvedRichText = computed(() => renderRichText(props.blok.content))
  </script>