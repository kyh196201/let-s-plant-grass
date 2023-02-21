<template>
  <ul class="dashboard">
    <li v-for="(user, index) in users" :key="user.email" class="dashboard__item">
      <user-info :user="user"></user-info>
      <div class="dashboard__count">
        이번 주에 심은 잔디:
        <em> {{ commitCounts[index] || 0 }} </em>개
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
  import UserInfo from './UserInfo.vue';
  import type { User } from '@/interfaces/user';

  interface Props {
    users: User[];
    commitCounts?: number[];
  }

  withDefaults(defineProps<Props>(), {
    commitCounts: () => [],
  });
</script>

<style scoped lang="scss">
  .dashboard {
    padding: 0 1.6rem;
    background-color: $white;
    box-shadow: $box-shadow;
    border-radius: 1rem;

    &__item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.6rem 0;

      &:not(:last-child) {
        border-bottom: 1px dotted #dddddd;
      }
    }

    &__count {
      margin-left: 1rem;
      font-size: 1.4rem;

      em {
        font-weight: bold;
        color: $green;
        font-size: 1.2em;
      }
    }
  }
</style>
