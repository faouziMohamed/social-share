import { useEffect, useRef } from 'react';

import { useUser } from '../../lib/hooks';
import style from '../../sass/app.module.scss';

export default function PostActionBtns({ statsHooks, metadata, reactions }) {
  const [user] = useUser();
  const buttons = useBtnMetadata(reactions, user);
  const commentBtn = useCommentButton();
  const buttonRefs = useReactionsButton({ statsHooks, metadata, user });
  const { likeBtn, handleBtnClick, dislikeBtn } = buttonRefs;
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

function useBtnMetadata(reactions, user) {
  const { likes = [], dislikes = [] } = reactions;
  const cls = {
    like: likes.some(({ user: u }) => u === user.id),
    dislike: dislikes.some(({ user: u }) => u === user.id),
  };
  const buttons = {
    like: {
      icon: `${cls.like ? 'fas' : 'fal'} fa-thumbs-up`,
      text: 'Like',
      className: `${style.likeBtn} ${cls.like && style.activated}`,
    },
    dislike: {
      icon: `${cls.dislike ? 'fas' : 'fal'} fa-thumbs-down`,
      text: 'Dislike',
      className: `${style.dislikeBtn} ${cls.dislike && style.activated}`,
    },
    comment: {
      icon: 'fal fa-comment-alt',
      text: 'Comment',
      className: style.commentBtn,
    },
  };
  return buttons;
}

function useReactionsButton({ statsHooks, metadata, user }) {
  const { postId } = metadata;
  const {
    like: [likeCount, setLikeCount],
    dislike: [disLikeCount, setDisLikeCount],
    // comment: [commentsCount, setCommentsCount],
  } = statsHooks;

  const likeBtn = useRef();
  const dislikeBtn = useRef();
  const handleBtnClick = async (e) => {
    const btnLike = likeBtn.current;
    const btnDislike = dislikeBtn.current;
    const iconLike = btnLike.querySelector('i');
    const iconDislike = btnDislike.querySelector('i');
    const removeFas = (icon) => icon.classList.remove('fas');
    const removeFal = (icon) => icon.classList.remove('fal');
    const addFas = (icon) => icon.classList.add('fas');
    const addFal = (icon) => icon.classList.add('fal');
    const deactivateBtn = (btn) => btn.classList.remove(style.activated);
    const isActivated = (btn) => btn.classList.contains(style.activated);
    const deactivatIcon = (i) => removeFas(i) || addFal(i);
    const activateIcon = (i) => removeFal(i) || addFas(i);

    e.currentTarget.classList.toggle(style.activated);
    if (e.currentTarget === btnLike) {
      activateIcon(iconLike);
      deactivatIcon(iconDislike);
      deactivateBtn(btnDislike);
      setLikeCount(likeCount + 1);
      setDisLikeCount(disLikeCount > 1 ? disLikeCount - 1 : 0);
    } else if (e.currentTarget === btnDislike) {
      activateIcon(iconDislike);
      deactivatIcon(iconLike);
      deactivateBtn(btnLike);
      setDisLikeCount(disLikeCount + 1);
      setLikeCount(likeCount > 1 ? likeCount - 1 : 0);
    }

    if (!isActivated(btnLike)) {
      setLikeCount(likeCount > 1 ? likeCount - 1 : 0);
      deactivatIcon(iconLike);
    }
    if (!isActivated(btnDislike)) {
      setDisLikeCount(disLikeCount > 1 ? disLikeCount - 1 : 0);
      deactivatIcon(iconDislike);
    }
    await fetch(`/api/posts/reactions/${postId}?targeted=likes`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        like: btnLike.classList.contains(style.activated),
        dislike: btnDislike.classList.contains(style.activated),
        reactedUser: user.id,
      }),
    });
  };
  return { likeBtn, handleBtnClick, dislikeBtn };
}

function useCommentButton() {
  const commentBtn = useRef();
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
  return commentBtn;
}

function ActionBtn({ btn, btnRef, onClick = null, className = '' }) {
  const cls = `${style.reaction_btn} ${btn.className} ${className}`;
  return (
    <button className={cls} ref={btnRef} onClick={onClick}>
      <i className={`${btn.icon} ${style.reaction_icon}`} />
      <span className={style.reaction_text}>{btn.text}</span>{' '}
    </button>
  );
}
