import { forwardRef } from 'react';

import style from '../../sass/auth-style.module.scss';

export function AddFormButtons({ btnsData }) {
  return (
    <div className={style.form_btn_group}>
      {btnsData.map((btn, i) => (
        <FormButton {...btn} key={`${btn.text}-${i}`} />
      ))}
    </div>
  );
}

function Button({ type, text, ref = null, borderRadius, onClick = () => {} }) {
  let btnCls = `${style.btn} ${style.btn_wide} ${style.btn_submit} `;
  const radiusType = {
    minimal: style.btn_radius_minimal,
  };
  btnCls += radiusType[borderRadius] || '';
  return (
    <button className={btnCls} type={type} onClick={onClick} ref={ref}>
      {text}
    </button>
  );
}

const FormButton = forwardRef((props, ref) => Button({ ...props, ref }));
FormButton.displayName = 'FormButton';
export default FormButton;
