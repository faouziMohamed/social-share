import { forwardRef } from 'react';

import style from '../../sass/spinners/hope-spinner.module.scss';
import DotsLoader from './dot';

function HopeSpinner_({
  text,
  noText = false,
  direction = 'row',
  ref,
  spinnerTxtRef,
  hidden,
  showDots = false,
}) {
  const spinnerTxt = text || 'Loading...';
  const dir = { row: style.row_children, column: style.column_children };
  const parentCls = `${style.hope_loader} ${dir[direction] || dir.row}`;
  return (
    <div className={parentCls} ref={ref}>
      <div className={`${style.loading__spinner} ${hidden && style.hidden}`} />
      <span className={style.loading_text} id='loading-txt' ref={spinnerTxtRef}>
        <span>{!!noText || spinnerTxt}</span>
        {showDots && <DotsLoader />}
      </span>
    </div>
  );
}

export default function HopeSpinner({
  text,
  noText,
  direction,
  hidden,
  showDots,
  ...others
}) {
  const Spinner = forwardRef((props, ref) => HopeSpinner_({ ref, ...props }));

  Spinner.displayName = 'HopeSpinner';
  return (
    <HopeSpinner
      text={text}
      noText={noText}
      direction={direction}
      hidden={hidden}
      showDots={showDots}
      {...others}
    />
  );
}
