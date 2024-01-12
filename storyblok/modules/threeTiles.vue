<template>
    <section v-editable="blok" class="three-tiles">
        <div class="three-tiles__illusion-bg"></div>
        <div class="three-tiles__inner container">
            <tile v-for="tile in blok.tiles"
                :icon="tile.icon" 
                :description="tile.description" 
            /> 
        </div>
    </section>
</template>

<script setup>
    const props = defineProps({ blok: Object });

    onMounted(() => {
        const bg = document.querySelector('.three-tiles__illusion-bg');

        bg.style.background = props.blok.topBackgroundColor;
    })
</script>