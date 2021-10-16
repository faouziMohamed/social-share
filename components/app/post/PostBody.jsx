import style from '../../../sass/app.module.scss';

export default function PostBody({ body }) {
  return (
    <section className='post_body'>
      <h3 className={style.post_content_title}>{body.title}</h3>
      <div className={style.post_content_body}>
        <div className={style.post_url}>
          {body.link ? (
            <a href={body.link}>{body.linkText || body.link}</a>
          ) : null}
        </div>
        <div className={style.post_content_text}>
          {body.content ? body.content : null}
        </div>
      </div>
    </section>
  );
}
