import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { NextPage, GetServerSideProps } from 'next';
import axios from 'axios';

import { Layout } from '../../components/layout';
import Menu from '../../components/Menu';
import Profile from '../../components/Profile';
import ListIndex from '../../components/ListIndex';
import User from '../../utils/types/user';
import List from '../../utils/types/list';
import TodoRegister from '../../components/TodoRegister';
import { getUserCookie } from '../../utils/mycookie';
import Count from '../../utils/types/count';

type Props = {
  user: User;
};

const UserPage: NextPage<Props> = ({ user }) => {
  const userID = getUserCookie();
  const router = useRouter();

  useEffect(() => { !userID && router.push(`/login`); }, []);

  return (
    <>
      <Layout>
        <Profile user={user} />

        <div className="md:grid grid-cols-3 gap-2 relative pt-4 pb-12 md:pb-32">
          <div className="col-span-2 rounded border-beige border-2 p-2 divide-y divide-beige">
            <ListIndex lists={user.lists} userID={userID} />
            {userID == user.id ? <TodoRegister id={user.id} /> : ''}
          </div>

          <Menu userID={userID} />
        </div>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params['user-id'];
  const userRes = await axios.get(`${process.env.ACCOMPLIST_API}/users/${id}`);
  const user: User = await userRes.data;
  return {
    props: {
      user,
    },
  };
};

export default UserPage;
