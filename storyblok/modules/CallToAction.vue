<template>
    <section class="call-to-action" v-editable="blok">
        <div class="container">
            <div class="call-to-action__inner">
                <h1 class="call-to-action__text">{{ blok.text }}</h1>
                <video autoplay muted loop  class="call-to-action__video">
                    <source :src="blok.background_image.filename" type="video/mp4">
                </video>
            </div>

        </div>
    </section>
</template>

<script setup>
    const props = defineProps({ blok: Object })
</script>