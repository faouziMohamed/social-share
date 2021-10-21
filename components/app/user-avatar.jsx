import Image from 'next/image';

import style from '../../sass/app.module.scss';

export default function UserAvatar({ user }) {
  return (
    <a
      href={`/profil/${user.username}`}
      className={style.post_owner_avatar_link}
    >
      <Image
        src={user.avatar}
        alt={`${user.username} profil picture`}
        className={style.post_owner_img}
        layout='fill'
      />
    </a>
  );
}
