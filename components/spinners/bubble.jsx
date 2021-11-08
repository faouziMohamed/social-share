import style from '../../sass/spinners/bubble-spinner.module.scss';

export default function BubbleLoader() {
  return (
    <div className={style.loading_container}>
      <ul className={style.bubble_container}>
        <li className={style.bubble_item}></li>
        <li className={style.bubble_item}></li>
        <li className={style.bubble_item}></li>
        <li className={style.bubble_item}></li>
      </ul>
    </div>
  );
}
