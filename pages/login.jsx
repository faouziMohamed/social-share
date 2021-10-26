import Router from 'next/router';
import { useEffect, useState } from 'react';

import { AuthMsg } from '../components/auth/auth-msg';
import AuthForm from '../components/forms/auth-form';
import HeadMeta from '../components/head';
import FuturaSpinner from '../components/spinners/futura';
import formData from '../data/auth-form.json';
import { useUser } from '../lib/hooks';
import style from '../sass/auth-style.module.scss';

function useAuthVerification() {
  const [user, { loading }] = useUser();
  if (loading) return <FuturaSpinner />;
  if (user) {
    Router.push('/home');
    return <FuturaSpinner />;
  }
  return false;
}

export default function Login() {
  const imgsLen = 6;
  const [imgIndex, setImgIndex] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handlerArgs = { errorMsg, setErrorMsg, setIsLoading };
  const onSubmit = async (e) => handleFormSubmit(e, handlerArgs);
  const data = formData.login;
  const formProps = { formData: data, onSubmit };

  useEffect(() => {
    const updateImgIndex = () => setImgIndex((imgIndex + 1) % imgsLen);
    const interval = setInterval(updateImgIndex, 7000);
    return () => clearInterval(interval);
  }, [imgIndex]);

  useEffect(() => Router.prefetch('/home'), []);

  const bgImg = `url(/images/illustrations/sc-${imgIndex}.svg)`;

  if (useAuthVerification()) return false;
  return (
    <>
      <HeadMeta pageData={data.metadata} />
      <main className={style.main_wrapper} style={{ backgroundImage: bgImg }}>
        <div className={style.content_root}>
          {isLoading && <FuturaSpinner semiTransparent />}
          <section className={style.main_content}>
            {errorMsg && <AuthMsg msg={errorMsg} />}
            <AuthForm {...formProps} />
          </section>
        </div>
      </main>
    </>
  );
}

async function handleFormSubmit(e, args) {
  e.preventDefault();
  const { errorMessage, setErrorMsg, setIsLoading } = args;
  setIsLoading(true);
  if (errorMessage) setErrorMsg('');

  try {
    const body = createRequestBody(e);
    await logInUser(body);
    setIsLoading(false);
  } catch (error) {
    setErrorMsg(error.message);
    setIsLoading(false);
  }
}

export async function logInUser(body) {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if ([200, 201].includes(response.status)) Router.push('/home');
  else {
    const { error } = await response.json();
    throw new Error(error);
  }
}

function createRequestBody(e) {
  const username = e.target.username.value.trim().toLowerCase();
  const password = e.target.password.value;
  return { username, password };
}
