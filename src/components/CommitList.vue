<template>
  <ul class="commit-list">
    <CommitItem v-for="commit in commits" :key="commit.sha" :commit="commit" />
  </ul>
</template>

<script setup lang="ts">
  import CommitItem from './CommitItem.vue';
  import type Commit from '@/interfaces/commit';

  defineProps<{
    commits: Commit[];
  }>();
</script>

<style lang="scss" scoped>
  .commit-list {
    border: 1px solid $border-color;
    border-radius: 1rem;
  }
</style>
