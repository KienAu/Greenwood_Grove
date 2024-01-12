<template>
    <div class="modal-ressource" id="modal">
        <div class="modal-ressource__overlay"></div>
        <div class="modal-ressource__container">
            <div class="modal-ressource__image-wrapper" v-if="image">
                <img class="modal-ressource__image" :src="image.filename" :alt="image.alt">
            </div>
            <div class="modal-ressource__content">
                <button @click="close()" class="modal-ressource__close-btn">
                    x
                </button>
                <h3 class="modal-ressource__title">{{ title }}</h3>
                <div class="modal-ressource__separator"></div>
                <div v-if="text" class="modal-ressource__text-container">
                    <div class="modal-ressource__text" v-html="text">
                    </div>
                </div>
                <div class="modal-ressource__button-container">
                    <nuxt-link class="button" v-if="pdfDownload == null || pdfDownload.length > 0" :to="pdfDownload">
                        {{ $t('Download PDF Guide') }}
                    </nuxt-link>
                    <nuxt-link class="button" v-if="link && linkText" :to="link">
                        {{ linkText }}
                    </nuxt-link> 
                </div>
            </div>
        </div>
    </div>
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

    const close = () => {
        const modal = document.querySelector('#modal');

        modal.classList.remove('is-open');
    }
</script>