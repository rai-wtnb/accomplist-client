import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Layout } from '../../components/layout';
import Menu from '../../components/Menu';

export default function Feedback() {
  return (
    <Layout>
      <div className="grid grid-cols-3 gap-2 py-12">

        <div className="col-span-2">
          <div className="rounded border-beige border-2">

            <div className="rounded hover:opacity-75">
              <Link href="/users/[user-id]" as="/users/1">
                <a>
                  <img className="rounded p-2 inline" src="https://via.placeholder.com/60" />
                  <h1 className="inline align-middle">ユーザー名</h1>
                </a>
              </Link>
            </div>
            <img className="p-2" src="https://via.placeholder.com/850x600" />
            <h1 className="p-2">カナダへの留学達成</h1>
            <p className="pl-2">2020.2.12</p>
            <p className="p-2">
              幼い頃から親の転勤によって様々な地域で生活した経験があるので、文化や言葉や習慣の違いにすぐに順応する事が自然と身に付きました。そのため、自分の常識や普通にとらわれずに、人や物事を多角的、客観的に見るという事が私の強みです。何事もまず受け入れて新しいものを吸収したいと思っていますので、自分の中の物差しで人や物事を量ることをしませんが、自分の与えられた仕事や環境には責任と決断力を持って臨みます。
            </p>
            <FontAwesomeIcon className="text-red" icon="heart" />
            <FontAwesomeIcon className="text-red" icon={['far', 'heart']} />
          </div>

          <div className="rounded border-2 border-beige mt-6 ml-8 p-2">
            <Link href="/users/[user-id]" as="/users/1">
              <div className="cursor-pointer hover:opacity-75">
                <img
                  className="inline rounded"
                  src="https://via.placeholder.com/60"
                />
                <a className="inline p-2">name</a>
              </div>
            </Link>
            <p className="pt-4">Good!</p>
          </div>

          <div className="rounded border-2 border-beige mt-2 ml-12 p-2">
            <Link href="/users/[user-id]" as="/users/1">
              <div className="cursor-pointer hover:opacity-75">
                <img
                  className="inline rounded"
                  src="https://via.placeholder.com/60"
                />
                <a className="inline p-2">name</a>
              </div>
            </Link>
            <p className="p-2">Thank you!</p>
          </div>

          <div className="rounded border-2 border-beige mt-4 ml-8 p-2">
            comment...
          </div>
          <div className="rounded border-2 border-beige mt-4 ml-8 p-2">
            comment...
          </div>
          <div className="rounded border-2 border-beige mt-4 ml-8 p-2">
            comment...
          </div>
        </div>

        <Menu />
      </div>
    </Layout>
  );
}
