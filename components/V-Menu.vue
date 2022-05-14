<script setup>
const { $smoothScroll, $isDarkMode } = useNuxtApp();

const { gsap } = useGsap();
const currentSection = useCurrentSection();
const isShowingMenu = useMenuToggle();

const navigationalLinks = [
  { label: 'Home', action: () => $smoothScroll.scrollTo(0) },
  { label: 'Projects', action: () => $smoothScroll.scrollTo('.projects') },
  { label: 'About', action: () => $smoothScroll.scrollTo('.about') },
  { label: 'Contact', action: () => $smoothScroll.scrollTo('.contact') },
];

const socialLinks = [
  { label: 'linkedin', href: 'https://www.linkedin.com/in/bogdankostyuk' },
  { label: 'telegram', href: 'https://t.me/bogdankostyuk' },
  { label: 'github', href: 'https://github.com/logotip4ik' },
  { label: 'email', href: 'mailto:contact@bogdankostyuk.xyz' },
];

const menu = ref(null);
const menuBackItem = ref([]);
const menuBackItemLine = ref([]);
const menuBackItemContentTitle = ref([]);
const menuBackItemContentLinksItem = ref([]);

let prevAnimation;

function showMenu() {
  if (prevAnimation) prevAnimation.kill();

  // if (this.prefersReducedMotion)
  //   return (this.prevAnimation = this.$gsap.fromTo(
  //     this.$refs.menu,
  //     { autoAlpha: 0 },
  //     { autoAlpha: 1 }
  //   ))

  prevAnimation = gsap.timeline();

  prevAnimation.set(menu.value, {
    autoAlpha: 1,
  });

  prevAnimation.fromTo(
    menuBackItem.value,
    {
      yPercent: 100,
      rotateX: -90,
      opacity: 0,
      transformOrigin: 'center top',
      transformStyle: 'preserve-3d',
    },
    {
      yPercent: 0,
      rotateX: 0,
      opacity: 1,
      stagger: 0.05,
    }
  );
  prevAnimation.fromTo(
    menu.value,
    { backgroundColor: 'transparent' },
    { backgroundColor: $isDarkMode() ? '#030303' : '#ebebeb' }
  );
  prevAnimation.fromTo(
    menuBackItemLine.value,
    { transform: 'scaleX(0)', transformOrigin: 'left bottom' },
    { transform: 'scaleX(1)', stagger: 0.05 },
    '<'
  );
  prevAnimation.fromTo(
    [...menuBackItemContentTitle.value, ...menuBackItemContentLinksItem.value],
    { opacity: 0, yPercent: 100 },
    {
      opacity: 1,
      yPercent: 0,
      duration: 1,
      ease: 'power4.out',
      stagger: 0.075,
    },
    '<-0.125'
  );
}

function hideMenu() {
  if (prevAnimation) prevAnimation.kill();

  // if (this.prefersReducedMotion)
  //   return (this.prevAnimation = this.$gsap.to(this.$refs.menu, {
  //     autoAlpha: 0,
  //   }))

  prevAnimation = gsap.to(menu.value, {
    autoAlpha: 0,
  });
}

watch(isShowingMenu, (bool) => {
  if (bool) {
    $smoothScroll.disable();
    showMenu();
  } else {
    $smoothScroll.enable();
    hideMenu();
  }
});
</script>

<template>
  <div ref="menu" class="menu" role="menu" data-scroll-sticky>
    <div
      :ref="(el) => (menuBackItem[0] = el)"
      class="menu__back-item"
      aria-hidden="true"
    ></div>
    <div
      v-for="(link, key) in navigationalLinks"
      :key="key"
      :ref="(el) => (menuBackItem[key + 1] = el)"
      class="menu__back-item"
      role="menuitem"
    >
      <div
        role="button"
        :class="{
          'menu__back-item__content': true,
          'menu__back-item__content--active': key === currentSection,
        }"
        tabindex="0"
        :aria-label="`scroll to ${link.label}`"
        @click="link.action(), $nuxt.$emit('toggle-menu')"
      >
        <p
          :ref="(el) => (menuBackItemContentTitle[key] = el)"
          class="menu__back-item__content__title"
        >
          <span>{{ link.label }}</span>
        </p>
      </div>
      <span
        :ref="(el) => (menuBackItemLine[key] = el)"
        class="menu__back-item__line"
      ></span>
    </div>
    <div class="menu__back-item">
      <div class="menu__back-item__content menu__back-item__content--no-anim">
        <ul class="menu__back-item__content__links">
          <li
            v-for="(link, key) in socialLinks"
            :key="key"
            :ref="(el) => (menuBackItemContentLinksItem[key] = el)"
            class="menu__back-item__content__links__item"
          >
            <a :href="link.href" target="_blank" rel="noopener noreferrer">
              {{ link.label }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.menu {
  --100vh: calc(100 * var(--vh, 1vh));

  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;

  width: 100%;
  height: 100%;
  height: var(--100vh);

  opacity: 0;
  visibility: hidden;
  pointer-events: all;

  &__back-item {
    $ITEMS_COUNT: 6;
    --ease-back: cubic-bezier(0.34, 1.56, 0.64, 1);
    --x-padding: calc(clamp(1rem, 4vw, 5rem) + var(--step-0));

    position: absolute;
    left: 0;
    right: 0;

    height: calc(var(--100vh) / #{$ITEMS_COUNT});

    padding: 1rem var(--x-padding);
    background-color: var(--surface-color);

    @for $i from 0 to $ITEMS_COUNT {
      &:nth-child(#{$i + 1}) {
        top: calc(#{$i} * calc(var(--100vh) / #{$ITEMS_COUNT}));
      }
    }

    &__content {
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;

      height: 100%;

      cursor: pointer;

      &__title {
        position: relative;

        color: darken($color: #fff, $amount: 50);
        font-size: var(--step-3);
        line-height: 1;

        width: 100%;
        margin: 0;

        span {
          display: inline-block;
          transform-origin: left center;
          transition: color 200ms, transform 200ms var(--ease-back);
        }

        &::after {
          --size: var(--step--1);

          content: '';
          position: absolute;
          top: 50%;
          right: 0;

          width: var(--size);
          height: var(--size);
          border-radius: 50%;
          background-color: #ffe6ed;
          opacity: 0;

          transform: translate(-50%, -50%);
          transition: opacity 200ms ease;

          @media (prefers-color-scheme: light) {
            background-color: #303030;
          }
        }
      }

      &__links {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: var(--step-1);

        list-style-type: none;
        padding-inline-start: 0;

        &__item a {
          font-size: calc(var(--step--2) - 0.075rem);
          color: darken($color: #fff, $amount: 50);
          text-transform: uppercase;
          text-decoration: none;

          transition: color 100ms;

          &:is(:hover, :focus) {
            color: #ffe6ed;

            @media (prefers-color-scheme: light) {
              color: #030303;
            }
          }
        }
      }

      &:is(:focus, :hover) .menu__back-item__content__title {
        color: #ffe6ed;

        span {
          transform: scale(0.96);
        }

        @media (prefers-color-scheme: light) {
          color: #030303;
        }
      }

      &--active {
        .menu__back-item__content__title {
          color: #ffe6ed;

          &::after {
            opacity: 1;
          }

          @media (prefers-color-scheme: light) {
            color: #030303;
          }
        }
      }

      &--no-anim {
        &:is(:hover, :focus) {
          transform: none;
        }
      }
    }

    &__line {
      display: inline-block;

      position: absolute;
      bottom: 1%;
      left: var(--x-padding);
      right: var(--x-padding);

      height: 1px;
      background-color: darken($color: #fff, $amount: 75);
    }
  }
}
</style>