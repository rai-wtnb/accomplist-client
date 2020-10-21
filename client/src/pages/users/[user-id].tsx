import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Layout } from '../../components/layout';
import Menu from '../../components/Menu';
import TodoRegister from '../../components/TodoRegister';
import Profile from '../../components/Profile';

export default function Signup() {
  return (
    <>
      {/* <p className="rounded w-3/5 p-2 mx-auto text-center text-white bg-blue">
        ログインしました。
         <FontAwesomeIcon icon="times" />
      </p> */}
      <Layout>
        <Profile />


        <div className="grid grid-cols-3 gap-2 relative py-12">
          <div className="col-span-2 rounded border-beige border-2 p-2 divide-y divide-beige">
            <h1 className="pb-4 text-center">(ユーザ名)'s リスト</h1>
            <FontAwesomeIcon icon="trash" />

            {/* 達成の場合 */}
            <div className="grid grid-cols-5">
              <div className="col-span-4">
                <p className="py-4">
                  <Link href="/lists/[list-id]" as="/lists/1">
                    <a className="align-middle pr-2 text-3xl hover:text-red">
                      <FontAwesomeIcon icon={["far", "check-square"]} />
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

            {/* 未達成の場合 */}
            <div className="grid grid-cols-5">
              <div className="col-span-4">
                <p className="py-4">
                  <Link href="/lists/[list-id]" as="/lists/1">
                    <a className="align-middle pr-2 text-3xl hover:text-red">
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

      </Layout>
    </>
  );
}
