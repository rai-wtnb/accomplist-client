import React from 'react';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

import { Layout } from '../../components/layout';
import Menu from '../../components/Menu';
import List from '../../utils/types/list';
import Feedback from '../../utils/types/feedback';
import User from '../../utils/types/user';

type Props = {
  feedback: Feedback;
  user: User;
}

const FeedbackPage: NextPage<Props> = ({ feedback, user }) => {
  return (
    <Layout>
      <div className="grid grid-cols-3 gap-2 py-12">

        <div className="col-span-2">
          <div className="rounded border-beige border-2">

            <div className="rounded hover:opacity-75">
              <Link href="/users/[user-id]" as={`/users/${user.id}`}>
                <a>
                  <img className="rounded p-2 inline" src={user.img} />
                  <h1 className="inline align-middle">{user.name}</h1>
                </a>
              </Link>
            </div>
            <div>
              <img
                className="p-2 w-full object-cover"
                src={feedback.img}
              />
            </div>
            <h1 className="p-2">{feedback.title}</h1>
            <p className="pl-2 text-sm">{feedback.CreatedAt}</p>
            <p className="p-2">
              {feedback.body}
            </p>

            <div className="flex flex-row-reverse p-2">
              <FontAwesomeIcon className="m-2 text-red text-3xl cursor-pointer hover:opacity-90" icon="heart" />
              <FontAwesomeIcon className="m-2 text-blue text-3xl hover:text-red cursor-pointer" icon={['far', 'heart']} />
              {/* 三項演算 */}
              <Link href="/lists/setting/[list-id]" as={`/lists/setting/${feedback.list_id}`}>
                <a>
                  <button className="text-beige bg-blue hover:bg-red rounded py-1 px-2 m-2">編集</button>
                </a>
              </Link>
            </div>
          </div>

          {/* <div className="rounded border-2 border-beige mt-6 ml-8 p-2">
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
              三項演算
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
          </div> */}
        </div>

        <Menu />
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axios.get(`${process.env.ACCOMPLIST_API}/lists`)
  const lists: List[] = res.data;
  const paths = lists.map(list => `/lists/${list.ID}`);
  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params['list-id'];
  const listRes = await axios.get(`${process.env.ACCOMPLIST_API}/lists/specific/${id}`);
  const list: List = listRes.data;
  const feedbackRes = await axios.get(`${process.env.ACCOMPLIST_API}/feedbacks/${id}`)
  const feedback: Feedback = feedbackRes.data;
  const userRes = await axios.get(`${process.env.ACCOMPLIST_API}/users/${list.user_id}`)
  const user: User = userRes.data;
  return {
    props: {
      feedback,
      user
    },
  };
}

export default FeedbackPage;
