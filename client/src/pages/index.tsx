import Link from 'next/link';
import React from 'react';

import { Layout } from '../components/layout';

export default function Home() {
  return (
    <Layout>
      <div className="rounded border-2 border-beige text-center my-12">
        <h1 className="text-2xl">What's AccompList?</h1>
        <p className="text-sm pb-8">AccompListとは？</p>
        <p>AccompListとは, 自分が成し遂げたい・実現させたい -<span className="text-red">Accomplish</span>- と思っていることのリスト -<span className="text-red">List</span>- です。</p>
        <p>デザイナーになりたい, 〇〇へ旅行に行きたい, </p>
      </div>

      <div className="rounded border-2 border-beige my-12">
        <h1 className="text-2xl">実現 -Accomplish- しよう。</h1>
        <p>実現リストを書きましょう。</p>
        <p>「目標達成のために何かスキルを習得する。」「ダイエットを達成する。」なんでも構いません。</p>
        <p>そして, 実現したら達成した記録を残しましょう。</p>
        <p>あなたの努力, 取り組みに共感してくれた方が「いいね」してくれるかもしれません。</p>
      </div>

      <div className="rounded border-2 border-beige px-1 my-12">
        <h1 className="text-2xl">つながろう。</h1>
        <p>何かに必死に取り組むひととつながりましょう。</p>
        <p>ほかの人の取り組みを見て, 自分のモチベーションにつなげたり, 取り組むことの参考になったりします。</p>
      </div>

      <div className="rounded border-2 border-beige my-12">
        <h1 className="text-2xl">みんなと実現しよう。</h1>
        <p>実現リスト -<sapn className="text-red">AccmpList</sapn>- を共有して, みんなで一緒に夢を・目標を実現させましょう!</p>
        <Link
          href="/signup"
        >
          <a className="button">新規登録</a>
        </Link>
        <Link
          href="/login"
        >
          <a className="button">ログイン</a>
        </Link>
        <Link
          href="/login"
        >
          <a className="button">テストユーザー</a>
        </Link>
      </div>
    </Layout>
  )
}
