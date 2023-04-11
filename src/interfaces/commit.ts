import type { GithubCommit } from '@/types/github.types';

interface CommitType {
  createAt: string;
  message: string;
  url?: string;
  sha: string;
}

type CommitResponse = {
  [key: string]: any;
  message: GithubCommit['message'];
  sha: GithubCommit['sha'];
};

export default class Commit implements CommitType {
  createAt = '';
  message = '';
  url = '';
  sha = '';

  constructor(createAt: string, commitResponse: CommitResponse) {
    this.createAt = createAt;

    const { message, sha } = commitResponse;

    this.message = message;
    this.sha = sha;
  }
}
