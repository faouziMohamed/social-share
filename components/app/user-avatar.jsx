import Image from 'next/image';
import Link from 'next/link';

import style from '../../sass/app.module.scss';

export default function UserAvatar({ user, size = 'normal' }) {
  const sizeClass = size === 'normal' ? style.avatar : style.avatarSmall;
  return (
    <Link href={`/profil/${user.username}`}>
      <a className={`${style.post_owner_avatar_link} ${sizeClass}`}>
        <Image
          src={user.avatar}
          alt={`${user.username} profil picture`}
          className={style.post_owner_img}
          layout='fill'
        />
      </a>
    </Link>
  );
}
