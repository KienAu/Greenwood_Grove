<template>
    <section class="two-columns" v-editable="blok">
        <div class="container two-columns__content">
            <div class="two-columns__col">
                <StoryblokComponent v-for="blok in blok.first_column" :key="blok._uid" :blok="blok" />
            </div>
            <div class="two-columns__col">
                <StoryblokComponent v-for="blok in blok.second_column" :key="blok._uid" :blok="blok" />
            </div>
        </div>
    </section>
</template>

<script setup>
    const props = defineProps({ blok: Object })
</script>