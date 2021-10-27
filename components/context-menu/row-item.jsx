import Link from 'next/link';

import { useUser } from '../../lib/hooks';
import style from '../../sass/context-menu.module.scss';
import UserAvatar from '../user/user-avatar';
import UserBadge from '../user/user-badge';

export default function MenuRowItem({
  textContent = '',
  icon = '',
  detailsText = '',
  darkerFont = false,
  lighterChildren = false,
  link = '',
  user = false,
}) {
  const props = { textContent, icon, detailsText, darkerFont, lighterChildren };
  const Item = user ? () => <UserRow {...props} /> : () => <Row {...props} />;
  return (
    <>
      {link ? (
        <Link href={link}>
          <a className={style.row_link_item}>
            <Item />
          </a>
        </Link>
      ) : (
        <Item />
      )}
    </>
  );
}

function Row({ textContent, icon, detailsText, darkerFont, lighterChildren }) {
  let cls = style.row_textContent;
  cls += darkerFont ? ` ${style.darkerFont}` : '';
  cls += lighterChildren ? ` ${style.lighterChildren}` : '';
  return (
    <div className={style.row_item}>
      <i className={icon} />
      <div className={style.row_textContent_parent}>
        <span className={cls}>{textContent}</span>
        <small className={style.row_detailsText}>{detailsText}</small>
      </div>
    </div>
  );
}

function UserRow({ detailsText }) {
  const [user] = useUser();
  return (
    <div className={style.row_item}>
      <UserAvatar user={user} removeLink />
      <UserBadge user={user} removeLink darkerFont>
        <small className={style.lighter}>{detailsText}</small>
      </UserBadge>
    </div>
  );
}
