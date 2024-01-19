<template>
    <footer class="footer" id="contact">
        <div class="footer__inner">
            <div class="container">
                <div class="footer-col">
                    <Nuxt-link class="footer__link" to="/">
                        <img class="footer__logo is-desktop" :src="footer.logo.filename" :alt="footer.logo.alt" />
                        <img class="footer__logo is-mobile" :src="footer.mobileLogo.filename" :alt="footer.mobileLogo.alt" />
                    </Nuxt-link>
                </div>
                <div class="footer-col">
                    <div class="footer-newsletter__text">
                        <h6 class="footer-title">    
                            {{ $t('Learn More on the Grove:') }}
                        </h6>
                    </div>
                    <form class="footer-newsletter__form" action="https://greenwoodgrovemtl.us9.list-manage.com/subscribe/post?u=b6a7fdbbd093bc8e6d168b581&amp;id=c2848126b6&amp;f_id=00e41ee1f0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" target="_blank">
                        <div class="footer-newsletter__input-wrapper">
                            <input class="input text" type="text" name="FNAME" id="mce-FNAME" value="" placeholder="First name"/>
                            <input class="input text" type="text" name="LNAME" id="mce-LNAME" value="" placeholder="Last name"/>
                        </div>
                        <input class="email" name="EMAIL" id="mce-EMAIL" type="email" placeholder="Email" value=""/>
                        <input type="submit" name="subscribe" id="mc-embedded-subscribe" class="button" :value="$t('Send & Subscribe')">
                        <div style="position: absolute; left: -5000px;" aria-hidden="true">
                            /* real people should not fill this in and expect good things - do not remove this or risk form bot signups */
                            <input type="text" name="b_b6a7fdbbd093bc8e6d168b581_c2848126b6" tabindex="-1" value="">
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div class="footer-copyright">
            <div class="footer-copyright__inner container">
                <p><strong>{{ $t('Greenwoord Grove Dorval') }}</strong> {{ $t('© 2023 | All rights reserved') }}</p>
                <ul class="footer-social-media__list">
                    <li v-for="social in footer.socialMediaList">
                        <a :href="social.link.url" target="_self">
                            <img class="footer-social-media__icon" :src="social.icon.filename" :alt="social.icon.alt" />
                        </a>
                    </li>
                </ul>
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