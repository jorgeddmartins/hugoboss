import s from './Error.module.scss';

type ErrorProps = {
  eventId?: string;
  error?: Error;
  notFound?: boolean;
};

export default function Error({ notFound }: ErrorProps) {
  return (
    <div>
      <div className={s.wrap}>
        <div className={s.content}>
          <span className={s.title}>Whoops</span>
          <span className={s.subTitle}>
            {notFound
              ? 'Something went wrong.'
              : 'The page you’ve requested has not been found'}
          </span>
          <span className={s.subText}>Please refresh the page</span>
        </div>
      </div>
    </div>
  );
}
