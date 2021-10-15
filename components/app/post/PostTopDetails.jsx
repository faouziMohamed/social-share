import Image from 'next/image';
import Link from 'next/link';

import style from '../../../sass/app.module.scss';

export default function PostTopDetails({ user }) {
  return (
    <div className={style.post_top_details}>
      <div className={style.post_data}>
        <AuthorAvatar user={user} />
        <AuthorDetails user={user} />
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

function AuthorDetails({ user }) {
  return (
    <div className={style.post_details}>
      <Link href={`/profil/${user.username}`}>
        <a className={style.post_owner_name}>
          {`${user.firstname} ${user.lastname}`}
        </a>
      </Link>
      <small className={style.post_date}>
        <time dateTime={'12/12/2013 14h33'}>12/12/2013</time>
      </small>
    </div>
  );
}

function AuthorAvatar({ user }) {
  return (
    <div className={style.post_owner_avatar}>
      <a
        href={`/profil/${user.username}`}
        className={style.post_owner_avatar_link}
      >
        <Image
          src='/images/users/u-01.svg'
          alt={`${user.username} profil picture`}
          className={style.post_owner_img}
          layout='fill'
        />
      </a>
    </div>
  );
}
