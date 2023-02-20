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
        <template v-if="fetches.events === 'success' && fetches.users === 'success'">
          <dash-board v-if="users.length" :users="users" />
        </template>

        <!-- TODO: skeleton component -->
        <p v-else-if="fetches.events === 'loading' || fetches.users === 'loading'">Loading...</p>

        <!-- TODO: error component -->
        <p v-else-if="fetches.events === 'failed' || fetches.users === 'failed'">Error</p>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { ref, onMounted, reactive } from 'vue';
  import DashBoard from '@/components/DashBoard.vue';
  import { fetchUser } from '@/api/local-api';
  import useWeek from '@/composables/useWeek';
  import type { User } from '@/interfaces/user';
  import type { FetchState } from '@/constants/settings';

  interface Fetches {
    users: FetchState;
    events: FetchState;
  }

  const fetches = reactive<Fetches>({
    events: 'wait',
    users: 'wait',
  });

  const { moveToPrevWeek, weekString, moveToCurrentWeek } = useWeek();

  const userIds = ['kyh196201', 'JEONMINJU', 'teller2016', 'JOANNASHIN'];

  const users = ref<User[]>([]);

  const fetchAllUsers = async function fetchAllUsers() {
    try {
      fetches.users = 'loading';

      const promises = userIds.map((id) => fetchUser(id));

      users.value = await Promise.all(promises);

      fetches.users = 'success';
    } catch (error) {
      fetches.users = 'failed';
      alert(error);
    }
  };

  const fetchAllEvents = async function fetchAllUsers() {
    try {
      fetches.events = 'loading';

      const promises = userIds.map((id) => fetchUser(id));

      users.value = await Promise.all(promises);

      fetches.events = 'success';
    } catch (error) {
      fetches.events = 'failed';
      alert(error);
    }
  };

  onMounted(() => {
    fetchAllUsers();
    fetchAllEvents();
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
