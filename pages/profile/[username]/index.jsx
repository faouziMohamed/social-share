import { useRouter } from 'next/router';

import Feeds from '../../../components/post/feeds';
import PostPrompt from '../../../components/post/post-prompt';
import ProfileLayout from '../../../components/profile/profile-layout';
import { useUser } from '../../../lib/hooks';
import { golfyNumber } from '../../../lib/utils/lib.utils';
import style from '../../../sass/profile.module.scss';

export default function UserProfile() {
  return (
    <ProfileLayout>
      <div className={style.profileContentWraper}>
        <div className={style.profileDetails}>
          <FriendsFollowers />
          <div className={style.userDetails}>
            <About />
            <Socials />
          </div>
        </div>
        <div className={style.profilePosts}>
          <PostPrompt wide={true} />
          <Feeds postWide={true} />
        </div>
      </div>
    </ProfileLayout>
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
      {details.map((d) => (
        <div className={style.usersCountWrapper} key={`${d.label}`}>
          <div className={style.left}>
            <i className={`${d.icon} ${style.rowIcon}`} />
            <div className={style.count}>
              <span className={style.statsValue}>{golfyNumber(d.value)}</span>
              <span className={style.statsName}>{d.label}</span>
            </div>
          </div>
          <button
            className={style.btn_transRounded}
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
    <section className={style.about}>
      <header className={style.profileAbout_header}>
        <h3>About</h3>
      </header>
      <div className={style.profileAbout_body}>
        <p>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout
        </p>
      </div>
    </section>
  );
}
function Socials() {
  return (
    <section className={style.socials}>
      <div className={style.socials_header}>
        <h3>Socials</h3>
      </div>
      <div className={style.socials_body}>
        <div className={style.socials_body_item}>
          <i className={`${style.socialIcon} fab fa-facebook-f`} />
          <span>Facebook</span>
        </div>
        <div className={style.socials_body_item}>
          <i className={`${style.socialIcon} fab fa-twitter`} />
          <span>Twitter</span>
        </div>
        <div className={style.socials_body_item}>
          <i className={`${style.socialIcon} fab fa-instagram`} />
          <span>Instagram</span>
        </div>
      </div>
    </section>
  );
}
