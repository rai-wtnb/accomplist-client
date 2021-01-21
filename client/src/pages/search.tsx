import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { NextPage, GetServerSideProps } from 'next';
import Link from 'next/link';
import axios from 'axios';

import { Layout } from '../components/layout';
import Menu from '../components/Menu';
import User from '../utils/types/user';
import { getUserCookie } from '../utils/mycookie';
import Feedback from '../utils/types/feedback';
import UserTemp from '../components/UserTemp';

type Props = {
  users: User[];
  feedbacks: Feedback[];
};

const SearchPage: NextPage<Props> = ({ users, feedbacks }) => {
  const userID = getUserCookie();
  const router = useRouter();
  const [target, setTarget] = useState<'user' | 'feedback'>('feedback');
  const [searchWord, setSearchWord] = useState<string>('英語');
  const [searchUser, setSearchUser] = useState<User[] | null>(null);
  const [searchFeedback, setSearchFeedback] = useState<Feedback[] | null>(null);

  const search = (searchWord) => {
    const resultUser = users.filter((user) => {
      return (
        user.name.indexOf(searchWord) > -1 ||
        user.description.indexOf(searchWord) > -1
      );
    });
    const resultFeedback = feedbacks.filter((feedback) => {
      return (
        feedback.title.indexOf(searchWord) > -1 ||
        feedback.body.indexOf(searchWord) > -1
      );
    });

    if (searchWord) {
      setSearchUser(resultUser);
      setSearchFeedback(resultFeedback);
    } else {
      setSearchUser(null);
      setSearchFeedback(null);
    }
  };

  useEffect(() => { !userID && router.push(`/login`); }, []);
  useEffect(() => { search(searchWord); }, [searchWord]);

  return (
    <Layout>
      <div className="md:grid grid-cols-3 gap-2 relative pt-4 pb-12 md:pb-32">

        <div className="col-span-2 rounded border-beige border-2 p-2">
          <h1 className="text-center">検索</h1>
          <input
            className="border-2 border-beige rounded mt-4 py-1 w-full text-xl"
            type="text"
            placeholder="search"
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
          />
          <p className="text-xs">※キーワードを入力してください(ex. 英語</p>

          <div className="flex flex-row text-center my-4">
            <p
              className={`flex-grow py-1 text-beige rounded-tl-lg rounded-bl-lg hover:opacity-90 ${target == 'feedback' ? 'bg-red' : 'bg-blue'}`}
              onClick={() => setTarget('feedback')}
            >
              達成の記録
            </p>
            <p
              className={`flex-grow py-1 text-beige rounded-tr-lg rounded-br-lg hover:opacity-90 ${target == 'user' ? 'bg-red' : 'bg-blue'}`}
              onClick={() => setTarget('user')}
            >
              ユーザー
            </p>
          </div>

          {target == 'user'
            ? searchUser &&
            searchUser.map((user) => {
              return (
                <UserTemp key={user.id} user={user} />
              )
            })
            : searchFeedback &&
            searchFeedback.map((feedback) => {
              return (
                <div className="border-2 border-beige my-2 py-1 hover:opacity-75">
                  <Link href="/lists/[list-id]" as={`/lists/${feedback.list_id}`}>
                    <a>
                      <h1 className="pb-2">{feedback.title}</h1>
                      <p>{feedback.body}</p>
                    </a>
                  </Link>
                </div>
              );
            })}
        </div>

        <Menu userID={userID} />

      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const userRes = await axios.get(`${process.env.ACCOMPLIST_API}/users`);
  const users: User[] = await userRes.data;
  const feedbackRes = await axios.get(`${process.env.ACCOMPLIST_API}/feedbacks`);
  const feedbacks: Feedback[] = await feedbackRes.data;
  return {
    props: {
      users,
      feedbacks,
    },
  };
};

export default SearchPage;
