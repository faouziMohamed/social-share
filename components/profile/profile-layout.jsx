import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { useUser } from '../../lib/hooks';
import HomeLayout from '../home/home-layout';
import FuturaSpinner from '../spinners/futura';
import { ProfileFoot } from './profile-foot';
import { ProfileHead } from './profile-head';

export default function ProfileLayout({ children }) {
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

  user.avatar = '/images/users/u-0.svg';
  dayjs.extend(relativeTime);
  return (
    <HomeLayout user={user}>
      <Head>
        <title>
          {user.firstname} {user.lastname} | {process.env.NEXT_PUBLIC_APPNAME}
        </title>
      </Head>
      <ProfileHead />
      <ProfileFoot />
      {children}
    </HomeLayout>
  );
}
