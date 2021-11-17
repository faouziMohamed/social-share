import { useState } from 'react';

import { useUser } from '../../lib/hooks';
import style from '../../sass/app.module.scss';
import FormRowField from '../forms/form-rowField';
import UserAvatar from '../user/user-avatar';
import NewPostModal from './new-post-modal';

export default function PostPrompt({ showModal, setShowModal, wide = false }) {
  const [user] = useUser();
  let [showNewPostModal, setShowNewPostModal] = useState(false);
  if (setShowModal) {
    [showNewPostModal, setShowNewPostModal] = [showModal, setShowModal];
  }
  const modalProps = { user, setShowNewPostModal };
  const handleClick = () => setShowNewPostModal(true);
  return (
    <>
      {showNewPostModal && <NewPostModal {...modalProps} />}
      <div className={`${style.post_wrapper} ${style.new_post_wrapper} `}>
        <div
          className={`${style.new_post_prompt} ${wide && style.post_wide}`}
          onClick={handleClick}
        >
          <UserAvatar user={user} />
          <FormRowField
            disabled
            cursorType='pointer'
            type='text'
            name='feed'
            rowIcon='fas fa-thought-bubble'
            labelText={`What's on your mind, ${user.firstname}`}
          />
        </div>
      </div>
    </>
  );
}
