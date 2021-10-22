import Link from 'next/link';

import style from '../../../sass/app.module.scss';
import UserAvatar from '../user-avatar';

export default function PostTopDetails({ metadata }) {
  return (
    <div className={style.post_top_details}>
      <div className={style.post_data}>
        <AuthorAvatar metadata={metadata} />
        <AuthorDetails user={metadata}>
          <small className={style.post_date}>
            <time>{metadata.date}</time>
          </small>
        </AuthorDetails>
      </div>

      <div className={style.post_options}>
        <PostPreOptionBtns />
        <PostMenu />
      </div>
    </div>
  );
}

function PostPreOptionBtns() {
  return (
    <div className={style.post_pre_options_btn}>
      <button className={`${style.share_btn}`}>
        <i className='fas fa-share-alt' />
        <span className={style.option_item_text}>Share</span>
      </button>
      <button className={style.open_optionBtn}>
        <i className='fas fa-ellipsis-h' />
      </button>
    </div>
  );
}

function PostMenu() {
  return (
    <div className={style.options_container}>
      <button className={style.option_item}>
        <i className='fas fa-trash-alt' />
        <span className={style.option_item_text}> Delete</span>
      </button>
      <button className={style.option_item}>
        <i className='fas fa-edit' />
        <span className={style.option_item_text}> Edit</span>
      </button>
      <button className={style.option_item}>
        <i className='fas fa-share-alt' />
        <span className={style.option_item_text}> Share</span>
      </button>
      <button className={style.option_item}>
        <i className='fas fa-bookmark' />
        <span className={style.option_item_text}> Bookmark</span>
      </button>
    </div>
  );
}

export function AuthorDetails({ user, children }) {
  return (
    <div className={style.post_details}>
      <Link href={`/profil/${user.username}`}>
        <a className={style.post_owner_name}>
          {`${user.firstname} ${user.lastname}`}
        </a>
      </Link>
      {children}
    </div>
  );
}

function AuthorAvatar({ metadata }) {
  return (
    <div className={style.post_owner_avatar}>
      <UserAvatar user={metadata} />
    </div>
  );
}
