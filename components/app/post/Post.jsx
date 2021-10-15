import style from '../../../sass/app.module.scss';
import PostBody from './PostBody';
import PostTopDetails from './PostTopDetails';

export default function Post({ user }) {
  return (
    <div className={style.post_wrapper}>
      <div className={style.post}>
        <PostTopDetails user={user} />
        <div className={style.post_content}>
          <PostBody />
          <PostStats />
          <PostReaction />
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

function PostReaction() {
  return (
    <div className={style.post_reactions}>
      <button className={style.reaction_btn}>
        <i className='fal fa-thumbs-up' />
        <span className={style.reaction_text}>Like</span>
      </button>
      <button className={style.reaction_btn}>
        <i className='fal fa-thumbs-down' />
        <span className={style.reaction_text}>Dislike</span>
      </button>

      <button className={style.reaction_btn}>
        <i className='fal fa-comment-alt' />
        <span className={style.reaction_text}>Comment</span>
      </button>
    </div>
  );
}

function PostStats() {
  return (
    <div className={style.post_stats}>
      <div className={style.reaction_count}>
        <span className={style.stats_count}>
          <i className='fal fa-thumbs-up' />
          <span className={style.stats_count}>7</span>
        </span>
        <span className={style.stats_count}>
          <i className='fal fa-thumbs-down' />
          <span className={style.stats_count}>7</span>
        </span>
      </div>

      <span className={style.stats_count}>
        <i className='fal fa-comment-alt' />
        <span className={style.stats_count}>7</span>
      </span>
    </div>
  );
}
