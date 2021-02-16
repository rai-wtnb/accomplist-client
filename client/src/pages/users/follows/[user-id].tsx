import React, { useState } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import axios from 'axios';

import { Layout } from '../../../components/layout';
import Menu from '../../../components/Menu';
import User from '../../../utils/types/user';
import { getUserCookie } from '../../../utils/mycookie';
import UserTemp from '../../../components/UserTemp';
import FollowsAndFollowers from '../../../utils/types/followsAndFollowers';

type Props = {
  follows: User[];
  followers: User[];
};

const FollowPage: NextPage<Props> = ({ follows, followers }) => {
  const userID = getUserCookie();
  const [target, setTarget] = useState<'follow' | 'follower'>('follow');

  return (
    <Layout>
      <div className="md:grid grid-cols-3 gap-2 relative pt-4 pb-12 md:pb-32">
        <div className="col-span-2 rounded border-beige border-2 p-2">
          <div className="flex flex-row text-center my-4">
            <p
              className={`flex-grow py-1 text-beige rounded-tl-lg rounded-bl-lg cursor-pointer hover:opacity-90 ${target == 'follow' ? 'bg-red' : 'bg-blue'}`}
              onClick={() => setTarget('follow')}
            >
              フォロー
            </p>
            <p
              className={`flex-grow py-1 text-beige rounded-tr-lg rounded-br-lg cursor-pointer hover:opacity-90 ${target == 'follower' ? 'bg-red' : 'bg-blue'}`}
              onClick={() => setTarget('follower')}
            >
              フォロワー
            </p>
          </div>

          {
            target == 'follow' ?
              follows && follows.map((user) => {
                return (
                  <UserTemp key={user.id} user={user} />
                )
              })
              :
              followers && followers.map((user) => {
                return (
                  <UserTemp key={user.id} user={user} />
                )
              })
          }
        </div>

        <Menu userID={userID} />
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params['user-id'];
  const followRes = await axios.get(`${process.env.ACCOMPLIST_API}/relations/follows/${id}`);
  const followsAndFollowers: FollowsAndFollowers = await followRes.data;
  const follows = followsAndFollowers.follows;
  const followers = followsAndFollowers.followers;
  return {
    props: {
      follows,
      followers,
    },
  };
};

export default FollowPage;
