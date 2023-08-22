<template>
    <li class="article-card">
        <nuxt-link :to="'/' + slug" v-editable="article" class="article-card__content">
            <img :src="article.image.filename" class="article-card__image" />
            <h3>{{ article.title }}</h3>
            <div>
                {{ article.teaser }}
            </div>
        </nuxt-link>
    </li>
</template>

<script setup>
    defineProps({ article: Object, slug: String })

    const localePath = useLocalePath()
</script>