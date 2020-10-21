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
            <h1 className="p-2">LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISICING ELIT, SED DO EIUSMOD TEMPOR INCIDIDUNT UT LABORE</h1>
            <p className="pl-2 text-sm">2020.2.12</p>
            <p className="p-2">
              LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISICING ELIT, SED DO EIUSMOD TEMPOR INCIDIDUNT UT LABORE ET DOLORE MAGNA ALIQUA. UT ENIM AD MINIM VENIAM, QUIS NOSTRUD EXERCITATION ULLAMCO LABORIS NISI UT
            </p>

            <div className="flex flex-row-reverse p-2">
              <FontAwesomeIcon className="m-2 text-red text-3xl cursor-pointer hover:opacity-90" icon="heart" />
              <FontAwesomeIcon className="m-2 text-blue text-3xl hover:text-red cursor-pointer" icon={['far', 'heart']} />
              {/* 三項演算 */}
              <Link href="/lists/setting/[list-id]" as="/lists/setting/1">
                <a>
                  <button className="text-beige bg-blue hover:bg-red rounded py-1 px-2 m-2">編集</button>
                </a>
              </Link>
            </div>
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
            <p className="flex flex-row-reverse text-sm pr-2">9/21.22:20</p>

            <div className="flex flex-row-reverse">
              <FontAwesomeIcon className="m-2 text-red text-2xl cursor-pointer hover:opacity-90" icon="heart" />
              <FontAwesomeIcon className="m-2 text-blue text-2xl hover:text-red cursor-pointer" icon={['far', 'heart']} />
              {/* 三項演算 */}
              <FontAwesomeIcon className="m-2 text-blue text-2xl hover:text-red cursor-pointer" icon="trash" />
            </div>
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
