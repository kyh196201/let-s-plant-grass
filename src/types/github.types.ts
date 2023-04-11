// 저장소별 커밋 목록 아이템
interface GithubRepositoryCommit {
  // commit identifier
  sha: string;
  commit: {
    author: {
      // 커밋 생성한 사용자
      name: string;
      // 커밋 생성한 날짜
      date: string;
    };
    // 커밋 메시지
    message: string;
  };
}

// PushEvent에 있는 커밋 목록 아이템
interface GithubEventCommit {
  author: {
    email: string;
    name: string;
  };
  message: string;
  sha: string;
  url: string;
}

interface GithubEvent {
  type: 'PushEvent' | 'WatchEvent' | 'CreateEvent' | 'ForkEvent';
  created_at: string;
  payload: {
    commits: GithubEventCommit[];
    size: number;
  };
  // repository 정보
  repo: {
    id: number;
    name: string; // 아이디/repository 명
  };
}

export type { GithubEventCommit as GithubCommit, GithubRepositoryCommit, GithubEvent };
