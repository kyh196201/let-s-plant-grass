<template>
  <ul class="dashboard">
    <template v-for="(user, name, index) in users" :key="`${name}-${index}`">
      <li v-if="user.info" class="dashboard-item">
        <router-link :to="`/user/${user.info.id}`">
          <user-info :user="user.info"></user-info>
        </router-link>

        <div class="dashboard-item__count">
          심은 잔디:
          <em> {{ filterCommitsInThisWeek(user.commits, week).length }} </em>개
        </div>
      </li>
    </template>
  </ul>
</template>

<script setup lang="ts">
  import UserInfo from './UserInfo.vue';
  import { isBetween } from '@/lib/date';
  import type { User } from '@/interfaces/user';
  import type Commit from '@/interfaces/commit';
  import type { Week } from '@/composables/useWeek';

  export interface DashBoardUsers {
    [key: string]: {
      info: User | null;
      commits: Commit[];
    };
  }

  interface Props {
    users: DashBoardUsers;
    week: Week;
  }

  defineProps<Props>();

  const isInWeek = function isInWeek(date: string, startOfWeek: Date, endOfWeek: Date) {
    return isBetween(date, startOfWeek, endOfWeek);
  };

  const filterCommitsInThisWeek = (commits: Commit[], week: Week): Commit[] => {
    const { start, end } = week;

    return commits.filter((commit) => isInWeek(commit.createAt, start, end));
  };
</script>

<style scoped lang="scss">
  .dashboard {
    padding: 0 1.6rem;
    background-color: $white;
    box-shadow: $box-shadow;
    border-radius: 1rem;

    .dashboard-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.6rem 0;

      &:not(:last-child) {
        border-bottom: 1px dotted #dddddd;
      }

      &__icon {
        color: $green;
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
  }
</style>
