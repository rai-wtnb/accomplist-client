import React from 'react';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import axios from 'axios';

import { Layout } from '../../components/layout';
import Menu from '../../components/Menu';
import Profile from '../../components/Profile';
import ListIndex from '../../components/ListIndex';
import User from '../../types/user';
import List from '../../types/list';

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
          <ListIndex lists={lists} />

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
