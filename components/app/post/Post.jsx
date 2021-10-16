import style from '../../../sass/app.module.scss';
import PostBody from './PostBody';
import PostTopDetails from './PostTopDetails';

export default function Post({ user, post }) {
  const { stats, body } = post;

  return (
    <div className={style.post_wrapper}>
      <div className={style.post}>
        <PostTopDetails user={user} />
        <div className={style.post_content}>
          <PostBody body={body} />
          <PostStats stats={stats} />
          <PostActionBtns />
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

function PostActionBtns() {
  const buttons = [
    {
      icon: 'fal fa-thumbs-up',
      text: 'Like',
    },
    {
      icon: 'fal fa-thumbs-down',
      text: 'Dislike',
    },
    {
      icon: 'fal fa-comment-alt',
      text: 'Comment',
    },
  ];

  return (
    <div className={style.post_reactions}>
      {buttons.map((btn, index) => (
        <button className={style.reaction_btn} key={`${btn.text}-${index}`}>
          <i className={`${btn.icon} ${style.reaction_icon}`} />
          <span className={style.reaction_text}>{btn.text}</span>{' '}
        </button>
      ))}
    </div>
  );
}

function PostStats({ stats }) {
  const statsItems = useStats(stats);

  return (
    <div className={style.post_stats}>
      <AddStats stats={statsItems.reactions} />
      <AddStats stats={statsItems.actions} />
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
  return {
    reactions: [
      {
        icon: 'fad fa-thumbs-up',
        text: 'Like',
        count: stats.likes,
        cls: style.likes,
      },
      {
        icon: 'fad fa-thumbs-down',
        text: 'Dislike',
        count: stats.dislikes,
        cls: style.dislikes,
      },
    ],
    actions: [
      {
        icon: 'fad fa-comment-alt',
        text: 'Comment',
        count: stats.comments,
        cls: style.comments,
      },
      {
        icon: 'fad fa-share-alt',
        text: 'Share',
        count: stats.shares,
        cls: style.shares,
      },
    ],
  };
}
