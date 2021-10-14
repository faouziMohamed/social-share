import Router from 'next/router';

import AppLayout from '../../components/app/AppLayout';
import FuturaSpinner from '../../components/spinners/futura';
import { useUser } from '../../lib/hooks';

export default function App() {
  const [user, { loading }] = useUser();

  if (loading) return <FuturaSpinner />;

  if (!loading && !user) {
    Router.push('/login');
    return <FuturaSpinner />;
  }
  return <AppLayout></AppLayout>;
}
