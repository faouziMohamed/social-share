import style from '../../sass/auth-style.module.scss';

export function AuthMsg({ msg }) {
  return (
    <section className={`${style.auth_msg} ${style.error_msg}`}>
      <p>{msg}</p>
    </section>
  );
}
