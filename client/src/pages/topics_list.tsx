import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps, NextPage } from 'next';

import { Layout } from '../components/layout';
import FeedbackTemp from '../components/FeedbackTemp';
import Menu from '../components/Menu';
import { getUserCookie } from '../utils/mycookie';
import axios from 'axios';
import User from '../utils/types/user';
import Feedback from '../utils/types/feedback';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  users: User[];
  feedbacks: Feedback[];
}

const TopicsList: NextPage<Props> = ({ users, feedbacks }) => {
  const userID = getUserCookie();
  const router = useRouter();

  useEffect(() => {
    !userID && router.push(`/login`)
  }, [])

  return (
    <Layout>
      <div className="md:grid grid-cols-3 gap-2 relative pt-4 pb-12 md:pb-32">
        <div className="col-span-2 rounded border-beige border-2 p-2 my-2">
          <h1 className="text-center my-4">話題のリスト</h1>

          {
            feedbacks.map((feedback) => {
              const user = users.find((user) => user.id === feedback.user_id)
              return (
                {
                  feedback.DeletedAt ?
                    <div />
                    :
                    <FeedbackTemp
                      key={feedback.ID}
                      userID={userID}
                      user={user}
                      feedback={feedback}
                    />
                }
              )
            })
          }
        </div>

        <Menu userID={userID} />
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const userRes = await axios.get(`${process.env.ACCOMPLIST_API}/users`)
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

export default TopicsList;
