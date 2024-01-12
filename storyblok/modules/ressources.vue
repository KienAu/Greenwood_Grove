<template>
    <section v-editable="blok" class="ressources-module">
        <div class="container">
            <div class="ressources-module__top">
                <h2>{{ blok.title }}</h2>
                <div class="ressources-module__seperator">
                    <span></span>
                </div>
            </div>

            <ul class="ressources-module__list">
                <ressource 
                    v-for="content in loadRessource" 
                    :key="content.content._uid"
                    :title="content.content.title"
                    :text="renderRichText(content.content.text)"
                    :pdfDownload="content.content.pdfDownload"
                    :image="content.content.image"
                    :link="content.content.link"
                    :linkText="content.content.linkText"
                    @open-modal="openModal"
                />
            </ul>
            <ModalRessource
                :title="selectedTitle"
                :text="selectedText"
                :pdfDownload="selectedPdfDownload"
                :image="selectedImage"
                :link="selectedLink"
                :linkText="selectedLinkText"
            />
            <div class="ressource__btn-load-more--container" v-if="limit < currentAmount">
                <button class="ressource__btn-load-more" @click="loadMore()">
                    {{ $t('Load more Ressources')  }}
                </button>
            </div>
        </div>
    </section>
</template>

<script setup>
    import ModalRessource from '../../components/modal-ressource.vue'

    const props = defineProps({ blok: Object })
    const storyblokApi = useStoryblokApi()
    const { data } = await storyblokApi.get('cdn/stories', {
        version: 'draft',
        starts_with: 'ressource',
        is_startpage: false,
    })

    const stories = data.stories
    let selectedTitle = ref(null)
    let selectedText = ref(null)
    let selectedPdfDownload = ref(null)
    let selectedImage = ref(null)
    let selectedLink = ref(null)
    let selectedLinkText = ref(null)
    let limit = ref(2)
    const currentAmount = stories.length

    const openModal = (selected) => {
        selectedTitle.value = selected.title
        selectedText.value = selected.text
        selectedPdfDownload.value = selected.pdfDownload
        selectedImage.value = selected.image
        selectedLink.value = selected.link
        selectedLinkText.value = selected.linkText

        const modal = document.querySelector('#modal')

        modal.classList.add('is-open')
    }

    const loadMore = () => {
        if (limit.value > currentAmount) return
        limit.value = limit.value + 2
    }

    const loadRessource = computed(() => {
        return stories.slice(0, limit.value)
    })

</script>