<template>
  <div
    ref="explorPage"
    style="background-color: aliceblue; color: blue; min-height: 100%"
  >
    <VHeader subTitle="Explorations" />
    <VProjects :projects="projects" />
  </div>
</template>

<script lang="ts" setup>
const { gsap } = useGsap();
const emitter = useEmitter();
const explorPage = ref(null);

const projects = [
  {
    _path: 'explorations/ogl',
    title: 'Ogl',
    description:
      'This website, as you might already notice, is my portfolio. I am using it to showcase what I learn and what I can do. It was built with the cutting-edge framework Nuxt',
    tags: ['Vue.js', 'Nuxt.js', 'three.js', 'gsap', 'SCSS', 'SEO'],
    previewImage: '/ogl.png',
  },
  {
    _path: 'explorations/glowButton',
    title: 'GlowButton',
    description:
      'This website, as you might already notice, is my portfolio. I am using it to showcase what I learn and what I can do. It was built with the cutting-edge framework Nuxt',
    tags: ['Vue.js', 'Nuxt.js', 'three.js', 'gsap', 'SCSS', 'SEO'],
    previewImage: '/glowButton.png',
  },
];
const showBackButton = () =>
  gsap.fromTo(
    '.nav__back-link',
    { autoAlpha: 0 },
    { autoAlpha: 1, delay: 0.4 },
  );
useImagesLoaded(explorPage, () => emitter.emit('images:loaded'));

emitter.once('overlay:hiding', showBackButton);
</script>
