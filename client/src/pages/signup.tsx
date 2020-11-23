import React from 'react';
import Link from 'next/link';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import axios from 'axios';

import { Layout } from '../components/layout';
import { divideCookie, setCookies } from '../utils/mycookie';

export default function SignUp() {
  const router = useRouter();
  const validation = () =>
    Yup.object().shape({
      id: Yup
        .string()
        .required('※IDを入力してください')
        .matches(/^[a-zA-Z0-9_]+$/, { message: '※英数字と「_」のみ有効です' })
        .max(20, '※IDは20字以下にしてください')
        .test('id-test', '※すでに使用されています', (value) => {
          if (value === "rai") {
            return false;
          } else {
            return true;
          }
        }),
      name: Yup
        .string()
        .required('※表示名を入力してください')
        .max(30, '※名前は30字以下にしてください'),
      email: Yup
        .string()
        .email('※メールアドレスの形式が正しくありません')
        .required('※メールアドレスを入力してください')
        .test('email-test', '※すでに登録されています', (value) => {
          if (value === "rai") {
            return false;
          } else {
            return true;
          }
        }),
      password: Yup
        .string()
        .required('※パスワードを入力してください')
        .min(6, 'パスワードが短すぎます(6字以上)')
        .max(50, '50字以下にしてください')
    });

  return (
    <Layout>
      <div className="rounded bg-blue h-100 w-auto md:w-1/2 mx-auto my-10 py-20 px-10 text-beige">
        <h1 className="text-center text-2xl pb-10">Welcome.</h1>
        <Formik
          initialValues={{ id: '', name: '', email: '', password: '' }}
          validationSchema={validation()}
          onSubmit={(values) => {
            axios.post(`${process.env.ACCOMPLIST_API_BROWSER}/users/signup`, values)
              .then((res) => {
                const userID = res.data.userID;
                const sessionID = res.data.sessionID;
                setCookies(userID, sessionID)

                const content = divideCookie();
                router.push(`/users/${content["userID"]}`)
              })
              .catch(() => {
                console.log("ユーザーIDが既に使用されています。")
              })
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <div>
                <label>ユーザーID</label>
                <input
                  className="rounded w-full text-black p-1"
                  name="id"
                  value={props.values.id}
                  onChange={props.handleChange}
                />
                <p className="text-xs pt-1">英数字と「_」(アンダーバー)のみで作成してください</p>
                <p className="text-xs pt-1">( 例: sample_user1 )</p>
                <p className="text-sm text-red">{props.errors.id}</p>
              </div>

              <div className="pt-5">
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
        </Formik>

        <div className="text-center mt-8 hover:text-red">
          <Link href="/login">
            <a>
              アカウントを既にお持ちの方はこちら
            </a>
          </Link>
        </div>
      </div>
    </Layout >
  );
}
