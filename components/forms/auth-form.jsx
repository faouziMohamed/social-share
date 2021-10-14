import Link from 'next/link';
import { memo } from 'react';

import style from '../../sass/auth-style.module.scss';

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
          <FormButtons btnsData={btnsData} />
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

function FormButtons({ btnsData }) {
  const btnCls = `${style.btn} ${style.btn_wide} ${style.btn_submit}`;
  return (
    <div className={style.form_btn_group}>
      {btnsData.map(({ text, type }, i) => (
        <button className={btnCls} type={type} key={`${text}-${i}`}>
          {text}
        </button>
      ))}
    </div>
  );
}

export function FormRowField({
  type = 'text',
  name = '',
  labelIcon = '',
  labelText = '',
  rowIcon = '',
}) {
  let rowBtnCls = `${style.form_row__btn} ${style.no_blinking} `;
  rowBtnCls +=
    type === 'password'
      ? ` ${style.btn_clickable}`
      : ` ${style.btn_no_pointer_event}`;

  return (
    <label className={style.form_row}>
      <input
        type={type}
        name={name}
        id={name}
        className={style.form_row__input}
        placeholder=' '
        autoComplete='off'
      />
      <span className={style.form_row__label}>
        <i className={`${style.row_label__icon} ${labelIcon}`}></i>
        <span className={style.row_label__text}>{labelText}</span>
      </span>
      <span className={rowBtnCls}>
        <i className={rowIcon}></i>
      </span>
    </label>
  );
}
