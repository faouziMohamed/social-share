import Image from 'next/image';

import style from '../../sass/app.module.scss';
import BurgerMenu from './BurgerMenu';

export function NavBar({ burgerMenuPros, user }) {
  return (
    <div className={style.main_page__navbar}>
      <BurgerMenu {...burgerMenuPros} />

      <ul className={style.top_navbar}>
        <li className={style.top_navbar__item}>
          <NotificationButton />
        </li>
        <li className={style.top_navbar__item}>
          <UserProfilButton user={user} />
        </li>
      </ul>
    </div>
  );
}

export function UserProfilButton({ user }) {
  return (
    <button className={`${style.top_navbar__btn} ${style.profil_btn}`}>
      <Image
        alt='User profile picture'
        className={style.user_profil_thumb}
        src='/images/users/u-01.svg'
        title="Faouzi Mohamed's profile picture"
        layout='fill'
      />
      <UserProfilCard user={user} />
    </button>
  );
}

export function NotificationButton() {
  return (
    <button className={`${style.top_navbar__btn} ${style.notif_btn}`}>
      <i className='fas fa-bell fa-1x'> </i>
    </button>
  );
}

function UserProfilCard(user) {
  return (
    <div className={`${style.user_menu_card} hidden`} aria-label='menu'>
      <div className={style.user_profile}>
        <figure className={style.user_figure}>
          <div className={style.user_picture}>
            <Image
              src='/images/users/u-01.svg'
              alt='User profile picture'
              className={style.user_picture_img}
              width='138'
              height='138'
            />
          </div>
          <figcaption className={style.user_fullname}>
            {user.firstname} {user.lastname}
          </figcaption>
        </figure>
      </div>
      <nav className={style.user_actions_wrapper}>
        <ul className={style.action_wrapper}>
          <li className={style.action_item}>
            <a href='/myaccount' className={style.action_item_link}>
              <i className='far fa-user-alt'> </i>
              <span className={style.link_action_text}>Account</span>
            </a>
          </li>
          <li className='action_item'>
            <a href='/notifs' className={style.action_item_link}>
              <i className='fas fa-bell'> </i>
              <span className={style.link_action_text}>Setting</span>
            </a>
          </li>
          <li className={style.action_item}>
            <a href='/logout' className='action_item_link action_logout'>
              <span className={style.link_action_text}>Logout</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
