<template>
  <div class="layout">
    <!-- TODO: 컴포넌트로 분리 -->
    <header class="header">
      <!-- TODO: 로고 추가 -->
      <h1 class="header__title">
        <router-link to="/">깃허브 잔디 심기 🌱</router-link>
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
  }

  .header {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    padding: 1rem;
    background-color: $header-color;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px;

    &__title {
      font-size: 2.4rem;
    }
  }

  .main {
    overflow-y: auto;
    flex: 1 1 auto;
    height: 0px;
  }
</style>
