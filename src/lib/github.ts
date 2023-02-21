import type { GithubEvent } from '@/api';

/**
 * 깃허브 이벤트 push 이벤트 타입인지 여부 반환
 *
 * @param eventResponse 깃허브 이벤트 response
 * @returns
 */
export const isPushEvent = function isPushEvent(eventResponse: GithubEvent) {
  return eventResponse.type === 'PushEvent';
};

export default {};
