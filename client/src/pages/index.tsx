import React, { useState } from 'react';
import Link from 'next/link';

import { Layout } from '../components/layout';
import { getUserCookie } from '../utils/mycookie';

export default function Home() {
  const userID = getUserCookie();
  const [slide, setSlide] = useState<number>(0);

  const SlideButton = () => {
    return (
      <div className="py-4 text-center">
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
      <h1 className="text-red text-center mt-12">※現在APIサーバを停止しております。</h1>
      <h1 className="text-red text-center mt-12">詳細は→ <a className="hover:text-blue" href="https://github.com/rai-wtnb">github.com/rai-wtnb</a></h1>

      <div className={`rounded border-2 border-beige md:text-center my-12 ${slide != 0 && "hidden"}`}>
        <h1 className="pt-4 text-center">What's AccompList?</h1>
        <p className="text-sm text-center">AccompListとは？</p>
        <img className="my-12 mx-auto h-64" src="top_1.svg" />
        <div className="px-4">
          <p>
            AccompListとは, 自分が成し遂げたい・実現させたい -
            <span className="text-red">Accomplish</span>- と思っていることのリスト
            -<span className="text-red">List</span>- です。
          </p>
          <p>人は誰でも・いつからでも、なりたい・成し遂げたいと思い継続し続ければ、やめなければ大抵のことは実現できます。</p>
          <p>AccompListはその継続する手助けをするアプリケーションです。</p>
        </div>
        <SlideButton />
      </div>

      <div className={`rounded border-2 border-beige my-12 md:text-center ${slide != 1 && "hidden"}`}>
        <h1 className="pt-4 text-center">リストを書く。</h1>
        <img className="py-6 mx-auto h-64" src="top_2.svg" />
        <div className="px-4">
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

      <div className={`rounded border-2 border-beige my-12 md:text-center ${slide != 2 && "hidden"}`}>
        <h1 className="pt-4 text-center">実現 -Accomplish- し、<br />達成記録を書く。</h1>
        <img className="my-12 mx-auto h-64" src="top_3.svg" />
        <div className="px-4">
          <p>リスト達成のために励みましょう。</p>
          <p>実現したら、<span className="text-red">達成記録</span>を書き、みんなと共有しましょう。</p>
          <p>あなたの努力,取り組みに共感してくれた方が「いいね」してくれるかもしれません。</p>
        </div>
        <SlideButton />
      </div>

      <div className={`rounded border-2 border-beige my-12 md:text-center ${slide != 3 && "hidden"}`}>
        <h1 className="pt-4 text-center">みんなと実現する。</h1>
        <img className="my-12 mx-auto h-64" src="top_4.svg" />
        <div className="px-2">
          <p>実現に向け励む仲間達を探しましょう。</p>
          <p>頑張る仲間の取り組みを見て, 自分のモチベーションにつなげたり,取り組むことの参考になったりします。</p>
          <p>みんなで目標を達成 -<span className="text-red">Accomplish</span>- させましょう!</p>
        </div>
        <SlideButton />
      </div>

      {userID &&
        <div className="text-center mb-4">
          < Link href="/users/[user-id]" as={`/users/${userID}`}>
            <a className="button w-full px-10">
              My Page
            </a>
          </Link>
        </div>
      }
    </Layout>
  );
}
