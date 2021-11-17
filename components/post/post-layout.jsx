import { useState } from 'react';

import { useUser } from '../../lib/hooks';
import { golfyNumber } from '../../lib/utils/lib.utils';
import style from '../../sass/app.module.scss';
import FormRowField from '../forms/form-rowField';
import UserAvatar from '../user/user-avatar';
import PostActionBtns from './post-action-btns';
import PostBody from './post-body';
import PostTopDetails from './post-top-details';

export default function Post({ post, wide = false }) {
  const { stats: s, body: postBody, metadata, reactions } = post;
  const { statsHooks, ...stats } = useStats(s);
  const pActionProps = { statsHooks, reactions, metadata };
  return (
    <div className={style.post_wrapper}>
      <div className={`${style.post} ${wide && style.post_wide}`}>
        <PostTopDetails metadata={metadata} />
        <div className={style.post_content}>
          <PostBody body={postBody} />
          <PostStats stats={stats} />
          <PostActionBtns {...pActionProps} />
          <PostComments />
        </div>
      </div>
    </div>
  );
}

function PostComments() {
  const [user] = useUser();
  return (
    <div className={style.post_comments}>
      <div className={style.comment_container}>
        <div className={style.comment}>
          <div className={style.comment_prompt}>
            <UserAvatar user={user} size='small' />
            <FormRowField
              type='text'
              name='feed'
              labelIcon=''
              rowIcon='fas fa-feather'
              labelText={`Say something about this post, ${user.firstname}`}
              model='article'
            />
          </div>
        </div>
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
    statsHooks: {
      like: [likeCount, setLikeCount],
      dislike: [disLikeCount, setDisLikeCount],
      comment: [commentsCount, setCommentsCount],
      share: [sharesCount, setSharesCount],
    },
  };
}
