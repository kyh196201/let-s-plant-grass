<template>
  <article class="user-box">
    <template v-if="isLoading">
      <span> loading... </span>
    </template>

    <template v-else>
      <div class="user-box__top">
        <UserInfo :user="user" />

        <span class="user-box__count">
          <em>{{ commits.length }}</em
          >개
        </span>
      </div>

      <CommitList :commits="commits" />
    </template>
  </article>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { fetchEvents } from '@/api';
  import UserInfo from './UserInfo.vue';
  import CommitList from './CommitList.vue';
  import type { User } from '@/interfaces/user';
  import type { Commit } from '@/interfaces/commit';

  const props = defineProps<{
    user: User;
  }>();

  const commits = ref<Commit[]>([]);
  const isLoading = ref(false);

  const fetchData = async function fetchData() {
    try {
      isLoading.value = true;

      const { id } = props.user;

      const events = await fetchEvents({
        username: id,
        page: 1,
      });

      if (!events.length) return;

      const pushEvents = events.filter(({ type }) => type === 'PushEvent');

      if (!pushEvents.length) return;

      const newCommits: Commit[] = [];

      pushEvents.forEach((event) => {
        const { commits } = event.payload;

        commits.forEach((commit) => {
          newCommits.push({
            createAt: event.created_at,
            message: commit.message,
            url: commit.url,
            sha: commit.sha,
          });
        });
      });

      commits.value = newCommits;
    } catch (error) {
      alert(error);
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(() => {
    fetchData();
  });
</script>

<style lang="scss" scoped>
  .user-box {
    &__top {
      display: flex;
      align-items: center;
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
