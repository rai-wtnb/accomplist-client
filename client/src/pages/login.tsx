import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Layout } from '../components/layout';

const validation = () =>
  Yup.object().shape({
    email: Yup
      .string()
      .email('※メールアドレスの形式が正しくありません')
      .required('※メールアドレスを入力してください'),
    password: Yup
      .string()
      .oneOf([Yup.ref('password')], 'passwordが一致しません。')
      .required('※パスワードを入力してください'),
  });

export default function Login() {
  return (
    <Layout>
      <div className="rounded bg-blue h-100 w-auto md:w-1/2 mx-auto my-20 py-32 px-10 text-beige">
        <h1 className="text-center text-2xl pb-10">Welcome back.</h1>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validation()}
          onSubmit={(values) => console.log(values)}
          render={(props) => (
            <form onSubmit={props.handleSubmit}>
              <div>
                <label>Eメール</label>
                <br />
                <input
                  className="rounded w-full text-black p-1"
                  name="email"
                  value={props.values.email}
                  onChange={props.handleChange}
                />
                <p className="text-sm text-red">{props.errors.email}</p>
              </div>
              <div className="pt-5">
                <label htmlFor="password">パスワード</label>
                <br />
                <input
                  className="rounded w-full text-black p-1"
                  type="password"
                  name="password"
                  value={props.values.password}
                  onChange={props.handleChange}
                />
                <p className="text-red text-sm">{props.errors.password}</p>
              </div>
              <button type="submit" className="button w-full p-1 mt-10">
                ログイン
              </button>
            </form>
          )}
        />
      </div>
    </Layout>
  );
}
