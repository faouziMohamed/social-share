import Router from 'next/router';

import FuturaSpinner from '../../components/spinners/futura';
import { useUser } from '../../lib/hooks';

export default function Profile() {
  const [user, { loading }] = useUser();
  if (loading) return <FuturaSpinner />;
  if (!loading && !user) {
    Router.push('/login');
    return <FuturaSpinner />;
  }
  Router.replace({
    pathname: '/profile/[username]',
    query: { username: user.username },
  });
  return <FuturaSpinner />;
}
