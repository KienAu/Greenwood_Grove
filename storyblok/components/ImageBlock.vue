<template>
    <div class="image-wrapper">
        <img :src="blok.image.filename" />
    </div>
</template>

<script setup>
    const props = defineProps({ blok: Object })
</script>