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

type Props = {
  feedbacks: Feedback[];
}

const TopicsList: NextPage<Props> = ({ feedbacks }) => {
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
              return (
                <>
                  {
                    feedback.DeletedAt || !feedback.user ?
                      <div />
                      :
                      <FeedbackTemp
                        key={feedback.ID}
                        userID={userID}
                        user={feedback.user}
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
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const feedbackRes = await axios.get(`${process.env.ACCOMPLIST_API}/feedbacks`)
  const feedbacks: Feedback[] = await feedbackRes.data;
  return {
    props: {
      feedbacks,
    },
  };
};

export default TopicsList;
