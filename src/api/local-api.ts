import type { User } from '@/interfaces/user';
import { Octokit } from 'octokit';

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
const fetchEvents = async function fetchEvents({
  username,
  page,
  perPage = 100,
}: {
  username: string;
  page: number;
  perPage?: number;
}) {
  const response = await fetch('local_data/events.json');

  return await response.json();
};

const fetchUser = async function fetchUser(username: string) {
  const response = await fetch('local_data/user.json');
  const data = await response.json();

  return {
    avatar: data.avatar_url,
    email: data.email ?? '',
    id: data.login,
    name: data.name ?? '',
    homePage: data.html_url,
  } as User;
};

export { fetchEvents, fetchUser };

export type { GithubCommit, GithubEvent };

export default {};
