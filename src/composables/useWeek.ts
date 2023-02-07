import { computed, ref } from 'vue';
import { getStartOfWeek, getEndOfWeek, formatDate, addDate } from '@/lib/date';

export interface Week {
  start: Date;
  end: Date;
}

export default function useWeek() {
  const week = ref<Week>(createWeek());

  // 화면에 렌더링할 시작일 ~ 종료일 문자열
  const weekString = computed(() => {
    const { start, end } = week.value;
    const startDate = formatDate(start, 'DATE');
    const endDate = formatDate(end, 'DATE');

    return `${startDate} ~ ${endDate}`;
  });

  function createWeek(): Week {
    return {
      start: getStartOfWeek(),
      end: getEndOfWeek(),
    };
  }

  function moveToCurrentWeek() {
    week.value = createWeek();
  }

  // 이전 주차로 이동
  function moveToPrevWeek() {
    const { start, end } = week.value;

    const newWeek: Week = {
      start: addDate(start, -7),
      end: addDate(end, -7),
    };

    week.value = newWeek;
  }

  // 다음 주차로 이동
  function moveToNextWeek() {
    const { start, end } = week.value;

    const newWeek: Week = {
      start: addDate(start, 7),
      end: addDate(end, 7),
    };

    week.value = newWeek;
  }

  return {
    week,
    moveToCurrentWeek,
    moveToPrevWeek,
    moveToNextWeek,
    weekString,
  };
}
