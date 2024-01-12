<template>
    <div class="tile">
        <div class="tile__icon-wrapper">
            <img :src="icon.filename" :alt="icon.alt"/>
            <div class="tile__hidden-bg"></div>
        </div>
        <div class="tile__seperator">
            <span></span>
        </div>
        <p class="tile__description">
            {{ description }}
        </p>
    </div>
</template>

<script setup>
    const props = defineProps([
        'icon',
        'description'
    ]);

</script>