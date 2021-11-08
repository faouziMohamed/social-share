import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useUser } from '../../lib/hooks';
import style from '../../sass/profile.module.scss';

export function ProfileHead() {
  const router = useRouter();
  const { username } = router.query;
  const [user] = useUser(username);

  return (
    <div className={style.head_wrapper}>
      <div className={style.profile_head}>
        <ProfileCover />
        <div className={style.profile_basics}>
          <div className={style.img_profile_wrapper}>
            <div className={style.user_profile_picture}>
              <Image
                src={user.avatar}
                alt='user'
                className={style.profile_picture}
                layout='fill'
              />
            </div>
          </div>
          <FrontInfo user={user} />
        </div>
      </div>
    </div>
  );
}

function ProfileCover() {
  return (
    <div className={style.profile_cover}>
      <div className={style.cover_img}>
        <Image
          layout='fill'
          src='/images/users/cover/cover-5.jpeg'
          alt='user'
          className={style.cover_picture}
        />
      </div>
    </div>
  );
}

function FrontInfo() {
  const router = useRouter();
  const { username } = router.query;
  const [user] = useUser(username);
  const [curUser] = useUser();
  if (!curUser.following) curUser.following = [];
  return (
    <div className={style.front_info}>
      <div className={style.head_data}>
        <div className={style.profile_user_name}>
          <span>
            {user.firstname} {user.lastname} Random kaka
          </span>
        </div>

        {curUser.username !== username && (
          <div className={style.profile_contact_btn}>
            <button
              className={
                `${style.message_btn} ${style.btn} ` +
                `${style.btn_primary} ${style.contact_btn}`
              }
            >
              <i className='fas fa-envelope' />
              <span className={style.profile_btn_text}>Message</span>
            </button>
            {curUser?.following?.includes(username) ? (
              <>
                <button
                  className={
                    `${style.add_user_btn} ${style.btn} ${style.btn_fill} ` +
                    `${style.btn_primary} ${style.contact_btn}`
                  }
                >
                  <i className='fas fa-user-plus' />
                  <span className={style.profile_btn_text}>Send request</span>
                </button>
                <button
                  className={
                    `${style.follow_user} ${style.btn} ${style.btn_fill} ` +
                    `${style.btn_primary} ${style.contact_btn}`
                  }
                >
                  <i className='fas fa-user-plus' />
                  <span className={style.profile_btn_text}>Follow</span>
                </button>
              </>
            ) : (
              <button
                className={
                  `${style.remove_user_btn} ${style.btn} ${style.btn_fill} ` +
                  `${style.btn_primary} ${style.contact_btn}`
                }
              >
                <i className='fas fa-user-minus' />
                <span className={style.profile_btn_text}>Unfriend</span>
              </button>
            )}
          </div>
        )}
      </div>
      <div className={style.profile_foot}>
        <div className={style.profile_tabs}>
          <Link href={`/profile/${user.username}`}>
            <a className={`${style.profile_tablink} ${style.active_tab}`}>
              <i className='fas fa-user' />
              <span>Profile</span>
            </a>
          </Link>
          <Link href={`/profile/${user.username}/followers`}>
            <a className={style.profile_tablink}>
              <i className='fas fa-users' />
              <span>Followers</span>
            </a>
          </Link>

          <Link href={`/profile/${user.username}/friends`}>
            <a className={style.profile_tablink}>
              <i className='fas fa-user-friends' />
              <span>Friends</span>
            </a>
          </Link>

          {username === curUser.username && (
            <>
              <Link href={`/profile/${user.username}/friend-requests`}>
                <a className={style.profile_tablink}>
                  <i className='fas fa-user-plus' />
                  <span>Friend Requests</span>
                </a>
              </Link>
              <Link href={`/profile/${user.username}/edit`}>
                <a className={style.profile_tablink}>
                  <i className='fas fa-user-edit' />
                  <span>Edit Profile</span>
                </a>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
