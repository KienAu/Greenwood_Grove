<template>
    <div class="title-block" :class="'bg-' + block.backgroundColor">
        <div class="container">
            <h2>{{ block.title }}</h2>
            <div class="title-block__separator">
                <span></span>
            </div>
            <span>{{ block.subtitle }}</span>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({ blok: Object });

    const block = props.blok;
</script>