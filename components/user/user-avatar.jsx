import Image from 'next/image';
import Link from 'next/link';

import style from '../../sass/app.module.scss';

export default function UserAvatar({
  user,
  size = 'normal',
  removeLink = false,
}) {
  const avatarSizeMap = {
    small: style.avatarSmall,
    normal: style.avatarNormal,
    large: style.avatarLarge,
    xlarge: style.avatarXLarge,
  };
  const avatarSize = avatarSizeMap[size] || style.avatar;
  return removeLink ? (
    <span className={`${style.user_avatar} ${avatarSize}`}>
      <Avatar user={user} />
    </span>
  ) : (
    <Link href={`/profile/${user.username}`}>
      <a className={`${style.user_avatar} ${avatarSize}`}>
        <Avatar user={user} />
      </a>
    </Link>
  );
}

function Avatar({ user }) {
  return (
    <Image
      src={user.avatar}
      alt={`${user.username} profile picture`}
      className={style.user_avatar_img}
      layout='fill'
    />
  );
}
