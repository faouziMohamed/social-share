import style from '../../sass/spinners/dots-loader.module.scss';

export default function DotsLoader({ alone = false }) {
  const cls = `${style.dots_loader} ${alone && style.alone}`;
  return (
    <div className={cls}>
      <div className={style.dots}>
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div key={i} className={style.dot} />
          ))}
      </div>
    </div>
  );
}
