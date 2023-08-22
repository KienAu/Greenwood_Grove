<template>
    <section class="calendar-module" v-editable="blok">
        <div class="container">
            <div class="calendar-module__top">
                <h2>{{ blok.title }}</h2>
            </div>
            <Calendar />
        </div>
    </section>
</template>

<script setup>
    const props = defineProps({ blok: Object });

    
</script>