import { ref, unref, type Ref } from 'vue';
import { fetchUser as requestUser } from '@/api';
import type { FetchState } from '@/constants/settings';
import type { User } from '@/interfaces/user';

export default function useUser(id: string | Ref<string>) {
  const fetchState = ref<FetchState>('wait');

  const userId = unref(id);

  const user = ref<User | null>(null);

  const fetchUser = async function fetchUser() {
    try {
      fetchState.value = 'loading';

      user.value = await requestUser(userId);

      fetchState.value = 'success';
    } catch (error) {
      console.error('fetchUser has error', error);
      fetchState.value = 'failed';
    }
  };

  return {
    fetchState,

    user,
    fetchUser,
  };
}
