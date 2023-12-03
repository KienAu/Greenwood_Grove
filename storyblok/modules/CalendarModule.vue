<template>
    <section class="calendar-module" v-editable="blok">
        <div class="container">
            <div class="calendar-module__top">
                <h2 class="calendar-module__title">{{ blok.title }}</h2>
                <div class="calendar-module__seperator">
                    <span></span>
                </div>
            </div>
            <Calendar />
        </div>
    </section>
</template>

<script setup>
    const props = defineProps({ blok: Object });
</script>