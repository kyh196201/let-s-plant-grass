import { Octokit } from 'octokit';
import { getCommitsFromResponse, isPushEvent } from '@/utils/github';
import type { User } from '@/interfaces/user';

//#region octokit instance
// https://github.com/octokit/core.js#readme
const octokit = new Octokit({
  auth: import.meta.env.VITE_GITHUB_TOKEN,
});
//#endregion

interface GithubCommit {
  author: {
    email: string;
    name: string;
  };
  message: string;
  sha: string;
  url: string;
}

interface GithubEvent {
  type: 'PushEvent' | 'WatchEvent';
  created_at: string;
  payload: {
    commits: GithubCommit[];
    size: number;
  };
}

// 사용자 이벤트 조회하기
export const fetchEvents = async function fetchEvents({
  username,
  page = 1,
  perPage = 100,
}: {
  username: string;
  page?: number;
  perPage?: number;
}) {
  const response = await octokit.request('GET /users/{username}/events{?per_page,page}', {
    username,
    page,
    per_page: perPage,
  });

  if (response.status !== 200) {
    // TODO: handle error
    throw new Error('api service error 😥..');
  }

  return response.data as GithubEvent[];
};

// 사용자 커밋 목록 조회하기
export const fetchCommits = async function fetchUserCommits({
  username,
  page = 1,
  perPage = 100,
}: {
  username: string;
  page?: number;
  perPage?: number;
}) {
  const response = await fetchEvents({ username, page, perPage });

  const pushEvents = response.filter(isPushEvent);

  const commits = getCommitsFromResponse(pushEvents);

  return commits;
};

/**
 * 사용자 정보 조회하기
 *
 * @param username 사용자 id
 * @returns 사용자 정보
 */
export const fetchUser = async function fetchUser(username: string) {
  const response = await octokit.request('GET /users/{username}', {
    username,
  });

  if (response.status !== 200) {
    // TODO: handle error
    throw new Error('api service error 😥..');
  }

  const { data } = response;

  const user: User = {
    avatar: data.avatar_url,
    email: data.email ?? '',
    id: data.login,
    name: data.name ?? '',
    homePage: data.html_url,
  };

  return user;
};

export type { GithubCommit, GithubEvent };

export default {};
