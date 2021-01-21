import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { NextPage, GetServerSideProps } from 'next';
import axios from 'axios';

import { Layout } from '../../../components/layout';
import Menu from '../../../components/Menu';
import User from '../../../utils/types/user';
import Feedback from '../../../utils/types/feedback';
import { getUserCookie } from '../../../utils/mycookie';
import FeedbackTemp from '../../../components/FeedbackTemp';

type Props = {
  users: User[];
  feedbacks: Feedback[];
}

const FriendsPage: NextPage<Props> = ({ users, feedbacks }) => {
  const userID = getUserCookie();
  const router = useRouter();

  useEffect(() => { !userID && router.push(`/login`) }, [])

  return (
    <Layout>
      <div className="md:grid grid-cols-3 gap-2 relative pt-4 pb-12 md:pb-32">
        <div className="col-span-2 rounded border-beige border-2 p-2">
          <h1 className="text-center my-4">友達のリスト</h1>

          {
            feedbacks.map((feedback) => {
              const user = users.find((user) => user.id === feedback.user_id)
              return (
                <>
                  {
                    feedback.DeletedAt || !user ?
                      <div />
                      :
                      <FeedbackTemp
                        key={feedback.ID}
                        userID={userID}
                        user={user}
                        feedback={feedback}
                      />
                  }
                </>
              )
            })
          }
        </div>

        <Menu userID={userID} />
      </div>
    </Layout >
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params['user-id'];
  const userRes = await axios.get(`${process.env.ACCOMPLIST_API}/relations/follows/${id}`)
  const users: User[] = await userRes.data;
  const feedbackRes = await axios.get(`${process.env.ACCOMPLIST_API}/feedbacks`)
  const feedbacks: Feedback[] = await feedbackRes.data;
  return {
    props: {
      users,
      feedbacks,
    },
  };
};

export default FriendsPage;
