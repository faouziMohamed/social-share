import Link from 'next/link';
import { useRouter } from 'next/router';

import { useUser } from '../../lib/hooks';
import style from '../../sass/profile.module.scss';

export function ProfileFoot() {
  const [curUser] = useUser();
  const router = useRouter();
  const { username } = router.query;
  const [user] = useUser(username);
  return (
    <div className={style.profile_foot}>
      <div className={style.profile_tabs}>
        <Link href={`/profile/${user.username}`}>
          <a className={`${style.profile_tablink} ${style.active_tab}`}>
            Posts
          </a>
        </Link>
        <Link href={`/profile/${user.username}/about`}>
          <a className={style.profile_tablink}>About</a>
        </Link>
      </div>

      <div className={style.profile_tabs}>
        {username === curUser.username ? (
          <Link href={`/profile/${user.username}/edit`}>
            <a className={style.profile_tablink}>Edit</a>
          </Link>
        ) : (
          <>
            <Link href={`/profile/${user.username}/add`}>
              <a className={style.profile_tablink}>Add Friend</a>
            </Link>
            <Link href={`/profile/${user.username}/follow`}>
              <a className={style.profile_tablink}>
                {user?.following ? 'Unfollow' : 'Follow'}
              </a>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
