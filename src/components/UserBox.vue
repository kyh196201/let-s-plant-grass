<template>
  <article class="user-box">
    <template v-if="isLoading">
      <span> loading... </span>
    </template>

    <template v-else>
      <div class="user-box__top">
        <UserInfo :user="user" />

        <span class="user-box__count">
          <span>이번 주에 올린 커밋: </span>
          <em>{{ commitsThisWeek.length }}</em>
          <span>개</span>
        </span>
      </div>

      <CommitList :commits="commitsThisWeek" />
    </template>
  </article>
</template>

<script setup lang="ts">
  import { onMounted, ref, computed } from 'vue';
  import { fetchEvents } from '@/api';
  import UserInfo from './UserInfo.vue';
  import CommitList from './CommitList.vue';
  import { getStartOfWeek, getEndOfWeek, isBetween } from '@/lib/date';
  import type { User } from '@/interfaces/user';
  import type { Commit } from '@/interfaces/commit';
  import type { GithubEvent, GithubCommit } from '@/api';

  //#region props & emits
  const props = defineProps<{
    user: User;
  }>();
  //#endregion

  const monday = getStartOfWeek();
  const sunday = getEndOfWeek();

  function isInWeek(date: string, monday: Date, sunday: Date) {
    return isBetween(date, monday, sunday);
  }

  const commits = ref<Commit[]>([]);

  const commitsThisWeek = computed(() => {
    return commits.value.filter(({ createAt }) => isInWeek(createAt, monday, sunday));
  });

  const isLoading = ref(false);

  // TODO: 위치 변경 필요
  const isPushEvent = function isPushEvent(eventResponse: GithubEvent) {
    return eventResponse.type === 'PushEvent';
  };

  // TODO: 위치 변경 필요
  const createCommit = function createCommit(createAt: string, commitResponse: GithubCommit): Commit {
    return {
      createAt,
      message: commitResponse.message,
      url: commitResponse.url,
      sha: commitResponse.sha,
    };
  };

  // TODO: 위치 변경 필요
  const getCommitsFromResponse = function getCommitsFromResponse(eventResponses: GithubEvent[]): Commit[] {
    if (!eventResponses.length) {
      return [];
    }

    const pushEvents = eventResponses.filter(isPushEvent);

    if (!pushEvents.length) {
      return [];
    }

    const newCommits: Commit[] = [];

    pushEvents.forEach((event) => {
      const { commits } = event.payload;

      commits.forEach((commit) => {
        const newCommit = createCommit(event.created_at, commit);
        newCommits.push(newCommit);
      });
    });

    return newCommits;
  };

  //#region api
  const fetchData = async function fetchData() {
    try {
      isLoading.value = true;

      const { id } = props.user;

      const response = await fetchEvents({
        username: id,
        page: 1,
      });

      commits.value = getCommitsFromResponse(response);
    } catch (error) {
      // TODO: alert component
      alert(error);
    } finally {
      isLoading.value = false;
    }
  };
  //#endregion

  onMounted(() => {
    fetchData();
  });
</script>

<style lang="scss" scoped>
  .user-box {
    &__top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 2rem;
    }

    &__count {
      margin-left: 1rem;
      font-size: 1.4rem;

      em {
        font-weight: bold;
        color: $green;
      }
    }
  }
</style>
