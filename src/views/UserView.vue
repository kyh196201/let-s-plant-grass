<template>
  <div class="user-view">
    <!-- 사용자 정보 -->
    <section class="user-view__user">
      <h2 class="sr-only">사용자 정보 영역</h2>

      <div class="user-view__user-info">
        <user-info :user="user"></user-info>
      </div>

      <nav class="user-view__user-links">
        <a :href="user.homePage" target="_blank" title="깃허브 주소로 이동" class="user-links__github">
          <span class="sr-only">깃허브 주소</span>
        </a>
      </nav>
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

      <div class="user-view__commits">
        <ul v-if="false">
          <li class="user-view__commit-box">
            <article class="commit-box">
              <time class="commit-box__date" datetime="">2023년 3월 12일</time>
              <CommitList :commits="commitList" />
            </article>
          </li>
        </ul>

        <!-- empty -->
        <div class="user-view__empty">
          <div class="empty">
            <p class="empty__text">심은 잔디가 없습니다. 😂</p>
          </div>
        </div>
      </div>
    </section>

    <!-- TODO: go to top -->
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import UserInfo from '@/components/UserInfo.vue';
  import CommitList from '@/components/CommitList.vue';

  const user: any = reactive({
    avatar: 'https://avatars.githubusercontent.com/u/53055051?v=4',
    email: '',
    id: 'kyh196201',
    name: 'Seungwoo Kim',
    homePage: 'https://github.com/kyh196201',
  });

  const commitList = ref<any[]>([
    {
      createAt: '2023-02-16T09:55:13Z',
      message: 'api 테스트 중',
      url: 'https://api.github.com/repos/JEONMINJU/jmju_personal-project/commits/040de0e4325c6b69921518f9b533ee69354d92b2',
      sha: '040de0e4325c6b69921518f9b533ee69354d92b2',
    },
    {
      createAt: '2023-02-16T09:55:13Z',
      message: "Merge branch 'main' of https://github.com/JEONMINJU/jmju_personal-project",
      url: 'https://api.github.com/repos/JEONMINJU/jmju_personal-project/commits/e1eeef8820b8504a27a2e8d1c937cabdc91c304e',
      sha: 'e1eeef8820b8504a27a2e8d1c937cabdc91c304e',
    },
    {
      createAt: '2023-02-12T12:15:28Z',
      message: 'moment > dayjs 변경',
      url: 'https://api.github.com/repos/JEONMINJU/jmju_personal-project/commits/9c25e7ae74fa58b8051bb457e6254c62702b6da4',
      sha: '9c25e7ae74fa58b8051bb457e6254c62702b6da4',
    },
    {
      createAt: '2023-02-08T06:41:29Z',
      message: 'push test',
      url: 'https://api.github.com/repos/JEONMINJU/jmju_personal-project/commits/f934cf9b509206cc82e1886992cf411f7a7bccda',
      sha: 'f934cf9b509206cc82e1886992cf411f7a7bccda',
    },
    {
      createAt: '2023-02-06T07:44:35Z',
      message: 'search bar reset button add',
      url: 'https://api.github.com/repos/JEONMINJU/jmju_personal-project/commits/3feb20381fafc36f8930b0064b3fa8c7c8d62bdb',
      sha: '3feb20381fafc36f8930b0064b3fa8c7c8d62bdb',
    },
  ]);

  // TODO: header style change
  // background: rgb(255, 232, 74);
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
      padding: 1rem;
      border-radius: 1rem;
      background-color: $white;
      box-shadow: $box-shadow;
      margin-bottom: 1rem;

      .commit-box {
        &__date {
          display: inline-block;
          font-size: 1.4rem;
          margin-bottom: 1rem;
        }

        &__list {
          font-size: 1.6rem;
        }
      }
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
