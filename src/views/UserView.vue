<template>
  <div class="user-view">
    <!-- 사용자 정보 -->
    <section class="user-view__user-info">
      <div class="user-info">user-info</div>
      <nav class="user-view__user-links">
        <a href="#" target="_blank"> 깃허브 주소 </a>
      </nav>
    </section>

    <!-- 잔디 수 & 벌금 요약 -->
    <section class="user-view__penalty">
      <em> 2,000 </em>
      <span>벌금</span>
    </section>

    <!-- 커밋 목록 -->
    <section class="user-view__contents">
      <div class="user-view__date-range">date range</div>

      <div class="user-view__commits">
        <ul>
          <li class="user-view__commit-box">
            <time datetime="">2023년 3월 12일</time>
            <ul>
              <li>커밋 목록 추가하세요</li>
            </ul>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss"></style>
