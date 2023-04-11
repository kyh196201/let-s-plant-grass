import axios from 'axios';
import { Octokit } from 'octokit';
import Commit from '@/interfaces/commit';
import { getCommitsFromResponse } from '@/utils/github';
import { createCachedFunction } from '@/utils/cache';
import type { User } from '@/interfaces/user';
import type { GithubEvent, GithubRepositoryCommit } from '@/types/github.types';

//#region axios instance
const instance = axios.create({
  baseURL: 'https://api.github.com',
  // timeout: 5000,
  headers: {
    Accept: 'application/vnd.github.v3+json',
    Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
  },
});
//#endregion

//#region octokit instance
// https://github.com/octokit/core.js#readme
const octokit = new Octokit({
  auth: import.meta.env.VITE_GITHUB_TOKEN,
});
//#endregion

// #region apis
// 저장소 커밋 목록 조회하기
const getRepositoryCommits = async function getRepositoryCommits(userName: string, repoName: string) {
  // https://api.github.com/repos/user name/repository name/commits
  const url = `/repos/${userName}/${repoName}/commits`;

  const response = await instance.get(url, {
    params: {
      author: userName,
    },
  });

  return response.data as GithubRepositoryCommit[];
};

// 저장소 커밋 목록 조회하는 함수에 캐싱 적용
const getCachedRepositoryCommits = createCachedFunction(getRepositoryCommits);

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
  const events = await fetchEvents({ username, page, perPage });

  // const pushEvents = events.filter(isPushEvent);
  const pushEvents: GithubEvent[] = [];
  const createEvents: GithubEvent[] = [];

  for (const event of events) {
    if (event.type === 'PushEvent') {
      pushEvents.push(event);
    } else if (event.type === 'CreateEvent') {
      createEvents.push(event);
    }
  }

  // push events가 있을 경우
  if (pushEvents.length) {
    const commits = getCommitsFromResponse(pushEvents);

    return commits;
  }

  // push events가 없을 경우 create events를 통해서 커밋 목록을 조회합니다.
  const repos = new Set<string>();

  for (const event of createEvents) {
    const repo = event.repo;

    if (!repos.has(repo.name)) {
      repos.add(repo.name);
    }
  }

  // promises
  const promises = [...repos].map((repo) => {
    const [author, repoName] = repo.split('/');

    return getCachedRepositoryCommits(author, repoName);
  });

  const commitResponses = (await Promise.all(promises)).flat();

  const commits = commitResponses.map((response) => {
    const {
      sha,
      commit: { author, message },
    } = response;

    return new Commit(author.date, {
      message,
      sha,
      url: '',
    });
  });

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
// #endregion

export default {};
