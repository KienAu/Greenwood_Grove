<template>
    <section class="articles" v-editable="blok">
        <div class="container">
            <div class="articles__top">
                <h2>{{ blok.title }}</h2>
                <input class="articles__search" type="text" name="search" placeholder="Search articles..." v-model="searchArticles" />
            </div>
            <div class="articles__content">
                <ul class="articles__list">
                    <ArticleCard 
                        v-for="article in filterArticles"
                        :article="article.content"
                        :key="article._uid"
                        :slug="article.full_slug"
                    />
                </ul>
            </div>
        </div>
    </section>
</template>

<script setup>
    defineProps({ blok: Object })
    const showAllArticles = ref(null)
    let listArticles = []
    const searchArticles = ref('')
    const storyblokApi = useStoryblokApi()
    const { data } = await storyblokApi.get('cdn/stories', {
        version: 'draft',
        starts_with: 'articles',
        is_startpage: false,
    })

    showAllArticles.value = data.stories

    for (let i = 0; i < showAllArticles.value.length; i++) {
        listArticles.push(showAllArticles.value[i])
    }

    const filterArticles = computed(() => {
        let filter = searchArticles.value
        if (!filter.length) {
            return listArticles
        }
        return listArticles.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()))
    })


    
</script>