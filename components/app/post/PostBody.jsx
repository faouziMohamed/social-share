import style from '../../../sass/app.module.scss';

export default function PostBody() {
  return (
    <section className='post_body'>
      <h3 className={style.post_content_title}>
        Hey, take a look at this article
      </h3>
      <div className={style.post_content_body}>
        <div className={style.post_url}>
          <a
            href='https://www.facebook.com/profile.php?id=100073266657160'
            className={style.post_link}
          >
            Facebook page de Camara
          </a>
        </div>
        <div className={style.post_content_text}>
          https://www.facebook.com/profile.php?id=100073266657160
        </div>
      </div>
    </section>
  );
}
