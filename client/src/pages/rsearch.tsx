import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import Link from 'next/link';
import axios from 'axios';

import { Layout } from '../components/layout';
import Menu from '../components/Menu';
import User from '../utils/types/user';
import { getUserCookie } from '../utils/mycookie';
import Feedback from '../utils/types/feedback';
import UserTemp from '../components/UserTemp';

const SearchPage: NextPage = () => {
  const userID = getUserCookie();
  const router = useRouter();
  const [searchUser, setSearchUser] = useState<User[] | null>(null);
  const [searchFeedback, setSearchFeedback] = useState<Feedback[] | null>(null);
  const [searchWord, setSearchWord] = useState<string>('英語');
  const [target, setTarget] = useState<'user' | 'feedback'>('feedback');

  useEffect(() => {
    !userID && router.push(`/login`);
    research()
  }, []);

  const research = () => {
    axios.get(`${process.env.ACCOMPLIST_API_BROWSER}/research?target=${target}&req=${searchWord}`)
      .then(res => {
        target == "user" ?
          setSearchUser(res.data)
          :
          setSearchFeedback(res.data)
      })
      .catch(err => console.log(err))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    research();
  }

  return (
    <Layout>
      <div className="md:grid grid-cols-3 gap-2 relative pt-4 pb-12 md:pb-32">

        <div className="col-span-2 rounded border-beige border-2 p-2">
          <h1 className="text-center">検索</h1>

          <form
            className="flex items-end"
            onSubmit={(e) => handleSubmit(e)}
          >
            <input
              className="border-2 border-beige rounded mt-4 py-1 w-64 text-xl flex-grow"
              type="text"
              placeholder="search"
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
            />
            <button
              className="button bg-blue ml-2 flex-none"
              onClick={() => research()}
            >検索</button>
          </form>

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
              onClick={() => { setTarget('user') }}
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

export default SearchPage;
