import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Layout } from '../components/layout';

const validation = () =>
  Yup.object().shape({
    name: Yup.string().required('※表示名を入力してください'),
    email: Yup.string()
      .email('※メールアドレスの形式が正しくありません')
      .required('※メールアドレスを入力してください'),
    password: Yup.string().required('※パスワードを入力してください'),
  });

export default function SignUp() {
  return (
    <Layout>
      <div className="rounded bg-blue h-100 w-auto md:w-1/2 mx-auto my-10 py-32 px-10 text-beige">
        <h1 className="text-center text-2xl pb-10">Welcome.</h1>
        <Formik
          initialValues={{ name: '', email: '', password: '' }}
          validationSchema={validation()}
          onSubmit={(values) => console.log(values)}
          render={(props) => (
            <form onSubmit={props.handleSubmit}>
              <div>
                <label>表示名</label>
                <input
                  className="rounded w-full text-black p-1"
                  name="name"
                  value={props.values.name}
                  onChange={props.handleChange}
                />
                <p className="text-xs">これはプロフィールに表示されます</p>
                <p className="text-sm text-red">{props.errors.name}</p>
              </div>
              <div className="pt-5">
                <label>Eメールを登録</label>
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
                <label>パスワードを作成</label>
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
              <button type="submit" className="button w-full mt-10">
                登録する
              </button>
            </form>
          )}
        />
      </div>
    </Layout>
  );
}
