import { useEffect, useRef } from 'react';

import style from '../../../sass/app.module.scss';

export default function PostActionBtns({ statsSetter }) {
  const buttons = {
    like: {
      icon: 'fal fa-thumbs-up',
      text: 'Like',
      className: style.likeBtn,
    },
    dislike: {
      icon: 'fal fa-thumbs-down',
      text: 'Dislike',
      className: style.dislikeBtn,
    },
    comment: {
      icon: 'fal fa-comment-alt',
      text: 'Comment',
      className: style.commentBtn,
    },
  };

  const likeBtn = useRef();
  const dislikeBtn = useRef();
  const commentBtn = useRef();
  const {
    like: [likeCount, setLikeCount],
    dislike: [disLikeCount, setDisLikeCount],
    // comment: [commentsCount, setCommentsCount],
  } = statsSetter;

  useEffect(() => {
    commentBtn.current.addEventListener('click', (e) => {
      const btn = e.currentTarget;
      if (commentBtn.current.classList.contains(style.commentBtn)) {
        btn.classList.toggle(style.activated);
        btn.querySelector('i').classList.toggle('fal');
        btn.querySelector('i').classList.toggle('fas');
      }
    });
  }, []);

  const handleBtnClick = (e) => {
    e.currentTarget.classList.toggle(style.activated);
    if (e.currentTarget === likeBtn.current) {
      dislikeBtn.current.classList.remove(style.activated);
      dislikeBtn.current.querySelector('i').classList.remove('fas');
      likeBtn.current.querySelector('i').classList.toggle('fas');
      setLikeCount(likeCount + 1);
      setDisLikeCount(disLikeCount > 1 ? disLikeCount - 1 : 0);
      if (!likeBtn.current.classList.contains(style.activated)) {
        setLikeCount(likeCount > 1 ? likeCount - 1 : 0);
      }
    } else if (e.currentTarget === dislikeBtn.current) {
      likeBtn.current.classList.remove(style.activated);
      likeBtn.current.querySelector('i').classList.remove('fas');
      dislikeBtn.current.querySelector('i').classList.toggle('fas');
      setDisLikeCount(disLikeCount + 1);
      setLikeCount(likeCount > 1 ? likeCount - 1 : 0);
      if (!dislikeBtn.current.classList.contains(style.activated)) {
        setDisLikeCount(disLikeCount > 1 ? disLikeCount - 1 : 0);
      }
    }
  };

  return (
    <div className={style.post_reactions}>
      <ActionBtn btn={buttons.like} btnRef={likeBtn} onClick={handleBtnClick} />
      <ActionBtn
        btn={buttons.dislike}
        btnRef={dislikeBtn}
        onClick={handleBtnClick}
      />
      <ActionBtn btn={buttons.comment} btnRef={commentBtn} />
    </div>
  );
}
function ActionBtn({ btn, btnRef, onClick = null }) {
  const cls = `${style.reaction_btn} ${btn.className}`;
  return (
    <button className={cls} ref={btnRef} onClick={onClick}>
      <i className={`${btn.icon} ${style.reaction_icon}`} />
      <span className={style.reaction_text}>{btn.text}</span>{' '}
    </button>
  );
}
