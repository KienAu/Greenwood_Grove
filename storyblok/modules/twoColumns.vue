<template>
    <div class="two-columns-block" :class="'bg-' + block.backgroundColor">
        <div class="container">
            <h2 class="two-columns-block__title">{{ block.title }}</h2>
            <div class="two-columns-block__separator">
                <span></span>
            </div>
            <div class="two-columns-block__content">
                <div class="two-columns-block__col">
                    <div v-for="item in block.columnOne" :key="item._uid">
                        <div v-if="item.component == 'textBlock'">
                            <div class="wysiwyg" v-html="renderRichText(item.text)">

                            </div>
                        </div>
                        <div v-if="item.component == 'imageBlock'">
                            <img :src="item.image.filename" :alt="item.image.alt">
                        </div>
                    </div>
                </div>
                <div class="two-columns-block__col">
                    <div v-for="item in block.columnTwo" :key="item._uid">
                        <div v-if="item.component == 'textBlock'">
                            <div class="wysiwyg" v-html="renderRichText(item.text)">

                            </div>
                        </div>

                        <div v-if="item.component == 'imageBlock'">
                            <img :src="item.image.filename" :alt="item.image.alt">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({ blok: Object });

    const block = props.blok

</script>