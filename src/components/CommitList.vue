<template>
  <ul class="commit-list">
    <template v-if="commits.length">
      <CommitItem v-for="commit in commits" :key="commit.sha" :commit="commit" />
    </template>

    <template v-else>
      <li class="commit-list__empty">
        <p>이번주에 심은 잔디가 없습니다. 🤣</p>
      </li>
    </template>
  </ul>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import CommitItem from './CommitItem.vue';
  import { MAX_COMMITS_LENGTH } from '@/constants/settings';
  import type Commit from '@/interfaces/commit';

  const props = defineProps<{
    commits: Commit[];
  }>();

  const commits = computed(() => props.commits.slice(0, MAX_COMMITS_LENGTH));
</script>

<style lang="scss" scoped>
  .commit-list {
    border: 1px solid $border-color;
    border-radius: 1rem;

    &__empty {
      padding: 0.8rem 1.2rem;
      text-align: center;
      font-size: 1.4rem;
      font-weight: 400;
    }
  }
</style>
