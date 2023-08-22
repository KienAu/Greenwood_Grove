<template>
    <div class="wysiwig" v-html="textContent">
    </div>
</template>

<script setup>
    const props = defineProps({ blok: Object })

    const textContent = computed(() => renderRichText(props.blok.content))
    
</script>