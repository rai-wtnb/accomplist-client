import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/router';

import { Layout } from '../components/layout';

export default function Login() {
  const router = useRouter();
  const validation = () =>
    Yup.object().shape({
      email: Yup
        .string()
        .email('※メールアドレスの形式が正しくありません')
        .required('※メールアドレスを入力してください'),
      password: Yup
        .string()
        .required('※パスワードを入力してください'),
    });

  return (
    <Layout>
      <div className="rounded bg-blue h-100 w-auto md:w-1/2 mx-auto my-20 py-32 px-10 text-beige">
        <h1 className="text-center text-2xl pb-10">Welcome back.</h1>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validation()}
          onSubmit={(values) => {
            const params = new URLSearchParams();
            params.append("email", values.email)
            params.append("password", values.password)
            axios.post(`${process.env.ACCOMPLIST_API_BROWSER}/users/login`, params)
              .then((res) => {
                // todo
                const sessionID = res.data.sessionID;
                const userID = res.data.userID;
                document.cookie = `userID=${userID}`;
                document.cookie = `sessionID=${sessionID}`;

                let cookies = document.cookie;
                let cookiesArray = cookies.split(';');
                for (let c of cookiesArray) {
                  let cArray = c.split('=');
                  if (cArray[0] == 'userID') {
                    router.push(`/users/${cArray}`)
                  }
                }
              })
              .catch(function (error) {
                // todo
                console.log(error);
              })
          }
          }
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <div>
                <label htmlFor="email">Eメール</label>
                <br />
                <input
                  id="email"
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
                  id="password"
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
        </Formik>
      </div>
    </Layout>
  );
}
