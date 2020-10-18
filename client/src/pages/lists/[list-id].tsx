import React from 'react';
import Link from 'next/link';

import { Layout } from '../../components/layout';

export default function Feedback() {
  return (
    <Layout>
      <div className="rounded border-beige border-2 mt-12">
        <img className="p-2" src="https://via.placeholder.com/850x600" />
        <h1 className="text-2xl p-2">カナダへの留学達成</h1>
        <p className="pl-2">2020.2.12</p>
        <p className="p-2">
          幼い頃から親の転勤によって様々な地域で生活した経験があるので、文化や言葉や習慣の違いにすぐに順応する事が自然と身に付きました。そのため、自分の常識や普通にとらわれずに、人や物事を多角的、客観的に見るという事が私の強みです。何事もまず受け入れて新しいものを吸収したいと思っていますので、自分の中の物差しで人や物事を量ることをしませんが、自分の与えられた仕事や環境には責任と決断力を持って臨みます。
        </p>
      </div>

      <div>
        <div className="rounded border-2 border-beige mt-6 ml-8 p-2">
          <Link href="/users/[user-id]" as="/users/1">
            <div className="cursor-pointer hover:opacity-75">
              <img className="inline rounded" src="https://via.placeholder.com/60" />
              <a className="inline p-2">
                name
            </a>
            </div>
          </Link>
          <p className="pt-4">Good!</p>
        </div>
        <div className="rounded border-2 border-beige mt-2 ml-12">
          <p>Thank you!</p>
        </div>
      </div>

      <div>
        <div className="rounded border-2 border-beige mt-6">
          comment...
        </div>
        <div className="rounded border-2 border-beige mt-2 ml-4">
          comment...
        </div>
        <div className="rounded border-2 border-beige mt-2 ml-4">
          comment...
        </div>
      </div>


    </Layout>
  );
}
