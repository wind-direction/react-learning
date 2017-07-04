import { SELECT_SUBREDDIT, INVALIDATE_SUBREDDIT } from './ajaxActionTypes';

// 选择要显示的subReddit
export function selectSubreddit(subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit
  }
}

// 按"刷新"按钮来更新它：
export function invalidatesubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  }
}

