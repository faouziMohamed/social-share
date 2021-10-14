import { useEffect, useState } from 'react';

import { AuthMsg } from '../components/auth/auth-msg';
import AuthForm from '../components/forms/auth-form';
import HeadMeta from '../components/head';
import FuturaSpinner from '../components/spinners/futura';
import formData from '../data/auth-form.json';
import style from '../sass/auth-style.module.scss';
import { logInUser } from './login';

export default function Login() {
  const imgsLen = 6;
  const [imgIndex, setImgIndex] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const handlerArgs = { errorMsg, setErrorMsg, setIsLoading };
  const onSubmit = async (e) => handleFormSubmit(e, handlerArgs);
  const data = formData.signup;
  const formProps = { formData: data, onSubmit };

  useEffect(() => {
    const interval = setInterval(
      () => setImgIndex((imgIndex + 1) % imgsLen),
      7000,
    );
    return () => clearInterval(interval);
  }, [imgIndex]);
  const bgImg = `url(/images/illustrations/sc-${imgIndex}.svg)`;
  return (
    <>
      <HeadMeta pageData={data.metadata} />
      <main
        className={`${style.main_wrapper} ${style.is_Sign_up}`}
        style={{ backgroundImage: bgImg }}
      >
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
  const { errorMsg, setErrorMsg, setIsLoading } = args;
  setIsLoading(true);
  if (errorMsg) setErrorMsg('');

  try {
    makeSurePasswordMatchesOrThrow(e);
    const body = createRequestBody(e);
    await registerUser(body);
    setIsLoading(false);
  } catch (error) {
    setErrorMsg(error.message);
    setIsLoading(false);
  }
}

function makeSurePasswordMatchesOrThrow(e) {
  if (e.currentTarget?.password.value !== e.currentTarget?.rpassword.value) {
    throw new Error('Passwords do not match');
  }
}

async function registerUser(body) {
  const response = await fetch('/api/sign-up', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if ([200, 201].includes(response.status)) {
    const { username, password } = body;
    return logInUser({ username: username.toLowerCase(), password });
  }

  const { error } = await response.json();
  throw new Error(error);
}

function createRequestBody(e) {
  return {
    username: e.currentTarget.username.value.toLowerCase(),
    password: e.currentTarget.password.value,
    firstname: e.currentTarget.firstname.value,
    lastname: e.currentTarget.lastname.value,
  };
}
