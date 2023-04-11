// TODO: 브라우저 내부에 캐싱된 데이터를 저장할 수 있는 방법 필요
/**
 * 지정한 함수를 캐싱하는 함수를 생성합니다.
 * 캐싱된 데이터는 24시간 뒤에 만료됩니다.
 *
 * @param fetchFn 캐싱할 함수
 * @returns 캐시된 데이터를 반환하는 함수
 */
function createCachedFunction<T>(fetchFn: (...args: any[]) => Promise<T>): (...args: any[]) => Promise<T> {
  // 캐시된 데이터를 저장하는 Map 객체
  const cache = new Map<string, { data: T; expireAt: Date }>();

  return async (...args: any[]) => {
    // TODO: 키 생성 로직 수정
    // 인자들을 JSON 문자열로 변환하여 캐시 키를 생성합니다.
    const key = JSON.stringify(Array.prototype.slice.call(args));

    // 캐시된 데이터가 있는지 확인합니다.
    const cached = cache.get(key);

    // 캐시된 데이터가 있고, 만료 기간이 지나지 않았다면 캐시된 데이터를 반환합니다.
    if (cached !== undefined && cached.expireAt > new Date()) {
      return cached.data;
    }

    // 캐시된 데이터가 없거나 만료된 경우 함수를 호출하여 데이터를 생성합니다.
    const result = await fetchFn(...args);

    // 데이터를 캐시에 저장합니다.
    const expireAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24시간 뒤로 설정
    cache.set(key, { data: result, expireAt });

    // 생성된 데이터를 반환합니다.
    return result;
  };
}

export { createCachedFunction };
