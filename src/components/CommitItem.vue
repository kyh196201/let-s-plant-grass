<template>
  <li class="commit">
    <p class="commit__message">{{ message }}</p>
    <time class="commit__time">{{ createAt }}</time>
  </li>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { formatDate } from '@/lib/date';
  import type { Commit } from '@/interfaces/commit';

  const props = defineProps<{
    commit: Commit;
  }>();

  const createAt = computed(() => formatDate(props.commit.createAt));

  const message = computed(() => props.commit.message);
</script>

<style lang="scss" scoped>
  .commit {
    padding: 0.8rem 1.2rem;

    &__message {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 1.4rem;
      font-weight: 400;
    }

    &__time {
      font-size: 1.2rem;
      color: #57606a;
    }

    &:not(:first-child) {
      border-top: 1px solid $border-color;
    }
  }
</style>
