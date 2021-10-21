import { useRef } from 'react';

import style from '../../../sass/app.module.scss';
import FormButton from '../../forms/form-button';
import FormRowField from '../../forms/form-rowField';
import UserAvatar from '../user-avatar';
import { AuthorDetails } from './post-top-details';

export default function NewPostModal({ user, setShowNewPostModal }) {
  const modalRef = useRef(null);
  const btnRef = useRef(null);
  const iconRef = useRef(null);
  const handleClose = (e) => {
    if (![modalRef.current, btnRef.current, iconRef.current].includes(e.target))
      return;
    setShowNewPostModal(false);
  };

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

          <div className={style.modal_body}>
            <div className={style.modal_user_details}>
              <div className={style.post_data}>
                <UserAvatar user={user} />
                <AuthorDetails user={user}>
                  <small className={style.post_date}>New post</small>
                </AuthorDetails>
              </div>
            </div>

            <NewPostForm user={user} />
          </div>
        </div>
      </section>
    </div>
  );
}

export function NewPostForm({ user }) {
  const fields = [
    {
      labelText: 'Post title',
      labelIcon: 'fas fa-highlighter',
      rowIcon: 'fas fa-newspaper',
      name: 'title',
      type: 'text',
    },
    {
      labelText: 'Post Url',
      labelIcon: 'fas fa-link',
      rowIcon: 'fas fa-globe',
      name: 'link',
      type: 'url',
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title: t, link: l } = e.target;
    const [title, link] = [t.value.trim(), l.value.trim()];
    if (!title || !link) return;

    const post = { title, link, author: user.id };
    fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
  };
  return (
    <form className={style.modal_content} onSubmit={handleSubmit}>
      {fields.map((field) => (
        <FormRowField key={field.name} {...field} model={'article'} />
      ))}

      <textarea
        className={style.modal_textarea}
        rows='1'
        placeholder={`What's on your mind, ${user.firstname}`}
        aria-label='Source text'
      />
      <FormButton text='Post' type='submit' borderRadius='minimal' />
    </form>
  );
}
