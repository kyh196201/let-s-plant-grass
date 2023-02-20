export const MAX_COMMITS_LENGTH = 5;

//#region fetches
export const FETCH_STATE = {
  WAIT: 'wait',
  SUCCESS: 'success',
  FAILED: 'failed',
  LOADING: 'loading',
} as const;

export type FetchState = (typeof FETCH_STATE)[keyof typeof FETCH_STATE];
//#endregion

export default {};
