import Link from 'next/link';
import { memo } from 'react';

import style from '../../sass/auth-style.module.scss';
import { AddFormButtons } from './form-button';
import FormRowField from './form-rowField';

function AuthForm({ formData, onSubmit }) {
  const { rowData, btnsData, title, content } = formData;

  const AddFormRowFields = () =>
    rowData.map((row) => <FormRowField {...row} key={row.name} />);
  const { top, bottom } = content;

  return (
    <form className={style.gentle_form} id='transfer-form' onSubmit={onSubmit}>
      <section className={style.form_content}>
        <h1 className={style.form_title}>{title}</h1>
        {top && (
          <small className={`${style.auth__text}`}>
            {`${top.msg} `}
            <Link href={top.link}>
              <a className={style.auth__link}>{top.linkText}</a>
            </Link>
          </small>
        )}
        <fieldset className={style.form_fieldset}>
          <AddFormRowFields />
          <AddFormButtons btnsData={btnsData} />
          <section>
            {bottom && (
              <small
                className={`${style.auth__text} ${style.auth__forgot_password}`}
              >
                <Link href={bottom.link}>
                  <a className={style.auth__link}>{bottom.linkText}</a>
                </Link>
              </small>
            )}
          </section>
        </fieldset>
      </section>
    </form>
  );
}
export default memo(AuthForm, () => true);
