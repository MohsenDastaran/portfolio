<script setup>
import LinkSVG from '~/assets/img/arrow-link.svg';
import OuterLinkSVG from '~/assets/img/arrow-outer-link.svg';
import MailLinkSVG from '~/assets/img/mail-link.svg';
import ActionSVG from '~/assets/img/action.svg';
import DownloadSVG from '~/assets/img/download.svg';

import { pointerModifiersWhitelist } from '~/lib/constants';

const SVGComponents = {
  [pointerModifiersWhitelist[0]]: LinkSVG,
  [pointerModifiersWhitelist[1]]: OuterLinkSVG,
  [pointerModifiersWhitelist[2]]: MailLinkSVG,
  [pointerModifiersWhitelist[3]]: ActionSVG,
  [pointerModifiersWhitelist[4]]: DownloadSVG,
};

const { gsap } = useGsap();
const emitter = useEmitter();
const prefersReducedMotion = useReducedMotion();

let firstMove = false;
const minifiedScale = 0.175;

const pointer = ref(null);
const pointerState = ref('');

function svgEnterAnimation(svgEl, done) {
  gsap.fromTo(
    svgEl,
    {
      yPercent: -55,
      xPercent: -55,
      scale: 0,
      rotate: 45,
    },
    {
      yPercent: -55,
      xPercent: -55,
      scale: 1,
      rotate: 0,
      duration: 0.25,
      delay: 0.1,
      ease: 'back.out',
      onComplete: () => done(),
    },
  );
}

function svgLeaveAnimation(svgEl, done) {
  gsap.to(svgEl, {
    yPercent: -55,
    xPercent: -55,
    scale: 0,
    duration: 0.25,
    ease: 'back.out',
    onComplete: () => done(),
  });
}

watch(pointerState, (val) => {
  const pointerTl = gsap.timeline({
    defaults: { ease: 'back.out', duration: 0.3 },
    paused: true,
  });

  if (val) pointerTl.to(pointer.value, { scale: 1 });
  else pointerTl.to(pointer.value, { scale: minifiedScale });

  pointerTl.play();
});

onMounted(() => {
  gsap.set(pointer.value, {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    autoAlpha: 0,
    scale: minifiedScale,
  });

  const isTouch = 'ontouchstart' in document.documentElement;

  if (isTouch || prefersReducedMotion.value) return;

  const toPointerX = gsap.quickTo(pointer.value, 'x', {
    ease: 'expo.out',
    duration: 0.5,
  });
  const toPointerY = gsap.quickTo(pointer.value, 'y', {
    ease: 'expo.out',
    duration: 0.5,
  });

  const pointerScaleTl = gsap.to(pointer.value, {
    scale: '-=0.15',
    ease: 'back.out',
    duration: 0.25,
    paused: true,
  });

  const cleanups = [];

  cleanups.push(
    on(window, 'pointermove', ({ x, y }) => {
      if (!firstMove)
        gsap
          .to(pointer.value, { autoAlpha: 1, clearProps: 'opacity' })
          .then(() => (firstMove = true));

      toPointerX(x);
      toPointerY(y);
    }),
  );

  cleanups.push(
    on(window, 'pointerdown', () => {
      if (pointerState.value !== '') pointerScaleTl.play();
    }),
  );

  cleanups.push(
    on(window, 'pointerup', () => {
      if (pointerState.value !== '') pointerScaleTl.reverse();
    }),
  );

  for (const modifier of pointerModifiersWhitelist) {
    emitter.on(`pointer:${modifier}:active`, () => {
      pointerState.value = modifier;
    });
    emitter.on(`pointer:${modifier}:inactive`, () => {
      pointerState.value = '';
    });
  }

  emitter.on('pointer:inactive', () => {
    pointerState.value = '';
  });

  onBeforeUnmount(() => {
    cleanups.forEach((func) => func());
  });
});
</script>

<template>
  <div ref="pointer" class="pointer">
    <Transition
      :css="false"
      @enter="svgEnterAnimation"
      @leave="svgLeaveAnimation"
    >
      <Component
        :is="SVGComponents[pointerState]"
        :key="pointerState"
        class="pointer__svg"
      />
    </Transition>
  </div>
</template>

<style lang="scss">
.pointer {
  --size: min(calc(5rem + 1vw), 6rem);

  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;

  width: var(--size);
  height: var(--size);

  opacity: 0;
  border-radius: 50%;
  background-color: #ffe6ed;

  mix-blend-mode: exclusion;

  pointer-events: none;
  transform: translate(-50%, -50%);

  transition: opacity 0.2s ease;

  &__svg {
    --size: 30%;

    position: absolute;
    top: 50%;
    left: 50%;

    width: var(--size);
    height: var(--size);

    color: #030303;
  }
}

body:hover .pointer {
  opacity: 1;
}
</style>
