// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [['@storyblok/nuxt', {
        accessToken: process.env.STORYBLOK_API_TOKEN,
        apiOptions: { "region": "us" },
    }], 
    '@nuxtjs/i18n',
    '@nuxtjs/google-fonts'
    ],
    app: {
        head: {
            charset: 'utf-16',
            viewport: 'initial-scale=1', 
            title: 'Greenwood Grove',
            meta: [
                { name: 'description', content: 'Workshops at the Greenwood Grove are based on the idea of community-driven learning. They are led by a diverse range of community members, including Coveners, Maidens and High Priestesses, who come together to share their knowledge on a weekly basis. Many are professionals in specialized fields such as veterinary technology, mental health, medical health, landscaping, accounting, art, herbology, early-childhood development, teaching and other professional domains.' }
            ],
        },
    },
    css: ["@/styles/styles.scss"],
    i18n: {
        strategy: 'prefix_except_default',
        locales: [{
            code: 'en',
            file: 'en.json'
        },
        {
            code: 'fr',
            file: 'fr.json'
        }],
        defaultLocale: 'en', // default locale
        lazy: true,
        langDir: 'locales/',
      },
    googleFonts: {
        families: {
            Mukta: true,
        },
        display: 'swap',
        useStylesheet: true,
        download: false,
        preload: true
    }
})


