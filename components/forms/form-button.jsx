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
export default function FormButton({ type, text, borderRadius }) {
  let btnCls = `${style.btn} ${style.btn_wide} ${style.btn_submit} `;
  const radiusType = {
    minimal: style.btn_radius_minimal,
  };
  btnCls += radiusType[borderRadius] || '';
  return (
    <button className={btnCls} type={type}>
      {text}
    </button>
  );
}
