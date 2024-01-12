<template>
    <nav class="mobile-navigation">
      <div class="mobile-navigation__inner">
        <ul class="mobile-navigation__list">
            <li class="mobile-navigation__item" v-for="nav in navigationLinks" :key="nav._uid">
                <nuxt-link class="mobile-navigation__link" :to="localePath(nav.link.story.url == '/' ? '/' : '/' + nav.link.story.url)">
                    {{ nav.text }}
                </nuxt-link>
            </li>
        </ul>
        <div class="mobile-navigation__seperator">
          <span></span>
          <span></span>
        </div>
        <div class="mobile-navigation__lang">
            <NuxtLink v-for="lang in availableLocales" :key="lang" :to="switchLocalePath(lang.code)" class="mobile-navigation__lang-link" @click="updateLanguage(lang.code)">
                <span class="mobile-navigation__lang-text">{{ lang.code }}</span>
            </NuxtLink>
        </div>
      </div>
    </nav>
</template>

<script setup>

  const storyblokApi = useStoryblokApi()
  const localePath = useLocalePath()
  const { locales, locale } = useI18n()
  const switchLocalePath = useSwitchLocalePath()
  const availableLocales = ref(locales)
  let currentLang = ref(locale.value)
  const logo = ref('')
  const navigationLinks = ref('')
  
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
        console.error('Error fetching data:', error);
      }
  }



  onBeforeMount(() => {
    // Initial data fetch
    fetchData();
  })


  const updateLanguage = (newLang) => {
    currentLang.value = newLang;
    fetchData();
  };

</script>
