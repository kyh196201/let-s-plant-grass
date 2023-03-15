<template>
  <article
    class="commit-box"
    :class="{
      'commit-box--is-open': isOpen,
    }"
  >
    <button type="button" class="commit-box__panel" @click="isOpen = !isOpen">
      <time class="commit-box__date" :datetime="isoDate">
        {{ date }}
      </time>

      <p class="commit-box__count">
        <em> {{ commits.length }} </em>개
      </p>
    </button>

    <div ref="innerRef" class="commit-box__inner">
      <CommitList class="commit-box__list" :commits="commits" />
    </div>
  </article>
</template>

<script setup lang="ts">
  import { computed, ref, watch } from 'vue';
  import { formatDate, toISOString } from '@/lib/date';

  import CommitList from '@/components/CommitList.vue';
  import type Commit from '@/interfaces/commit';

  const props = defineProps<{
    date: string;
    commits: Commit[];
  }>();

  const date = computed(() => {
    return formatDate(props.date, 'DATE_STRING');
  });

  const isoDate = computed(() => toISOString(props.date));

  const isOpen = ref(false);

  //#region template refs
  const innerRef = ref<HTMLDivElement>();
  //#endregion

  watch(isOpen, (newValue) => {
    if (!innerRef.value) return;

    if (newValue) {
      innerRef.value.style.maxHeight = `${innerRef.value.scrollHeight}px`;
      return;
    }

    innerRef.value.style.maxHeight = '0px';
  });
</script>

<style scoped lang="scss">
  .commit-box {
    box-shadow: $box-shadow;
    border-radius: 1rem;
    overflow: hidden;

    &__panel {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      padding: 1rem 3.35rem 1rem 1rem;
      width: 100%;
      background-color: $greyeee;
      transition: background-color 0.4s linear;

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        right: 1rem;
        width: 1.35rem;
        height: 1.2rem;
        margin-top: -0.6rem;
        background: url('@/assets/images/icons/ic_arrow_down.svg') no-repeat center / 100% auto;
        cursor: pointer;
      }
    }

    &__inner {
      overflow: hidden;
      max-height: 0;
      background-color: $white;
      transition: max-height 0.2s ease-out;
    }

    &__date {
      display: inline-block;
      font-size: 1.4rem;
    }

    &__count {
      font-weight: bold;
    }

    &__list {
      margin: 1rem;
    }

    &--is-open {
      .commit-box {
        &__panel {
          background-color: $greyccc;

          &::after {
            transform: rotate(180deg);
          }
        }
      }
    }
  }
</style>
