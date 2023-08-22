<template>
  <nav class="navigation">
    <div class="container">
      <div class="navigation__inner">
        <div class="navigation__logo">
          <img class="logo" :src="navigation.logo.filename" />
        </div>
        <ul class="navigation__list">
          <li class="navigation__item" v-for="nav in navigationLinks" :key="nav._uid">
            <Nuxt-link :to="nav.link.story.url">
              {{ nav.text }}
            </Nuxt-link>
          </li>
          <li class="navigation__lang" v-for="lang in availableLocales" :key="lang">
            <NuxtLink :to="switchLocalePath(lang.code)" class="navigation__link">
              {{ lang.code }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
  
<script setup>
  const storyblokApi = useStoryblokApi()
  const { data } = await storyblokApi.get('cdn/stories/config', {
    version: 'draft',
    resolve_links: 'url',
  })

  const navigation = ref(null)
  const navigationLinks = ref(null);

  navigation.value = data.story.content
  navigationLinks.value = data.story.content.navigation

  const localePath = useLocalePath()
  const { locale, locales } = useI18n()
  const switchLocalePath = useSwitchLocalePath()
  
  const availableLocales = computed(() => {
    return (locales.value).filter(i => i.code !== locale.value)
  })
</script>