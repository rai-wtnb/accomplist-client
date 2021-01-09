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
import FeedbackTemp from '../../components/FeedbackTemp';

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
          <FeedbackTemp userID={userID} user={user} feedback={feedback} />

          <div className="rounded border-2 border-beige mt-4 ml-8 p-2">
            <Link href="/users/[user-id]" as={`/users/${userID}`}>
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
