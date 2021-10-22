import { useState } from 'react';

import { golfyNumber } from '../../../lib/utils';
import style from '../../../sass/app.module.scss';
import PostActionBtns from './post-action-btns';
import PostTopDetails from './post-top-details';
import PostBody from './PostBody';

export default function Post({ metadata, post }) {
  const { stats: s, body } = post;
  const { statsSetter, ...stats } = useStats(s);
  return (
    <div className={style.post_wrapper}>
      <div className={style.post}>
        <PostTopDetails metadata={metadata} />
        <div className={style.post_content}>
          <PostBody body={body} />
          <PostStats stats={stats} />
          <PostActionBtns statsSetter={statsSetter} />
          <PostComments />
        </div>
      </div>
    </div>
  );
}

function PostComments() {
  return (
    <div className={style.post_comments}>
      <div className={style.comment_container}>
        <div className={style.comment}>Awesome</div>
      </div>
    </div>
  );
}

function PostStats({ stats }) {
  return (
    <div className={style.post_stats}>
      <AddStats stats={stats.reactions} />
      <AddStats stats={stats.actions} />
    </div>
  );
}

function AddStats({ stats }) {
  return (
    <div className={style.stats}>
      {stats.map((item, index) => (
        <span className={style.stats_count} key={`${item.text}-${index}`}>
          <i className={`${item.icon} ${item.cls}`} />
          <span className={style.stats_count}>{item.count}</span>
        </span>
      ))}
    </div>
  );
}

function useStats(stats) {
  const [likeCount, setLikeCount] = useState(Number(stats.likes) || 0);
  const [disLikeCount, setDisLikeCount] = useState(Number(stats.dislikes) || 0);
  const [commentsCount, setCommentsCount] = useState(
    Number(stats.comments) || 0,
  );
  const [sharesCount, setSharesCount] = useState(Number(stats.shares) || 0);
  return {
    reactions: [
      {
        icon: 'fad fa-thumbs-up',
        text: 'Like',
        count: golfyNumber(likeCount),
        cls: style.likes,
      },
      {
        icon: 'fad fa-thumbs-down',
        text: 'Dislike',
        count: golfyNumber(disLikeCount),
        cls: style.dislikes,
      },
    ],
    actions: [
      {
        icon: 'fad fa-comment-alt',
        text: 'Comment',
        count: golfyNumber(commentsCount),
        cls: style.comments,
      },
      {
        icon: 'fad fa-share-alt',
        text: 'Share',
        count: golfyNumber(sharesCount),
        cls: style.shares,
      },
    ],
    statsSetter: {
      like: [likeCount, setLikeCount],
      dislike: [disLikeCount, setDisLikeCount],
      comment: [commentsCount, setCommentsCount],
      share: [sharesCount, setSharesCount],
    },
  };
}
