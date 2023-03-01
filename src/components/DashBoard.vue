<template>
  <ul class="dashboard">
    <template v-for="(user, name, index) in users" :key="index">
      <li v-if="user.info" class="dashboard__item">
        <user-info :user="user.info"></user-info>
        <div class="dashboard__count">
          이번 주에 심은 잔디:
          <em> {{ user.commits.length }} </em>개
        </div>
      </li>
    </template>
  </ul>
</template>

<script setup lang="ts">
  import UserInfo from './UserInfo.vue';
  import type { User } from '@/interfaces/user';
  import type { Commit } from '@/interfaces/commit';

  export interface DashBoardUsers {
    [key: string]: {
      info: User | null;
      commits: Commit[];
    };
  }

  interface Props {
    users: DashBoardUsers;
  }

  defineProps<Props>();
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
