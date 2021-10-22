import style from '../../../sass/app.module.scss';

export default function PostBody({ body }) {
  return (
    <section className='post_body'>
      <h3 className={style.post_content_title}>{body.title}</h3>
      <div className={style.post_content_body}>
        <div className={style.post_url}>
          {body.url ? (
            <a href={body.url}>{body.urlAltText || body.url}</a>
          ) : null}
        </div>
        {body.text && (
          <div className={style.post_content_text}>{body.text}</div>
        )}
      </div>
    </section>
  );
}
