import type { GithubCommit } from '@/api';

interface CommitType {
  createAt: string;
  message: string;
  url: string;
  sha: string;
}

export default class Commit implements CommitType {
  createAt = '';
  message = '';
  url = '';
  sha = '';

  constructor(createAt: string, commitResponse: GithubCommit) {
    this.createAt = createAt;

    const { message, url, sha } = commitResponse;

    this.message = message;
    this.url = url;
    this.sha = sha;
  }
}
