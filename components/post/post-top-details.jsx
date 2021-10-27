import { useState } from 'react';

import style from '../../sass/app.module.scss';
import UserAvatar from '../user/user-avatar';
import UserBadge from '../user/user-badge';

export default function PostTopDetails({ metadata }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div className={style.post_top_details}>
      <div className={style.post_data}>
        <AuthorAvatar metadata={metadata} />
        <UserBadge user={metadata}>
          <small className={style.post_date}>
            <time>{metadata.date}</time>
          </small>
        </UserBadge>
      </div>

      <div className={style.post_options}>
        <div className={style.post_pre_options_btn}>
          <button className={`${style.share_btn}`}>
            <i className='fas fa-share-alt' />
            <span className={style.option_item_text}>Share</span>
          </button>
          <button className={style.open_optionBtn} onClick={toggle}>
            <i className='fas fa-ellipsis-h' />
          </button>
        </div>
        {isOpen && <PostMenu onClick={toggle} />}
      </div>
    </div>
  );
}

function PostMenu({ onClick }) {
  return (
    <div className={style.options_container}>
      <button className={style.option_item} onClick={onClick}>
        <i className='fas fa-trash-alt' />
        <span className={style.option_item_text}> Delete</span>
      </button>
      <button className={style.option_item} onClick={onClick}>
        <i className='fas fa-edit' />
        <span className={style.option_item_text}> Edit</span>
      </button>
      <button className={style.option_item} onClick={onClick}>
        <i className='fas fa-share-alt' />
        <span className={style.option_item_text}> Share</span>
      </button>
      <button className={style.option_item} onClick={onClick}>
        <i className='fas fa-bookmark' />
        <span className={style.option_item_text}> Bookmark</span>
      </button>
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
