import React from 'react';
import Link from 'next/link';

import { Layout } from '../components/layout';

export default function Signup() {
  return (
    <>
      {/* <p className="rounded w-3/5 p-1 mx-auto text-center text-white bg-blue">ログイン成功しました。  ×</p> */}
      <Layout>
        <div className="py-12">
          <div className="grid grid-cols-3 gap-2 relative">
            <div className="col-span-2 rounded border-beige border-2 p-2">
              <h1 className="text-2xl pb-4">(ユーザ名)のリスト</h1>
              <p className="button float-right w-20 text-center my-5">done!</p>
              <p className="py-4">
                □カナダへ留学するために難なく聞き取れるリスニング力とスピーキングを身につける
              </p>
              <p className="button float-right w-20 text-center my-5">done!</p>
              <p className="py-4">☑︎CKADを取る</p>
              <p className="button float-right w-20 text-center my-5">done!</p>
              <p className="py-4">□内定をもらう</p>
              <p className="button float-right w-20 text-center my-5">done!</p>
              <p className="py-4">□内定をもらう</p>
              <p className="py-4">□内定をもらう</p>
              <p className="py-4">□内定をもらう</p>
              <p className="py-4">□内定をもらう</p>
              <p className="py-4">□内定をもらう</p>
              <p className="py-4">□内定をもらう</p>
              <p className="py-4">□内定をもらう</p>
              <p className="py-4">□内定をもらう</p>
              <p className="py-4">□内定をもらう</p>
              <p className="py-4">□内定をもらう</p>
              <p className="py-4">□内定をもらう</p>
              <p className="py-4">□内定をもらう</p>
              <p className="py-4">□内定をもらう</p>
              <p className="py-4">□内定をもらう</p>
              <p className="py-4">□内定をもらう</p>
              <p className="py-4">□内定をもらう</p>
              <p className="py-4">□内定をもらう</p>
              <p className="py-4">□内定をもらう</p>
              <p className="py-4">□内定をもらう</p>
              <p className="py-4">□内定をもらう</p>
              <p className="py-4">□内定をもらう</p>
              <p className="py-4">□内定をもらう</p>
              <p className="py-4">□内定をもらう</p>
              <p className="py-4">□内定をもらう</p>
              <p className="py-4">□内定をもらう</p>
            </div>
            <div className="h-48 rounded bg-blue text-beige p-2 divide-y divide-beige sticky top-custom">
              <div className="p-4 hover:text-red">
                <Link href="/mypage">
                  <a>●マイページ</a>
                </Link>
              </div>
              <div className="p-4 hover:text-red">
                <Link href="/">
                  <a>ランキング</a>
                </Link>
              </div>
              <div className="p-4 hover:text-red">
                <Link href="/">
                  <a>友達のリスト</a>
                </Link>
              </div>
            </div>
          </div>
          <p>最初にプロフィール画面, 下にリスト</p>
        </div>
      </Layout>
    </>
  );
}
