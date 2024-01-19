<template>
    <div class="image-block" :class="'bg-' + block.backgroundColor">
        <div class="container">
            <h2> {{ block.title }} </h2>
            <div class="image-block__separator">
                <span></span>
            </div>
            <img :src="block.image.filename" :alt="block.image.alt" />
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({ blok: Object })
    const block = props.blok
</script>