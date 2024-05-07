import s from './PageInUse.module.scss';

const PageInUse = () => {
  return (
    <div className={s.wrap}>
      <h1>Sorry</h1>
      <span className={s.subTitle}>This experience is in use ATM</span>
      <span className={s.message}>Please wait...</span>
    </div>
  );
};

export default PageInUse;
