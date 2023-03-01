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
        <template v-if="fetches.commitCounts === 'success' && fetches.users === 'success'">
          <dash-board :users="users" />
        </template>

        <!-- TODO: skeleton component -->
        <p v-else-if="fetches.commitCounts === 'loading' || fetches.users === 'loading'">Loading...</p>

        <!-- TODO: error component -->
        <p v-else-if="fetches.commitCounts === 'failed' || fetches.users === 'failed'">Error</p>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { ref, onMounted, reactive } from 'vue';
  import { fetchEvents, fetchUser } from '@/api';
  import useWeek from '@/composables/useWeek';
  import { isPushEvent } from '@/lib/github';
  import { isBetween } from '@/lib/date';
  import USER_NAMES from '@/constants/user-names';
  import type { FetchState } from '@/constants/settings';

  // components
  import DashBoard, { type DashBoardUsers } from '@/components/DashBoard.vue';

  interface Fetches {
    users: FetchState;
    commitCounts: FetchState;
  }

  //#region fetches
  const fetches = reactive<Fetches>({
    commitCounts: 'wait',
    users: 'wait',
  });
  //#endregion

  //#region week
  const { moveToPrevWeek, weekString, moveToCurrentWeek, week } = useWeek();

  function isInWeek(date: string, startOfWeek: Date, endOfWeek: Date) {
    return isBetween(date, startOfWeek, endOfWeek);
  }
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

  const commitCounts = ref<number[]>([]);

  //#region api
  const fetchAllUsers = async function fetchAllUsers(usernames: string[]) {
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

  /**
   * 사용자 별로 이번주에 올린 커밋 개수 반환
   *
   * @param username 사용자 이름(아이디)
   */
  const getCommitCountThisWeek = async function getCommitCountThisWeek(username: string): Promise<number> {
    const response = await fetchEvents({
      username,
      page: 1,
      perPage: 100,
    });

    if (!response?.length) {
      return 0;
    }

    const { start, end } = week.value;

    let count = 0;

    response.filter(isPushEvent).forEach((event) => {
      if (isInWeek(event.created_at, start, end)) {
        count += event.payload.commits.length;
      }
    });

    return count;
  };

  /**
   * 모든 사용자의 이번주에 올린 커밋 개수 반환
   */
  const fetchUsersCommitCounts = async function fetchUsersCommitCounts(usernames: string[]) {
    try {
      fetches.commitCounts = 'loading';

      const promises: Promise<{ count: number }>[] = usernames.map((name) => {
        return getCommitCountThisWeek(name)
          .then((count) => {
            return { count };
          })
          .catch(() => {
            return { count: 0 };
          });
      });

      const results = await Promise.allSettled(promises);

      commitCounts.value = results.map((result) => {
        if (result.status === 'fulfilled') {
          return result.value.count;
        }

        return 0;
      });

      fetches.commitCounts = 'success';
    } catch (error) {
      console.error('fetchUsersCommitCounts has error', error);
      fetches.commitCounts = 'failed';
    }
  };
  //#endregion

  // TODO: 너무 비효율적
  // 커밋 개수를 한 번 가져오고, week을 통해 computed로 커밋 개수를 연산하는 것이 좋을 것 같음
  // watch(week, () => {
  //   fetchUsersCommitCounts();
  // });

  onMounted(() => {
    fetchAllUsers(USER_NAMES);
    fetchUsersCommitCounts(USER_NAMES);
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
