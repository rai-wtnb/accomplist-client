import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Layout } from '../../components/layout';
import Menu from '../../components/Menu';
import TodoRegister from '../../components/TodoRegister';

export default function Signup() {
  return (
    <>
      {/* <p className="rounded w-3/5 p-2 mx-auto text-center text-white bg-blue">
        ログインしました。
         <FontAwesomeIcon icon="times" />
      </p> */}
      <Layout>
        <div className="mt-12 rounded border-beige border-2 p-2">
          <img
            className="rounded inline"
            src="https://via.placeholder.com/60"
          />
          <h1 className="pl-2 inline align-middle">ユーザー名</h1>
          <div className="py-4">
            <p>
              幼い頃から親の転勤によって様々な地域で生活した経験があるので、文化や言葉や習慣の違いにすぐに順応する事が自然と身に付きました。そのため、自分の常識や普通にとらわれずに、人や物事を多角的、客観的に見るという事が私の強みです。何事もまず受け入れて新しいものを吸収したいと思っていますので、自分の中の物差しで人や物事を量ることをしませんが、自分の与えられた仕事や環境には責任と決断力を持って臨みます。
            </p>
          </div>
        </div>

        <div className="pt-6 pb-12">
          <div className="grid grid-cols-3 gap-2 relative">
            <div className="col-span-2 rounded border-beige border-2 p-2 divide-y divide-beige">
              <h1 className="pb-4 text-center">(ユーザ名)'s リスト</h1>

              {/* set */}
              <div className="grid grid-cols-5">
                <div className="col-span-4">
                  <p className="py-4">
                    <Link href="/lists/[list-id]" as="/lists/1">
                      <a className="align-middle text-red pr-2 text-2xl">
                        <FontAwesomeIcon icon="check-square" />
                      </a>
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

              {/* set */}
              <div className="grid grid-cols-5">
                <div className="col-span-4">
                  <p className="py-4">
                    <Link href="/lists/[list-id]" as="/lists/1">
                      <a className="align-middle pr-2 text-2xl">
                        <FontAwesomeIcon icon={['far', 'square']} />
                      </a>
                    </Link>
                    ブログで10万PV達成
                  </p>
                </div>
                <div className="col-span-1" />
              </div>
              {/* end */}

              <TodoRegister />
            </div>

            <Menu />
          </div>
        </div>
      </Layout>
    </>
  );
}
