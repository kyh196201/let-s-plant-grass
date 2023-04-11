import Commit from '@/interfaces/commit';
import type { GithubEvent } from '@/types/github.types';

/**
 * 깃허브 이벤트 push 이벤트 타입인지 여부 반환
 *
 * @param eventResponse 깃허브 이벤트 response
 * @returns
 */
export const isPushEvent = function isPushEvent(eventResponse: GithubEvent) {
  return eventResponse.type === 'PushEvent';
};

/**
 * 사용자가 작성한 커밋 목록을 반환
 *
 * @param eventResponses 깃허브 사용자 events api를 통해 조회한 response
 * @returns 사용자가 작성한 커밋 목록
 */
export const getCommitsFromResponse = function getCommitsFromResponse(eventResponses: GithubEvent[]): Commit[] {
  const newCommits: Commit[] = [];

  eventResponses.forEach((event) => {
    const { commits } = event.payload;

    commits.forEach((commit) => {
      const newCommit = new Commit(event.created_at, commit);
      newCommits.push(newCommit);
    });
  });

  return newCommits;
};

export default {};
