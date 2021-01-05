import React, { useEffect } from 'react';
import Link from 'next/link';
import { GetServerSideProps, NextPage } from 'next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import axios from 'axios';

import { Layout } from '../../components/layout';
import Menu from '../../components/Menu';
import List from '../../utils/types/list';
import Feedback from '../../utils/types/feedback';
import User from '../../utils/types/user';
import { getUserCookie } from '../../utils/mycookie';

type Props = {
  feedback: Feedback;
  user: User;
}

const FeedbackPage: NextPage<Props> = ({ feedback, user }) => {
  const userID = getUserCookie();
  const router = useRouter();

  useEffect(() => {
    !userID && router.push(`/login`)
  }, [])

  return (
    <Layout>
      <div className="md:grid grid-cols-3 gap-2 py-12">

        <div className="col-span-2">
          <div className="rounded border-beige border-2 p-2">

            <Link href="/users/[user-id]" as={`/users/${user.id}`}>
              <a className="flex items-center">
                <span className="hover:opacity-75 h-60">
                  <span className="align-middle h-20 w-20 md:h-32 md:w-32 rounded bg-beige inline-block">
                    {
                      user.img ?
                        <img
                          className="rounded object-cover h-20 md:h-32 w-full inline-blok"
                          src={String(user.img)}
                        />
                        :
                        <span className="flex justify-center pt-8">
                          <FontAwesomeIcon
                            className="text-4xl md:text-6xl text-blue items-center"
                            icon="user"
                          />
                        </span>
                    }
                  </span>
                  <h1 className="align-middle inline-block pl-10">{user.name}</h1>
                </span>
              </a>
            </Link>

            <div className="pt-6 pb-4">
              <img
                className="w-full object-cover rounded"
                src={String(feedback.img)}
              />
            </div>
            <h1 >{feedback.title}</h1>
            <p className="py-4">
              {feedback.body}
            </p>
            <p className="text-sm">{feedback.CreatedAt}</p>

            <div className="flex flex-row-reverse p-2">
              {true ?
                <FontAwesomeIcon className="m-2 text-red text-3xl cursor-pointer hover:opacity-90" icon="heart" />
                :
                <FontAwesomeIcon className="m-2 text-blue text-3xl hover:text-red cursor-pointer" icon={['far', 'heart']} />
              }

              {
                userID == user.id ?
                  <Link href="/lists/setting/[list-id]" as={`/lists/setting/${feedback.list_id}`}>
                    <a>
                      <button className="text-beige bg-blue hover:bg-red rounded py-1 px-2 m-2">編集</button>
                    </a>
                  </Link>
                  :
                  ""
              }
            </div>
          </div>

          <div className="rounded border-2 border-beige mt-4 ml-8 p-2">
            <Link href="/users/[user-id]" as="/users/1">
              <div className="cursor-pointer hover:opacity-75">
                <img
                  className="align-middle inline rounded w-10 h-10"
                  src={String(user.img)}
                />
                <a className="align-middle inline p-2">{user.name}</a>
              </div>
            </Link>
            <p className="pt-2">Comment... (Coming soon!)</p>
          </div>
        </div>

        <Menu userID={userID} />
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params['list-id'];
  const listRes = await axios.get(`${process.env.ACCOMPLIST_API}/lists/specific/${id}`);
  const list: List = await listRes.data;
  const feedbackRes = await axios.get(`${process.env.ACCOMPLIST_API}/feedbacks/${id}`)
  const feedback: Feedback = await feedbackRes.data;
  const userRes = await axios.get(`${process.env.ACCOMPLIST_API}/users/${list.user_id}`)
  const user: User = await userRes.data;
  return {
    props: {
      feedback,
      user
    },
  };
}

export default FeedbackPage;
