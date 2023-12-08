<template>
    <footer class="footer" id="contact">
        <div class="footer__inner">
            <div class="container">
                <div class="footer-col">
                    <Nuxt-link class="footer__link" to="/">
                        <img class="footer__logo" :src="footer.logo.filename" :alt="footer.logo.alt" />
                    </Nuxt-link>
                </div>
                <div class="footer-col">
                    <div class="footer-newsletter__text">
                        <h6 class="footer-title">    
                            {{ $t('Contact us today & Learn More on the Grove:') }}
                        </h6>
                    </div>
                    <form class="footer-newsletter__form">
                        <div class="footer-newsletter__input-wrapper">
                            <input class="input" type="text" placeholder="Name" />
                            <input class="input" type="email" placeholder="Email" />
                        </div>
                        <textarea class="textarea" placeholder="Your message ..." rows="5" cols="20"></textarea>
                        <button class="button"> {{ $t('Send & Subscribe') }} </button>
                    </form>
                </div>
                <div class="footer-col">
                    <h6 class="footer-title">
                        {{ $t('Follow the Grove on Social Media') }}
                    </h6>
                    <ul class="footer-social-media__list">
                        <li v-for="social in footer.socialMediaList">
                            <a :href="social.link.url" target="_self">
                                <img class="footer-social-media__icon" :src="social.icon.filename" :alt="social.icon.alt" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="footer-copyright">
            <div class="footer-copyright__inner container">
                <p><strong>{{ $t('Greenwoord Grove Dorval') }}</strong> {{ $t('© 2023 | All rights reserved') }}</p>
                <a href="" target="_self">{{ $t('Terms & Conditions') }}</a>
            </div>
        </div>
        <div class="footer-google-map">
            <iframe loading="lazy" allowfullscreen src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJ1T_4aZM9yUwRbAkaYtsEgvg&key=AIzaSyDg8oWo8La-Icf5YAKQvb0lrn3kMrYRAU0"></iframe>
        </div>
    </footer>
</template>

<script setup>
  const storyblokApi = useStoryblokApi()
  const { data } = await storyblokApi.get('cdn/stories/footer', {
    version: 'draft',
    resolve_links: 'url',
  })

  const footer = ref(data.story.content)
</script>