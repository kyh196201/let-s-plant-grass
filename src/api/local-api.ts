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
  const response = await fetch(`/local_data/${username}_events.json`);

  return await response.json();
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

export const fetchUser = async function fetchUser(username: string) {
  const response = await fetch(`/local_data/${username}.json`);
  const data = await response.json();

  return {
    avatar: data.avatar_url,
    email: data.email ?? '',
    id: data.login,
    name: data.name ?? '',
    homePage: data.html_url,
  } as User;
};

export type { GithubCommit, GithubEvent };

export default {};
