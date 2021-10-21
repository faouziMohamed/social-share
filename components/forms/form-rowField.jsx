import style from '../../sass/app.module.scss';

export default function FormRowField({
  type = 'text',
  name = '',
  labelIcon = '',
  labelText = '',
  rowIcon = '',
  disabled = false,
  cursorType = '',
  model = 'initial',
  required = false,
}) {
  let rowBtnCls = `${style.form_row__btn} ${style.no_blinking} `;
  rowBtnCls +=
    type === 'password'
      ? ` ${style.btn_clickable}`
      : ` ${style.btn_no_pointer_event}`;

  const cursors = {
    pointer: style.cursor_pointer,
    normal: style.cursor_normal,
    add: style.cursor_add,
  };
  const modelType = {
    initial: style.form_row__model_initial,
    article: style.form_row__model_article,
    edit: style.form_row__model_edit,
  };
  const _cursorType = cursors[cursorType] || '';
  const _modelType = modelType[model] || '';
  return (
    <label className={`${style.form_row} ${_cursorType} ${_modelType}`}>
      <input
        type={type}
        name={name}
        id={name}
        required={required}
        className={`${style.form_row__input} ${_cursorType}`}
        placeholder=' '
        autoComplete='off'
        disabled={!!disabled}
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
