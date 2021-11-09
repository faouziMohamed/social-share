import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { useUser } from '../../lib/hooks';
import { golfyNumber } from '../../lib/utils/lib.utils';
import style from '../../sass/profile.module.scss';
import HeadMeta from '../head';
import PostPrompt from '../post/post-prompt';
import FuturaSpinner from '../spinners/futura';
import { ProfileHead } from './profile-head';
import { ProfileNavBar } from './profile-navbar';

export default function HomeLayout({ children, modalOppened }) {
  const [curUser, { loading: loadingCurUser }] = useUser();
  const router = useRouter();

  const { username = '' } = router.query;
  const [user, { loading }] = useUser(encodeURIComponent(username));

  if (loading || loadingCurUser) return <FuturaSpinner />;
  if (!loadingCurUser && !curUser) {
    router.push('/login');
    return <FuturaSpinner />;
  }
  if (!loading && !user) {
    router.replace('/404', `/profile/${username}`);
    return <FuturaSpinner />;
  }
  dayjs.extend(relativeTime);

  const pageData = {
    title: 'Home | Social share',
    description: 'Social share',
    keywords: 'Social share, social network, urls',
    path: ['/home', '/'],
  };

  return (
    <div className={`root ${style.root}`}>
      <HeadMeta pageData={pageData} />
      <div className={style.root_content}>
        <div className={style.main_content}>
          <ProfileNavBar />
          <main
            className={`${style.content_container} ${
              modalOppened && style.prevent_scroll
            }`}
          >
            <Head>
              <title>
                {user.firstname} {user.lastname}
                {' | '}
                {process.env.NEXT_PUBLIC_APPNAME}
              </title>
            </Head>
            <ProfileHead />
            <div className={style.profileContentWraper}>
              <div className={style.profileDetails}>
                <FriendsFollowers />
                <About />
              </div>
              <div className={style.profilePosts}>
                <div className={style.profilePostsHeader}>
                  <h3>Posts</h3>
                </div>
                <div className={style.profilePostsBody}>
                  {children}
                  <PostPrompt />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
function FriendsFollowers() {
  const router = useRouter();
  const { username = '' } = router.query;
  const [user] = useUser(encodeURIComponent(username));
  const details = [
    {
      label: 'Friends',
      value: Number(user?.friendsCount) || 0,
      icon: 'fas fa-user-friends',
      link: `/profile/${username}/friends`,
    },
    {
      label: 'Followers',
      value: Number(user?.followersCount) || 0,
      icon: 'fas fa-users',
      link: `/profile/${username}/followers`,
    },
  ];
  return (
    <div className={style.friendsFollowersCount}>
      {details.map((d, index) => (
        <div className={style.usersCountWrapper} key={`${index}-${d.label}`}>
          <div className={style.left}>
            <i className={`${d.icon} ${style.rowIcon}`} />
            <div className={style.count}>
              <span className={style.statsValue}>{golfyNumber(d.value)}</span>
              <span className={style.statsName}>{d.label}</span>
            </div>
          </div>
          <button
            className={`${style.btn} ${style.btn_primary}`}
            onClick={() => router.push(d.link)}
          >
            <i className='fas fa-chevron-right' />
          </button>
        </div>
      ))}
    </div>
  );
}

function About() {
  return (
    <section className={style.profileAbout}>
      <header className={style.profileAbout_header}>
        <h3>About</h3>
      </header>
      <div className={style.profileAbout_body}>
        <p>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout
        </p>
      </div>
      <div className={style.socials}>
        <div className={style.socials_header}>
          <h3>Socials</h3>
        </div>
        <div className={style.socials_body}>
          <div className={style.socials_body_item}>
            <i className='fab fa-facebook-f' />
            <span>Facebook</span>
          </div>
          <div className={style.socials_body_item}>
            <i className='fab fa-twitter' />
            <span>Twitter</span>
          </div>
          <div className={style.socials_body_item}>
            <i className='fab fa-instagram' />
            <span>Instagram</span>
          </div>
        </div>
      </div>
    </section>
  );
}
