import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Layout } from '../components/layout';
import { getUserCookie } from '../utils/mycookie';

export default function Home() {
  const userID = getUserCookie();
  const router = useRouter();

  useEffect(() => {
    userID && router.push(`/users/${userID}`)
  }, [])

  return (
    <Layout>
      <div className="rounded border-2 border-beige text-center my-12">
        <h1>What's AccompList?</h1>
        <p className="text-sm pb-8">AccompListとは？</p>
        <p>
          AccompListとは, 自分が成し遂げたい・実現させたい -
          <span className="text-red">Accomplish</span>- と思っていることのリスト
          -<span className="text-red">List</span>- です。
        </p>
        <p>デザイナーになりたい, 〇〇へ旅行に行きたい, </p>
      </div>

      <div className="rounded border-2 border-beige my-12">
        <h1>実現 -Accomplish- しよう。</h1>
        <p>実現リストを書きましょう。</p>
        <p>
          「目標達成のために何かスキルを習得する。」「ダイエットを達成する。」なんでも構いません。
        </p>
        <p>そして, 実現したら達成した記録を残しましょう。</p>
        <p>
          あなたの努力,
          取り組みに共感してくれた方が「いいね」してくれるかもしれません。
        </p>
      </div>

      <div className="rounded border-2 border-beige px-1 my-12">
        <h1>つながろう。</h1>
        <p>何かに必死に取り組むひととつながりましょう。</p>
        <p>
          ほかの人の取り組みを見て, 自分のモチベーションにつなげたり,
          取り組むことの参考になったりします。
        </p>
      </div>

      <div className="rounded border-2 border-beige my-12">
        <h1>みんなと実現しよう。</h1>
        <p>
          実現リスト -<span className="text-red">AccmpList</span>- を共有して,
          みんなで一緒に夢を・目標を実現させましょう!
        </p>
        <Link href="/signup">
          <a className="button">新規登録</a>
        </Link>
        <Link href="/login">
          <a className="button">ログイン</a>
        </Link>
        {/* TODO */}
        <Link href="/users/tester">
          <a className="button">テストユーザー</a>
        </Link>
      </div>

      <div className="rounded border-2 border-beige text-center my-12">
        <h1>みんなの達成の記録を見る</h1>
        <p>これ以降に無限スクロール or acommplishes/index.tsxページへのLink.</p>
      </div>

    </Layout>
  );
}
