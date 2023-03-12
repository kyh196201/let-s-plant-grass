<template>
  <article class="commit-box">
    <time class="commit-box__date" :datetime="isoDate">
      {{ date }}
    </time>

    <CommitList :commits="commits" />
  </article>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { formatDate, toISOString } from '@/lib/date';

  import CommitList from '@/components/CommitList.vue';
  import type Commit from '@/interfaces/commit';

  const props = defineProps<{
    date: string;
    commits: Commit[];
  }>();

  const date = computed(() => {
    return formatDate(props.date, 'DATE_STRING');
  });

  const isoDate = computed(() => toISOString(props.date));
</script>

<style scoped lang="scss">
  .commit-box {
    padding: 1rem;
    border-radius: 1rem;
    background-color: $white;
    box-shadow: $box-shadow;

    &__date {
      display: inline-block;
      font-size: 1.4rem;
      margin-bottom: 1rem;
    }

    &__list {
      font-size: 1.6rem;
    }
  }
</style>
