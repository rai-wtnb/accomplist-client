import React from 'react';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import axios from 'axios';

import { Layout } from '../../components/layout';
import Menu from '../../components/Menu';
import Profile from '../../components/Profile';
import ListIndex from '../../components/ListIndex';
import User from '../../types/user';
import List from '../../types/list';
import TodoRegister from '../../components/TodoRegister';

type Props = {
  user: User;
  lists: List[];
}

const Home: NextPage<Props> = ({ user, lists }) => {
  return (
    <>
      < Layout >
        <Profile user={user} />

        <div className="grid grid-cols-3 gap-2 relative py-12">
          <div className="col-span-2 rounded border-beige border-2 p-2 divide-y divide-beige">
            <ListIndex lists={lists} />
            <TodoRegister id={user.id} />
          </div>

          <Menu />
        </div>
      </Layout >
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axios.get(`${process.env.ACCOMPLIST_API}/ids`)
  const ids: string[] = await res.data;
  const paths = ids.map(id => `/users/${id}`);
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params['user-id'];
  const userRes = await axios.get(`${process.env.ACCOMPLIST_API}/users/${id}`)
  const user: User = userRes.data;
  const listRes = await axios.get(`${process.env.ACCOMPLIST_API}/lists/${id}`)
  const lists = listRes.data;
  return {
    props: {
      user,
      lists,
    },
  };
};

export default Home;
