<template>
  <section class="featured-articles" v-editable="blok">
    <div class="container">
      <h2>{{ blok.headline }}</h2>
      <ul
      class="featured-articles__list"
      v-if="blok.articles.length > 0"
      >
        <ArticleCard 
          v-for="feature in blok.articles"
          :article="feature.content"
          :key="feature._uid"
          :slug="feature.full_slug"
        />
      </ul>
    </div>
  </section>


</template>
   
<script setup>
  defineProps({ blok: Object })
</script>