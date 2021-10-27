import Link from 'next/link';

import style from '../../sass/user.module.scss';

export default function UserBadge({
  user,
  children,
  removeLink = false,
  darkerFont = false,
  lighterChildren = false,
}) {
  let cls = style.user_full_name;
  cls += darkerFont ? ` ${style.darkerFont}` : '';
  cls += lighterChildren ? ` ${style.lighterChildren}` : '';
  return (
    <div className={style.user_badge}>
      {removeLink ? (
        <span className={cls}>{`${user.firstname} ${user.lastname}`}</span>
      ) : (
        <Link href={`/profile/${user.username}`}>
          <a className={cls}>{`${user.firstname} ${user.lastname}`}</a>
        </Link>
      )}
      {children}
    </div>
  );
}
