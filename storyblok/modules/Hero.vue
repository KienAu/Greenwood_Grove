<template>
    <section v-editable="blok" class="hero">
      <div class="container hero-content">
        <h1 class="hero-title">{{ blok.title }}</h1>
        <div class="hero-separator">
          <span></span>
          <span></span>
        </div>
        <p class="hero-description">{{ blok.description }}</p>
        <div class="hero-button__wrap">
            <nuxtLink class="button" target="_self" :to="button.link.url" v-for="(button, index) in blok.buttons" :key="index">
              {{ button.text }}
            </nuxtLink>
        </div>
      </div>
      <div class="hero-carousel">
        <div class="hero-carousel__inner">
          <div class="hero-carousel__item" v-for="(item, index) in blok.carousels" :key="index" >
            <div class="hero-carousel__item-transition"></div>
            <img class="hero-carousel__image" :src="item.image.filename" :alt="item.image.alt" :class="{'is-active': index === currentActiveSlide}" />
          </div>
          <div class="hero-carousel__controls">
            <button class="hero-carousel__control is-next" @click="handleSlideChange(1)">
              <MacroArrowLeft />
            </button>
            <button class="hero-carousel__control is-prev" @click="handleSlideChange(-1)">
              <MacroArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  </template>
   
  <script setup>
    const props = defineProps({ blok: Object })
    const { gsap } = useGsap();

    let currentActiveSlide = ref(0); 

    const slides = props.blok.carousels;

    const transitionSlider = () => {
      gsap.fromTo(
        ".hero-carousel__item-transition",
        {
          duration: 0.5,
          width: 0,
          left: 0,
          right: "unset",
        },
        {
          duration: 0.5,
          width: "100%",
        }
      );
      gsap.to(".hero-carousel__item-transition", {
        duration: 0.5,
        width: 0,
        delay: 1,
        left: "unset",
        right: 0,
      });
    };

    // Carousel
    const handleSlideChange = (val) => {
      let direction;
      const calculateNextSlide = currentActiveSlide.value + val;

      if (val > 0) {
        direction = "next";
      } else {
        direction = "previous";
      }
      transitionSlider();
      setTimeout(() => {
        if (direction === "next" && calculateNextSlide < slides.length) {
          currentActiveSlide.value += val;
        } else if (direction === "next") {
          currentActiveSlide.value = 0;
        } else if (direction === "previous" && calculateNextSlide < 0) {
          currentActiveSlide.value = slides.length - 1;
        } else {
          currentActiveSlide.value += val;
        }
      }, 500);

      
    };
  </script>