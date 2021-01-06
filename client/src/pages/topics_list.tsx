import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';

import { Layout } from '../components/layout';
import Menu from '../components/Menu';
import { getUserCookie } from '../utils/mycookie';

const TopicsList: NextPage = () => {
  const userID = getUserCookie();
  const router = useRouter();

  useEffect(() => {
    !userID && router.push(`/login`)
  }, [])

  return (
    <Layout>
    <div className="md:grid grid-cols-3 gap-2 relative pt-4 pb-12 md:pb-32">
      <div className="col-span-2 rounded border-beige border-2 p-2 divide-y divide-beige text-center">
        <h1>Topics</h1>
        <h1>Coming soon...</h1>
      </div>

      <Menu userID={userID} />
    </div>
    </Layout>
  )
}

export default TopicsList;
