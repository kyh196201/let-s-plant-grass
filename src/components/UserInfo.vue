<template>
  <div class="user">
    <a :href="user.homePage" target="_blank">
      <figure class="user__avatar">
        <img :src="user.avatar" :alt="user.name" />
      </figure>
    </a>

    <div class="user__info">
      <strong class="user__id">{{ user.id }}</strong>
      <span class="user__name">{{ user.name }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { User } from '@/interfaces/user';

  defineProps<{
    user: User;
  }>();
</script>

<style lang="scss" scoped>
  .user {
    display: flex;
    align-items: center;

    &__avatar {
      overflow: hidden;
      width: 6rem;
      height: 6rem;
      border-radius: 100%;

      img {
        display: block;
        max-width: 100%;
      }
    }

    &__info {
      display: flex;
      flex-direction: column;
      margin-left: 1rem;
    }

    &__id {
      font-size: 1.5rem;
      font-weight: bold;
      font-family: $karla-font;
    }

    &__name {
      font-size: 1.2rem;
      font-weight: 400;
    }
  }
</style>
