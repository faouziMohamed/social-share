import { useState } from 'react';

import { useUser } from '../../lib/hooks';
import NewPostModal from './new-post-modal';
import NewPostPrompt from './new-post-prompt';

export default function PostPrompt({ showModal, setShowModal }) {
  const [user] = useUser();
  let [showNewPostModal, setShowNewPostModal] = useState(false);
  if (setShowModal) {
    [showNewPostModal, setShowNewPostModal] = [showModal, setShowModal];
  }
  const promptProps = { user, setShowNewPostModal };
  const modalProps = { user, setShowNewPostModal };

  return (
    <>
      {showNewPostModal && <NewPostModal {...modalProps} />}
      <NewPostPrompt {...promptProps} />
    </>
  );
}
