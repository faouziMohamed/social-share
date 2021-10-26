import Image from 'next/image';
import { useEffect, useState } from 'react';

import ads from '../../data/ads.json';
import style from '../../sass/app.module.scss';

export default function RightPane({ user }) {
  return (
    <div className={style.rightpane}>
      <h1>Advertisments {user.username}</h1>
      <div className={style.rightpane_root}>
        <RightPaneAds />
      </div>
    </div>
  );
}

export function RightPaneAds() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(
      () => setIndex((index + 1) % ads.length),
      3000,
    );
    return () => clearInterval(interval);
  }, [index]);

  return (
    <article className={style.ads}>
      <div className={style.rightpane_title}>
        <h3>{ads[index].title}</h3>
      </div>
      <div className={style.ads_wrapper}>
        <div className={style.ads_picture}>
          <Image
            src={`/images/ads/ads-${index}.svg`}
            layout='fill'
            alt='ads illustration'
          />
        </div>
      </div>
    </article>
  );
}
