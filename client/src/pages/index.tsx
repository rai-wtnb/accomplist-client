import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Layout } from '../components/layout';
import { getUserCookie } from '../utils/mycookie';

export default function Home() {
  const userID = getUserCookie();
  const router = useRouter();
  const [slide, setSlide] = useState<number>(0);

  useEffect(() => {
    userID && router.push(`/users/${userID}`)
  }, [])

  const SlideButton = () => {
    return (
      <div className="py-4">
        <button
          className={`rounded text-beige px-2 mx-2 text-2xl ${slide == 0 ? "bg-red" : "bg-blue"}`}
          onClick={() => setSlide(0)}
        >1</button>
        <button
          className={`rounded text-beige px-2 mx-2 text-2xl ${slide == 1 ? "bg-red" : "bg-blue"}`}
          onClick={() => setSlide(1)}
        >2</button>
        <button
          className={`rounded text-beige px-2 mx-2 text-2xl ${slide == 2 ? "bg-red" : "bg-blue"}`}
          onClick={() => setSlide(2)}
        >3</button>
        <button
          className={`rounded text-beige px-2 mx-2 text-2xl ${slide == 3 ? "bg-red" : "bg-blue"}`}
          onClick={() => setSlide(3)}
        >4</button>
      </div>
    )
  }

  return (
    <Layout>
      <div className={`rounded border-2 border-beige text-center my-12 ${slide != 0 && "hidden"}`}>
        <h1 className="pt-4">What's AccompList?</h1>
        <p className="text-sm">AccompListとは？</p>
        <img className="py-6 mx-auto" src="https://via.placeholder.com/600x400" />
        <p>
          AccompListとは, 自分が成し遂げたい・実現させたい -
          <span className="text-red">Accomplish</span>- と思っていることのリスト
          -<span className="text-red">List</span>- です。
        </p>
        <p>人は誰でも・いつからでも、なりたい・成し遂げたいと思い継続し続ければ何でも実現できます。</p>
        <p>AccompListはその継続する手助けをするアプリケーションです。</p>
        <SlideButton />
      </div>

      <div className={`rounded border-2 border-beige my-12 text-center ${slide != 1 && "hidden"}`}>
        <h1 className="pt-4">リストを書く。</h1>
        <img className="py-6 mx-auto" src="https://via.placeholder.com/600x400" />
        <div>
          <p>まずは実現リスト -<span className="text-red">Accomplist</span>- を書きましょう。</p>
          <p>「イラストレーターになるため毎日1時間絵を描いて習慣化する」</p>
          <p>「アメリカに留学するためNetflixで英語学習をする」</p>
          <p>「デザインの勉強を始めて友人のtwitterヘッダーを作る」</p>
          <p>「人生をより良くするためにタイムバケットを作成する」</p>
          <p>なんでも構いません。</p>
          <p>より具体的に書くのが達成のコツです。</p>
        </div>
        <SlideButton />
      </div>

      <div className={`rounded border-2 border-beige my-12 text-center ${slide != 2 && "hidden"}`}>
        <h1 className="pt-4">実現 -Accomplish- し、達成記録を書く。</h1>
        <img className="py-6 mx-auto" src="https://via.placeholder.com/600x400" />
        <p>リスト達成のために励みましょう。</p>
        <p>実現したら、<span className="text-red">達成記録</span>を書き、みんなと共有しましょう。</p>
        <p>あなたの努力,取り組みに共感してくれた方が「いいね」してくれるかもしれません。</p>
        <SlideButton />
      </div>

      <div className={`rounded border-2 border-beige my-12 text-center ${slide != 3 && "hidden"}`}>
        <h1 className="pt-4">みんなと実現する。</h1>
        <img className="py-6 mx-auto" src="https://via.placeholder.com/600x400" />
        <p>実現に向け励む仲間達を探しましょう。</p>
        <p>頑張る仲間の取り組みを見て, 自分のモチベーションにつなげたり,取り組むことの参考になったりします。</p>
        <p>みんなで目標を達成させましょう!</p>
        <SlideButton />
      </div>
    </Layout>
  );
}
