import Image from 'next/image';
import Link from 'next/link';

import css from '../../sass/profile.module.scss';

export default function AppLogo({ size = 'medium', className = '' }) {
  const sizes = {
    small: css.logo_small,
    medium: css.logo_medium,
    large: css.logo_large,
  };
  const sizeClass = sizes[size] || sizes.medium;
  return (
    <Link href='/home'>
      <a className={`${css.homeLink} ${className} ${sizeClass}`}>
        <Image
          src='/sc-icons/logo/sc-default.png'
          alt={`${process.env.NEXT_PUBLIC_APPNAME} Official logo`}
          layout='fill'
        />
      </a>
    </Link>
  );
}
