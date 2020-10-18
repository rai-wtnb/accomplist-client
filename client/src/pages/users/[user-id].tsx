import React from 'react';
import Link from 'next/link';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Layout } from '../../components/layout';

const validation = () =>
  Yup.object().shape({
    todo: Yup.string()
      .required('※入力してください'),
  });

export default function Signup() {
  return (
    <>
      {/* <p className="rounded w-3/5 p-1 mx-auto text-center text-white bg-blue">ログイン成功しました。  ×</p> */}
      <Layout>
        <div className="py-12">
          <div className="grid grid-cols-3 gap-2 relative">
            <div className="col-span-2 rounded border-beige border-2 p-2 divide-y divide-beige">
              <h1 className="text-2xl pb-4 text-center">(ユーザ名)'s リスト</h1>

              {/* set */}
              <div className="grid grid-cols-5">
                <div className="col-span-4">
                  <p className="py-4">
                    {/* TODO */}
                    <Link href="/lists/[list-id]" as="/lists/1">
                      <a>□</a>
                    </Link>
                    CKADを取得する
                  </p>
                </div>
                <div className="col-span-1">
                  {/* TODO */}
                  <Link href="/lists/[list-id]" as="/lists/1">
                    <div className="button w-20 text-center my-4 ml-auto">
                      <a>done!</a>
                    </div>
                  </Link>
                </div>
              </div>
              {/* end */}

              {/* TODO */}
              <Formik
                initialValues={{ todo: "" }}
                validationSchema={validation()}
                // TODO
                onSubmit={(values) => console.log(values)}
                render={(props) => (
                  <form onSubmit={props.handleSubmit}>
                    <div className="pt-2">
                      <input
                        className="rounded border border-beige w-full text-black p-1"
                        name="todo"
                        value={props.values.todo}
                        onChange={props.handleChange}
                      />
                      <p className="text-sm text-red">{props.errors.todo}</p>
                    </div>
                    <button type="submit" className="button w-full p-1 mt-1">
                      登録
                    </button>
                  </form>
                )}
              />
              <button className="button bg-blue w-full">x</button>
              {/* TODO */}
              <p className="text-center bg-blue rounded text-beige cursor-pointer hover:bg-opacity-90">+</p>

            </div>

            <div className="h-48 rounded text-beige p-2 divide-y divide-beige sticky top-custom">
              {/* TODO */}
              <Link href="/users/[user-id]" as="/users/2">
                <div className="p-4 hover:bg-opacity-90 bg-blue rounded  cursor-pointer">
                  <a>●マイページ</a>
                </div>
              </Link>
              <Link href="/">
                <div className="p-4 hover:bg-opacity-90 bg-blue rounded cursor-pointer">
                  <a>話題のAccompLister</a>
                </div>
              </Link>
              <Link href="/">
                <div className="p-4 hover:bg-opacity-90 bg-blue rounded cursor-pointer">
                  <a>友達のリスト</a>
                </div>
              </Link>
              <Link href="/">
                <div className="p-4 hover:bg-opacity-90 bg-blue rounded cursor-pointer">
                  <a>お知らせ</a>
                </div>
              </Link>
            </div>
          </div>
          <p>最初にプロフィール画面, 下にリスト</p>
        </div>
      </Layout>
    </>
  );
}
