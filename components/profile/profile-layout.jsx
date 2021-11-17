import { useRouter } from 'next/router';

import { useUser } from '../../lib/hooks';
import style from '../../sass/profile.module.scss';
import HeadMeta from '../head';
import FuturaSpinner from '../spinners/futura';
import { ProfileHead } from './profile-head';
import { ProfileNavBar } from './profile-navbar';

export default function ProfileLayout({ children, preventScroll = false }) {
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

  const pageData = {
    title:
      `${user.firstname} ${user.lastname} |` +
      ` ${process.env.NEXT_PUBLIC_APPNAME}`,
    description: 'Social share',
    keywords: 'Social share, social network, profile',
    path: [`profile/${user.username}`],
  };

  const mainClass =
    `${style.content_container} ` +
    `${preventScroll ? style.prevent_scroll : ''} ` +
    `${style.profileContainer}`;
  return (
    <div className={`root ${style.root}`}>
      <HeadMeta pageData={pageData} />
      <div className={style.root_content}>
        <div className={style.main_content}>
          <ProfileNavBar />
          <main className={mainClass}>
            <ProfileHead />
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
