<template>
  <div class="layout">
    <!-- TODO: 컴포넌트로 분리 -->
    <header class="header">
      <!-- TODO: 로고 추가 -->
      <h1 class="header__title">
        <router-link to="/">
          <font-awesome-icon icon="fa-brands fa-github" size="lg" />
          깃허브 잔디 심기
        </router-link>
      </h1>
    </header>

    <main class="main">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
  .layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: $layout-color;
  }

  .header {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    padding: 1.6rem;
    box-shadow: 0px 1px 8px -3px rgb(31 24 24 / 23%);
    -webkit-box-shadow: 0px 1px 8px -3px rgb(31 24 24 / 23%);
    -moz-box-shadow: 0px 1px 8px -3px rgb(31 24 24 / 23%);

    &__title {
      font-size: 2rem;
    }
  }

  .main {
    overflow-y: auto;
    flex: 1 1 auto;
    height: 0px;
  }
</style>
