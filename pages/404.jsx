import Link from 'next/link';

export default function NotFoundError() {
  return (
    <>
      <h1>404 Not Found</h1>
      <p>
        Back to{' '}
        <Link href='/'>
          <a>home</a>
        </Link>
      </p>
    </>
  );
}
