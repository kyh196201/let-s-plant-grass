<template>
  <section class="home">
    <div class="home__contents">
      <!-- TODO: 컴포넌트 -->
      <nav class="home__nav">
        <div class="home__date">
          <font-awesome-icon icon="fa-regular fa-calendar" size="lg" />
          <span>{{ weekString }}</span>
        </div>
        <div class="home__nav__buttons">
          <button type="button" @click="moveToPrevWeek">이전 주차 보기</button>
          <button type="button" @click="moveToCurrentWeek">이번 주로 돌아가기</button>
        </div>
      </nav>

      <section class="home__dashboard">
        <template v-if="fetches.commits === 'success' && fetches.users === 'success'">
          <dash-board :users="users" :week="week" />
        </template>

        <!-- TODO: skeleton component -->
        <p v-else-if="fetches.commits === 'loading' || fetches.users === 'loading'">Loading...</p>

        <!-- TODO: error component -->
        <p v-else-if="fetches.commits === 'failed' || fetches.users === 'failed'">Error</p>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { onMounted, reactive } from 'vue';
  import { fetchCommits, fetchUser } from '@/api';
  import useWeek from '@/composables/useWeek';
  import USER_NAMES from '@/constants/user-names';
  import type { FetchState } from '@/constants/settings';

  // components
  import DashBoard, { type DashBoardUsers } from '@/components/DashBoard.vue';

  interface Fetches {
    users: FetchState;
    commits: FetchState;
  }

  //#region fetches
  const fetches = reactive<Fetches>({
    users: 'wait',
    commits: 'wait',
  });
  //#endregion

  //#region week
  const { moveToPrevWeek, weekString, moveToCurrentWeek, week } = useWeek();
  //#endregion

  //#region users
  const createUsersInitialState = function createUsersInitialState(names: string[]): DashBoardUsers {
    if (!names.length) {
      return {} as DashBoardUsers;
    }

    return names.reduce((users, name) => {
      return {
        ...users,
        [name]: {
          info: null,
          commits: [],
        },
      };
    }, {} as DashBoardUsers);
  };

  const users = reactive(createUsersInitialState(USER_NAMES));
  //#endregion

  //#region api
  // 전체 사용자 정보 조회
  const fetchUsers = async function fetchUsers(usernames: string[]) {
    try {
      fetches.users = 'loading';

      const promises = usernames.map((name) => {
        return fetchUser(name)
          .then((user) => ({ name, user }))
          .catch(() => ({ name, user: null }));
      });

      const results = await Promise.allSettled(promises);

      results.forEach((result) => {
        if (result.status === 'rejected') {
          return;
        }

        const { name, user } = result.value;

        users[name].info = user;
      });

      fetches.users = 'success';
    } catch (error) {
      fetches.users = 'failed';
      alert(error);
    }
  };

  // 전체 사용자들의 커밋 목록 조회
  const fetchUsersCommits = async function fetchUsersCommits(usernames: string[]) {
    try {
      fetches.commits = 'loading';

      const promises = usernames.map((username) => {
        return fetchCommits({ username })
          .then((commits) => ({ username, commits }))
          .catch(() => ({ username, commits: [] }));
      });

      const results = await Promise.allSettled(promises);

      results.forEach((result) => {
        if (result.status === 'rejected') {
          return;
        }

        const { username, commits } = result.value;

        users[username].commits = commits;
      });

      fetches.commits = 'success';
    } catch (error) {
      fetches.commits = 'failed';
    }
  };
  //#endregion

  onMounted(() => {
    fetchUsers(USER_NAMES);
    fetchUsersCommits(USER_NAMES);
  });
</script>

<style lang="scss" scoped>
  .home {
    padding: 1.6rem;

    &__nav {
      margin: 0 0 1.6rem 0;
      padding: 1.6rem;
      border-radius: 1rem;
      background-color: $white;
      box-shadow: $box-shadow;

      &__buttons {
        display: flex;

        // TODO: 디자인 수정
        button {
          font-weight: bold;
          text-decoration: underline;

          &:not(:last-of-type) {
            margin-right: 1rem;
          }
        }
      }
    }

    &__date {
      margin-bottom: 0.5em;
      font-size: 1.5rem;
      font-weight: bold;

      span {
        margin-left: 1rem;
      }
    }
  }
</style>
