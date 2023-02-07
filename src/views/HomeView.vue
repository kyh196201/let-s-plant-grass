<template>
  <section class="home">
    <div class="home__contents">
      <nav class="home__nav">
        <p class="home__date">📅 {{ weekString }}</p>
        <div class="home__nav__buttons">
          <button type="button" @click="moveToPrevWeek">이전 주차 보기</button>
          <button type="button" @click="moveToCurrentWeek">이번 주로 돌아가기</button>
        </div>
      </nav>

      <ul>
        <li v-for="user in users" :key="user.email">
          <user-box :week="week" :user="user"></user-box>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import UserBox from '@/components/UserBox.vue';
  import { fetchUser } from '@/api';
  import useWeek from '@/composables/useWeek';
  import type { User } from '@/interfaces/user';

  const { week, moveToPrevWeek, weekString, moveToCurrentWeek } = useWeek();

  const userIds = ['kyh196201', 'JEONMINJU', 'teller2016', 'JOANNASHIN'];

  const isLoading = ref(false);

  const users = ref<User[]>([]);

  const fetchAllUsers = async function fetchAllUsers() {
    try {
      isLoading.value = true;

      const promises = userIds.map((id) => fetchUser(id));

      users.value = await Promise.all(promises);
    } catch (error) {
      alert(error);
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(() => {
    fetchAllUsers();
  });
</script>

<style lang="scss" scoped>
  .home {
    padding: 1rem;

    &__contents {
      margin: 0 -1rem;

      li {
        padding: 1rem;
        border-bottom: 1rem solid $space-color;
      }
    }

    &__nav {
      padding: 0 1rem;
      margin-bottom: 1rem;

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
    }
  }
</style>
