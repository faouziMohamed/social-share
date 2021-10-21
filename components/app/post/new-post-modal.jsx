import Link from 'next/link';
import { useRef, useState } from 'react';

import PostError from '../../../lib/errors/post-error';
import style from '../../../sass/app.module.scss';
import FormButton from '../../forms/form-button';
import FormRowField from '../../forms/form-rowField';
import UserAvatar from '../user-avatar';
import { AuthorDetails } from './post-top-details';

export default function NewPostModal({
  user,
  setShowNewPostModal,
  setUpdateFeed,
}) {
  const modalRef = useRef(null);
  const btnRef = useRef(null);
  const iconRef = useRef(null);
  const [feedback, setFeedback] = useState({ error: false, msg: '', hint: '' });

  const handleClose = (e) => {
    if (![modalRef.current, btnRef.current, iconRef.current].includes(e.target))
      return;
    setShowNewPostModal(false);
  };
  const feedbackProps = { feedback, setFeedback };
  return (
    <div className={style.modal_container} ref={modalRef} onClick={handleClose}>
      <section className={`${style.modal}`}>
        <div className={style.modal_content}>
          <div className={style.modal_header}>
            <h3 className={style.modal_title}>Create post</h3>
            <button
              className={style.close_btn}
              onClick={handleClose}
              ref={btnRef}
            >
              <i className='fas fa-times' ref={iconRef} />
            </button>
          </div>
          {feedback.msg && <FeedbackMessage {...feedbackProps} />}
          <div className={style.modal_body}>
            <div className={style.modal_user_details}>
              <div className={style.post_data}>
                <UserAvatar user={user} />
                <AuthorDetails user={user}>
                  <small className={style.post_date}>New post</small>
                </AuthorDetails>
              </div>
            </div>

            <NewPostForm
              user={user}
              setUpdateFeed={setUpdateFeed}
              handleClose={handleClose}
              setFeedback={setFeedback}
              setOpenModal={setShowNewPostModal}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeedbackMessage({ feedback, setFeedback }) {
  return (
    <div
      className={`${style.feedback_container} ${
        feedback.error ? style.feedback_error : style.feedback_info
      }`}
    >
      <p className={style.postFeedback_text}>
        {feedback.msg}
        {feedback.hint && (
          <span>
            {' '}
            you can view it{' '}
            <Link href={feedback.hint}>
              <a className={style.postFeedback_hint}>here</a>
            </Link>
          </span>
        )}
      </p>
      <button
        className={`${style.btn_close_feedback} ${style.close_btn}`}
        onClick={() => setFeedback({ msg: '' })}
      >
        <i className='fas fa-times' />
      </button>
    </div>
  );
}

export function NewPostForm({
  user,
  setUpdateFeed,
  setFeedback,
  setOpenModal,
}) {
  const fields = [
    {
      labelText: 'Post title',
      labelIcon: 'fas fa-highlighter',
      rowIcon: 'fas fa-newspaper',
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      labelText: 'Post Url',
      labelIcon: 'fas fa-link',
      rowIcon: 'fas fa-globe',
      name: 'url',
      type: 'url',
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { title: t, url: l, body: b } = e.target;
      const [title, url, body = ''] = [t.value.trim(), l.value.trim(), b.value];

      if (!title || !url) return;

      const post = { title, url, body, author: user.id };
      const { postId, error, hint } = await postJSONData({
        data: post,
        url: '/api/posts/add',
      });

      if (error) {
        throw new PostError({ message: error, hint });
      } else {
        const cachedPosts = JSON.parse(sessionStorage.getItem('posts')) || [];
        post.postId = postId;
        cachedPosts.push(post);
        setUpdateFeed(true);
        setOpenModal(false);
      }
    } catch (error) {
      if (error instanceof PostError) {
        setFeedback({ error: true, msg: error.message, hint: error.hint });
      } else setFeedback({ error: true, msg: error.message });
    }
  };
  return (
    <form className={style.modal_content} onSubmit={handleSubmit}>
      {fields.map((field) => (
        <FormRowField key={field.name} {...field} model={'article'} />
      ))}

      <textarea
        className={style.modal_textarea}
        rows='1'
        name='body'
        placeholder={`What's on your mind, ${user.firstname}`}
        aria-label='Source text'
      />
      <FormButton text='Post' type='submit' borderRadius='minimal' />
    </form>
  );
}

export async function postJSONData({ data, url }) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  return response.json();
}
