import { useEffect, useRef } from 'react';

import style from '../../sass/app.module.scss';

export default function BurgerMenu({ setShowLeftPane }) {
  const inputRef = useRef(null);
  const mediaQueryStr = '(min-width: 700px)';

  const toggleChecked = (e) => {
    if (matchMedia(mediaQueryStr).matches) {
      const ispanHidden = sessionStorage.getItem('hidePan') === 'true';
      setShowLeftPane(!ispanHidden);
      sessionStorage.setItem('hidePan', !ispanHidden);
      inputRef.current.checked = false;
      return;
    }
    setShowLeftPane(e.target.checked);
  };
  useEffect(() => {
    inputRef.current.checked = false;
    sessionStorage.setItem('hidePan', false);
  }, []);
  return (
    <div className={style.burger_menu}>
      <input
        type='checkbox'
        id='menu-toggler'
        className={style.burger_menu__checkbox}
        onChange={toggleChecked}
        ref={inputRef}
      />
      <label
        htmlFor='menu-toggler'
        className={style.burger_menu__label}
      ></label>
    </div>
  );
}
