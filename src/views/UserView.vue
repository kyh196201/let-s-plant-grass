<template>
  <div class="user-view">
    <!-- 사용자 정보 -->
    <section class="user-view__user">
      <h2 class="sr-only">사용자 정보 영역</h2>

      <template v-if="userFetchState === 'loading'"> loading user... </template>

      <template v-if="userFetchState === 'success' && user">
        <div class="user-view__user-info">
          <user-info :user="user"></user-info>
        </div>

        <nav class="user-view__user-links">
          <a :href="user.homePage" target="_blank" title="깃허브 페이지로 이동" class="user-links__github">
            <span class="sr-only">깃허브 페이지</span>
          </a>
        </nav>
      </template>
    </section>

    <!-- 벌금 -->
    <section class="user-view__penalty">
      <h2 class="sr-only">누적 벌금</h2>

      <div class="penalty">
        <em> 0 </em>
        <span>벌금</span>
      </div>
    </section>

    <!-- 커밋 목록 -->
    <section class="user-view__contents">
      <h2 class="sr-only">커밋 목록</h2>

      <template v-if="commitsFetchState === 'loading'"> loading commits... </template>

      <template v-else-if="commitsFetchState === 'success'">
        <div class="user-view__commits">
          <ul v-if="Object.keys(groupedCommits).length">
            <template v-for="(group, key) in groupedCommits" :key="key">
              <li class="user-view__commit-box">
                <CommitBox :date="(key as string)" :commits="group" />
              </li>
            </template>
          </ul>

          <!-- empty -->
          <div v-else class="user-view__empty">
            <div class="empty">
              <p class="empty__text">심은 잔디가 없습니다. 😂</p>
            </div>
          </div>
        </div>
      </template>
    </section>

    <!-- TODO: go to top -->
  </div>
</template>

<script setup lang="ts">
  import { onMounted, computed, onBeforeUnmount } from 'vue';
  import { useRoute } from 'vue-router';
  import UserInfo from '@/components/UserInfo.vue';
  import CommitBox from '@/components/CommitBox.vue';
  import useUser from '@/composables/useUser';
  import useCommits from '@/composables/useCommits';
  import { groupBy } from 'lodash-es';
  import { formatDate } from '@/lib/date';

  //#region route
  const route = useRoute();
  const userId = computed(() => route.params.id as string);
  //#endregion

  //#region user
  const { fetchState: userFetchState, user, fetchUser } = useUser(userId);
  //#endregion

  //#region commits
  const { fetchState: commitsFetchState, commits, fetchCommits } = useCommits(userId);

  const formatCreateAt = (createAt: string) => formatDate(createAt, 'DATE');

  const groupedCommits = computed(() => {
    if (!commits.value.length) return {};

    return groupBy(commits.value, (item) => {
      return formatCreateAt(item.createAt);
    });
  });
  //#endregion

  const changeHeaderBackground = function changeHeaderBackground(isMounted = true) {
    const header = document.querySelector('header');

    if (!header) return;

    header.style.backgroundColor = isMounted ? 'rgb(255, 232, 74)' : '';
  };

  onMounted(() => {
    changeHeaderBackground();
    fetchUser();
    fetchCommits();
  });

  onBeforeUnmount(() => {
    changeHeaderBackground(false);
  });
</script>

<style scoped lang="scss">
  .user-view {
    &__user {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.6rem 1.6rem 6.4rem;
      background: linear-gradient(135deg, $yellow 26%, $yellow-dark 58%);
    }

    &__user-links {
      display: flex;
      align-items: center;
      justify-content: flex-end;

      .user-links {
        &__github {
          width: 3rem;
          height: 3rem;
          background: url('@/assets/images/icons/github-home-icon.svg') no-repeat center/100% auto;
          opacity: 0.8;
        }
      }
    }

    &__penalty {
      margin: 0 1.6rem;
      margin-top: -3.6rem;
      padding: 1.6rem;
      border-radius: 1rem;
      background-color: $white;
      box-shadow: $box-shadow;

      .penalty {
        display: flex;
        align-items: center;
        justify-content: center;

        em {
          margin-right: 0.5rem;
          color: $penalty-color;
          font-size: 2.4rem;
          font-weight: bold;
        }

        span {
          color: $text-color;
          font-size: 1.6rem;
        }
      }
    }

    &__contents {
      padding: 1.6rem;
    }

    &__commit-box {
      margin-bottom: 1.6rem;
    }

    &__empty {
      padding: 4rem 0;

      .empty {
        &::before {
          content: '';
          display: block;
          width: 12rem;
          height: 12rem;
          margin: 0 auto 2rem;
          background: url('@/assets/images/icons/empty-folder.png') no-repeat center/100% auto;
        }

        &__text {
          text-align: center;
          font-size: 2rem;
          font-weight: bold;
        }
      }
    }
  }
</style>
