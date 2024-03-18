<template>
  <div
    ref="explorPage"
    style="background-color: aliceblue; color: blue; min-height: 100%"
  >
    <VHeader />
    <VProjects :projects="projects" />
  </div>
</template>

<script lang="ts" setup>
const { gsap } = useGsap();
const emitter = useEmitter();
const explorPage = ref(null);

const projects = [
  {
    _path: '/project/chatapp',
    title: 'ChatApp',
    description:
      'This website, as you might already notice, is my portfolio. I am using it to showcase what I learn and what I can do. It was built with the cutting-edge framework Nuxt',
    source: 'https://github.com/MohsenDastaran/portfolio',
    live: 'https://MohsenDastaran.xyz',
    tags: ['Vue.js', 'Nuxt.js', 'three.js', 'gsap', 'SCSS', 'SEO'],
    image: '/chatApp.svg',
    previewImage: '/chatApp.svg',
  },
];
const showBackButton = () =>
  gsap.fromTo(
    '.nav__back-link',
    { autoAlpha: 0 },
    { autoAlpha: 1, delay: 0.7 },
  );
useImagesLoaded(explorPage, () => emitter.emit('images:loaded'));

emitter.once('overlay:hiding', showBackButton);
</script>

<style></style>

