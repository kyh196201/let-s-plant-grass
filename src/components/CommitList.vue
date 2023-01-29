<template>
  <ul class="commit-list">
    <template v-for="commit in commits" :key="commit.sha">
      <CommitItem :commit="commit" />
    </template>
  </ul>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import CommitItem from './CommitItem.vue';
  import { MAX_COMMITS_LENGTH } from '@/constants/settings';
  import type { Commit } from '@/interfaces/commit';

  const props = defineProps<{
    commits: Commit[];
  }>();

  const commits = computed(() => props.commits.slice(0, MAX_COMMITS_LENGTH));
</script>

<style lang="scss" scoped>
  .commit-list {
    border: 1px solid $border-color;
    border-radius: 1rem;
  }
</style>
