import Image from 'next/image';

import { useUser } from '../../lib/hooks';
import style from '../../sass/app.module.scss';
import FuturaSpinner from '../spinners/futura';
import LeftPane from './LeftPane';

export default function AppLayout({ children }) {
  const [user, { loading }] = useUser();

  if (loading) return <FuturaSpinner />;

  return (
    <div className={`root ${style.root}`}>
      <div className={style.root_content}>
        <LeftPane />
        <div className={style.main_content}>
          <div className={style.main_page__navbar}>
            <div className={style.burger_menu}>
              <input
                type='checkbox'
                id='menu-toggler'
                className={style.burger_menu__checkbox}
              />
              <label
                htmlFor='menu-toggler'
                className={style.burger_menu__label}
              ></label>
            </div>

            <ul className={style.top_navbar}>
              <li className={style.top_navbar__item}>
                <button
                  className={`${style.top_navbar__btn} ${style.lang_btn}`}
                >
                  <Image
                    src='/images/icons/english.svg'
                    className={style.lang_flag}
                    alt='English flag'
                    width='50'
                    height='50'
                  />
                  <div
                    className={`${style.lang_dropdown} hidden`}
                    aria-hidden='true'
                  >
                    <ul className={style.lang_list}>
                      <li
                        className={style.lang_item}
                        tabIndex='0'
                        data-lang='en'
                      >
                        <Image
                          src='/images/icons/english.svg'
                          alt='English'
                          className={style.lang_img}
                          data-lang='en'
                          layout='fill'
                        />
                        <span className='lang_text'>English</span>
                      </li>
                      <li
                        className={style.lang_item}
                        tabIndex='0'
                        data-lang='fr'
                      >
                        <Image
                          src='/images/icons/french.svg'
                          alt='French'
                          className={style.lang_img}
                          data-lang='fr'
                          layout='fill'
                        />
                        <span className='lang_text'>French</span>
                      </li>
                    </ul>
                  </div>
                </button>
              </li>
              <li className={style.top_navbar__item}>
                <button
                  className={`${style.top_navbar__btn} ${style.notif_btn}`}
                >
                  <i className='fas fa-bell fa-1x'> </i>
                </button>
              </li>
              <li className={style.top_navbar__item}>
                <button
                  className={`${style.top_navbar__btn} ${style.profil_btn}`}
                >
                  <Image
                    alt='User profile picture'
                    className={style.user_profil_thumb}
                    src='/images/users/u-01.svg'
                    title="Faouzi Mohamed's profile picture"
                    layout='fill'
                  />
                  <div
                    className={`${style.user_menu_card} hidden`}
                    aria-label='menu'
                  >
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
                          <a
                            href='/myaccount'
                            className={style.action_item_link}
                          >
                            <i className='far fa-user-alt'> </i>
                            <span className={style.link_action_text}>
                              Account
                            </span>
                          </a>
                        </li>
                        <li className='action_item'>
                          <a href='/notifs' className={style.action_item_link}>
                            <i className='fas fa-bell'> </i>
                            <span className={style.link_action_text}>
                              Setting
                            </span>
                          </a>
                        </li>
                        <li className={style.action_item}>
                          <a
                            href='/logout'
                            className='action_item_link action_logout'
                          >
                            <span className={style.link_action_text}>
                              Logout
                            </span>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </button>
              </li>
            </ul>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
