<template>
    <li class="ressource">
        <div class="ressource__inner">
            <div class="ressource__thumbnail-wrapper">
                <img class="ressource__thumbnail" :src="image.filename" :alt="image.alt" />
            </div>
            <h5 class="ressource__title">{{ title }}</h5>
            <button @click="openModal(title, text, image, pdfDownload, link, linkText)" class="ressource__button">{{ $t('Read more') }}</button>
        </div>
    </li>
</template>

<script setup>
    const props = defineProps([
        'title',
        'text',
        'image',
        'pdfDownload',
        'link',
        'linkText'
    ]);

    const emit = defineEmits(['openModal']);

    const openModal = (title, text, image, pdfDownload, link, linkText) => {
        emit('openModal', {title, text, image, pdfDownload, link, linkText});
    }
        
</script>