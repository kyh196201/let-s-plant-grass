import { ref, unref, type Ref } from 'vue';
import { fetchCommits as requestCommits } from '@/api';
import type { FetchState } from '@/constants/settings';
import type Commit from '@/interfaces/commit';

export default function useCommits(id: string | Ref<string>) {
  const fetchState = ref<FetchState>('wait');

  const userId = unref(id);

  const commits = ref<Commit[]>([]);

  const fetchCommits = async function fetchCommits() {
    try {
      fetchState.value = 'loading';

      commits.value = await requestCommits({
        username: userId,
        page: 1,
        perPage: 100,
      });

      fetchState.value = 'success';
    } catch (error) {
      console.error('fetchCommits has error', error);
      fetchState.value = 'failed';
    }
  };

  return {
    fetchState,
    commits,
    fetchCommits,
  };
}
