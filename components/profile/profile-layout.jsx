import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { useUser } from '../../lib/hooks';
import style from '../../sass/app.module.scss';
import HeadMeta from '../head';
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
    <>
      <HeadMeta pageData={pageData} />
      <div className={`root ${style.root}`}>
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
              {children}
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
