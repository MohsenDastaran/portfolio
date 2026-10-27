<script setup>
// NOTE: sort in JS so the order is exactly the same on the server and on the
// client (newest first, path as a deterministic tie-breaker)
function sortProjects(projects) {
  return [...projects].sort((a, b) => {
    const dateA = String(a.createdAt ?? '');
    const dateB = String(b.createdAt ?? '');

    if (dateA < dateB) return 1;
    if (dateA > dateB) return -1;

    if (a._path < b._path) return -1;
    if (a._path > b._path) return 1;

    return 0;
  });
}

const { data: projectContents } = await useAsyncData('projects', async () =>
  sortProjects(await queryContent('project').find()),
);
defineProps({ projects: Object });
</script>

<template>
  <section class="projects" data-scroll-section>
    <VH2 class="projects__title">Projects</VH2>

    <ul class="projects__list">
      <!-- NOTE: use a stable key (not the index) so hydrated markup can never
      pair one project's image with another project's title -->
      <VProjectsItem
        v-for="(project, index) in projects || projectContents || []"
        :id="index"
        :key="project._path || index"
        :project="project"
        :aria-label="project.title"
        class="projects__list__item"
      />
    </ul>
  </section>
</template>

<style lang="scss">
.projects {
  color: var(--ff-color);

  padding: 4rem clamp(1rem, 7vw, 5rem) 1rem;
  margin-top: -1px;

  background-color: var(--surface-color);
  pointer-events: all;

  &__title {
    margin-bottom: 3rem;

    transition: color 400ms;

    // NOTE: smoothscroll (locomotive scroll) breakpoint
    @media screen and (min-width: 1024px) {
      margin-bottom: 7rem;
    }
  }

  &__list {
    display: grid;
    justify-items: center;
    align-items: start;
    grid-template-columns: minmax(0, 1fr);
    gap: calc(1.25 * var(--step-5));

    max-width: 1100px;

    list-style-type: none;
    margin: 0 auto;
    padding-inline-start: 0;

    &__item {
      min-width: 0;
      width: 100%;
      max-width: 475px;
    }

    @media screen and (min-width: 850px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      margin-block-start: 5rem;
      row-gap: calc(1.75 * var(--step-5));

      &__item:nth-child(even) {
        margin-block-start: 7rem;
      }
    }
  }

  @media (prefers-color-scheme: light) {
    color: #252525;
  }
}
</style>
