<template>
  <header class="navigation">
    <div class="container navigation__inner">
      <div class="navigation__left-side">
        <Nuxt-link class="navigation__link" :to="localePath('/')">
          <img class="navigation__logo" :src="logo.filename" :alt="logo.alt" />
        </Nuxt-link>
        <nav class="navigation__list is-desktop">
          <div class="navigation__item" v-for="nav in navigationLinks" :key="nav._uid">
            <Nuxt-link class="navigation__link" :to="localePath(nav.link.story.url == '/' ? '/' : '/' + nav.link.story.url)">
              {{ nav.text }}
            </Nuxt-link>
          </div>
          <div class="navigation__item">
            <a href="#contact" class="navigation__link">
              {{ $t('Contact') }}
            </a>
          </div>
        </nav>
      </div>
      <ul class="navigation__right-side is-desktop">
        <li class="navigation__lang" v-for="lang in availableLocales" :key="lang">
          <NuxtLink :to="switchLocalePath(lang.code)" class="navigation__link" @click="updateLanguage(lang.code)">
            <span class="navigation__link-text">{{ lang.code }}</span>
          </NuxtLink>
        </li>
      </ul>

        <button class="navigation__button-mobile is-mobile" id="mobileHamburger" @click="menuToggle()">
          <div class="navigation__hamburger-icon">
            <span></span>
            <span></span>
          </div>
        </button>
        <MobileNavigation v-if="isOpen" />
    </div>
  </header>
</template>
  
<script setup>
  import MobileNavigation from './mobile-navigation.vue';

  const storyblokApi = useStoryblokApi()
  const localePath = useLocalePath()
  const { locales, locale } = useI18n()
  const switchLocalePath = useSwitchLocalePath()
  const availableLocales = ref(locales)
  let currentLang = ref(locale.value)
  const logo = ref('')
  const navigationLinks = ref('')
  let isOpen = ref(false)
  
  const fetchData = async () => {
    try {
      const { data } = await storyblokApi.get('cdn/stories/header', {
        version: 'draft',
        resolve_links: 'url',
        language: currentLang.value,
      });

        // Do something with the fetched data
        logo.value = data.story.content.logo
        navigationLinks.value = data.story.content.Navigations

      } catch (error) {
        console.error('Error fetching data:', error)
      }
  }



  onBeforeMount(() => {
    // Initial data fetch
    fetchData()
  })


  const updateLanguage = (newLang) => {
    currentLang.value = newLang
    fetchData()
  };

  const menuToggle = () => {
      isOpen.value = !isOpen.value
      const body = document.querySelector('body')
      const hamburger = document.querySelector('.navigation__hamburger-icon')

      body.classList.toggle('is-fixed')
      hamburger.classList.toggle('is-active')
  }

</script>