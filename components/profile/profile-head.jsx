import Image from 'next/image';
import { useRouter } from 'next/router';

import { useUser } from '../../lib/hooks';
import style from '../../sass/profile.module.scss';

export function ProfileHead() {
  const router = useRouter();
  const { username } = router.query;
  const [user] = useUser(username);

  return (
    <>
      <div className={style.profile_head}>
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
        <div className={style.user_profile_head}>
          <div className={style.user_profile_details}>
            <div className={style.profile_head_img}>
              <Image
                src='/images/users/u-1.png'
                alt='user'
                className={style.user_head_profile_picture}
                layout='fill'
              />
            </div>
            <div className={style.profile_user_name}>
              <h1>
                {user.firstname} {user.lastname}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
