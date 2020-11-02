import React from 'react';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

import { Layout } from '../../components/layout';
import Menu from '../../components/Menu';
import TodoRegister from '../../components/TodoRegister';
import Profile from '../../components/Profile';

const URL = "172.18.0.1:8080/users"

export const Home: NextPage = () => {
  return (
    <>
      {/* <p className="rounded w-3/5 p-2 mx-auto text-center text-white bg-blue">
        ログインしました。
         <FontAwesomeIcon icon="times" />
      </p> */}
      < Layout >
        <Profile />


        <div className="grid grid-cols-3 gap-2 relative py-12">
          <div className="col-span-2 rounded border-beige border-2 p-2 divide-y divide-beige">
            <h1 className="pb-4 text-center">ユーザ名's リスト</h1>

            {/* 達成の場合 */}
            <div className="grid grid-cols-9">

              <div className="col-span-1 pt-4">
                <Link href="/lists/[list-id]" as="/lists/1">
                  <a className="align-middle pr-2 text-blue text-3xl hover:text-red">
                    <FontAwesomeIcon icon={["far", "check-square"]} />
                  </a>
                </Link>
              </div>

              <div className="col-span-5">
                <p className="py-4">
                  つれづれなるまゝに、日暮らし、硯にむかひて、心にうつりゆく
                </p>
              </div>

              <div className="col-span-1" />

              <div className="col-span-2">
                {/* TODO */}
                <Link href="/lists/[list-id]" as="/lists/1">
                  <button className="button w-20 text-center my-4 ml-auto">
                    <a>done!</a>
                  </button>
                </Link>

                <div>
                  <FontAwesomeIcon
                    className="text-xl text-blue hover:text-red cursor-pointer mr-4 mb-4"
                    icon="trash"
                  />
                </div>
              </div>

            </div>
            {/* end */}

            {/* 未達成の場合 */}
            <div className="grid grid-cols-9">
              <div className="col-span-1 pt-4">
                <Link href="/lists/setting/[list-id]" as="/lists/setting/1">
                  <a className="align-middle pr-2 text-3xl text-blue hover:text-red">
                    <FontAwesomeIcon icon={['far', 'square']} />
                  </a>
                </Link>
              </div>

              <div className="col-span-5">
                <p className="py-4">
                  LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISICING ELIT, SED DO EIUSMOD TEMPOR INCIDIDUNT UT LABORE
                </p>
              </div>

              <div className="col-span-1" />

              <div className="col-span-2">
                <div>
                  <FontAwesomeIcon
                    className="text-xl text-blue hover:text-red cursor-pointer mr-4 my-6"
                    icon="trash"
                  />
                </div>
              </div>

            </div>
            {/* end */}

            <TodoRegister />
          </div>

          <Menu />
        </div>

      </Layout >
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res: [{ id: string }] = await axios.get(URL);
  const paths = res.map(data => `/users/${data.id}`);

  return { paths, fallback: false };
};

// export const getStaticProps: GetStaticProps = async () => {
//   const api = new BlogApi();
//   const entries = await api.fetchBlogEntries();
//   return {
//     props: {
//       entries,
//     },
//   };
// };

export default Home;
