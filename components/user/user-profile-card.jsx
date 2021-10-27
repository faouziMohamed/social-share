import { useUser } from '../../lib/hooks';
import { disconnectUser } from '../../lib/utils/lib.utils';
import style from '../../sass/app.module.scss';
import MenuRowItem from '../context-menu/row-item';

export default function UserProfileCard() {
  const [, { mutate }] = useUser();
  return (
    <div className={style.user_menu} aria-label='menu'>
      <div className={style.user_menu_row_item}>
        <MenuRowItem link='/app/profile' detailsText='See your profile' user />
      </div>
      <nav>
        <ul>
          <li className={style.menu_row_item}>
            <MenuRowItem
              textContent='Account'
              icon='fas fa-user-alt'
              detailsText='Edit account details'
              darkerFont
              link='/account'
            />
          </li>
          <li className={style.menu_row_item}>
            <MenuRowItem
              textContent='Setting'
              icon='fas fa-cog'
              detailsText='Edit account preferences'
              darkerFont
              link='/setting'
            />
          </li>
          <li className={style.menu_row_item}>
            <button
              onClick={() => disconnectUser(mutate)}
              className={style.action_logout}
            >
              <span className={style.link_action_text}>Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
