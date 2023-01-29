<template>
  <section class="home">
    <div class="home__contents">
      <ul>
        <li v-for="user in users" :key="user.email">
          <user-box :user="user"></user-box>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import UserBox from '@/components/UserBox.vue';
  import { fetchUser } from '@/api';
  import type { User } from '@/interfaces/user';

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
  }
</style>
