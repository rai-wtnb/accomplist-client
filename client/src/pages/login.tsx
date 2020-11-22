import React, { useState } from 'react';
import Link from 'next/link';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/router';

import { Layout } from '../components/layout';
import { divideCookie, setCookies } from '../utils/mycookie';

export default function Login() {
  const [flash, setFlash] = useState<boolean>(false)
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
        {
          flash ?
            <div className="rounded text-red text-center">
              <p>※ログインに失敗しました。</p>
              <p>※もう一度確認してください。</p>
            </div>
            :
            ""
        }
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validation()}
          onSubmit={(values) => {
            const params = new URLSearchParams();
            params.append("email", values.email)
            params.append("password", values.password)
            axios.post(`${process.env.ACCOMPLIST_API_BROWSER}/users/login`, params)
              .then((res) => {
                console.log(res);
                const userID = res.data.userID;
                const sessionID = res.data.sessionID;
                setCookies(userID, sessionID)

                const content = divideCookie();
                router.push(`/users/${content["userID"]}`)
              })
              .catch(() => {
                setFlash(true)
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

              <div className="text-center mt-8 hover:text-red">
                <Link href="/signup">
                  <a>
                    新規登録の方はこちら
                  </a>
                </Link>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </Layout >
  );
}
