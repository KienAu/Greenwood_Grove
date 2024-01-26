<template>
    <nav class="mobile-navigation">
      <div class="mobile-navigation__inner">
        <ul class="mobile-navigation__list">
            <li class="mobile-navigation__item" v-for="nav in navigationLinks" :key="nav._uid">
                <a class="mobile-navigation__link" :href="localePath(nav.link.story.url == '/' ? '/' : '/' + nav.link.story.url)">
                    {{ nav.text }}
                </a>
            </li>
        </ul>
        <div class="mobile-navigation__seperator">
          <span></span>
          <span></span>
        </div>
        <div class="mobile-navigation__lang">
            <a :href="switchLocalePath('en')" class="mobile-navigation__lang-link" :class="isFrench ? '' : 'is-active'" @click="updateLanguage('en')">
                <span class="mobile-navigation__lang-text">en</span>
            </a>
            <a :href="switchLocalePath('fr')" class="mobile-navigation__lang-link" :class="isFrench ? 'is-active' : ''" @click="updateLanguage('fr')">
                <span class="mobile-navigation__lang-text">fr</span>
            </a>
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
  const isFrench = ref(false)
  
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


  
  const isActive = () => {
    if (window.location.href.includes("/fr")) {
      isFrench.value = true
    } else {
      isFrench.value = false
    }
    
    console.log(isFrench.value)
  }


  onBeforeMount(() => {
    // Initial data fetch
    fetchData();
  })


  onMounted(() => {
    isActive()
  })

  const updateLanguage = (newLang) => {
    currentLang.value = newLang;
    fetchData();
  };


</script>
