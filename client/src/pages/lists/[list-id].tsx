import React from 'react';

import { Layout } from '../../components/layout';

export default function Feedback() {
  return (
    <Layout>
      <div className="rounded border-beige border-2 mt-12">
        <div className="p-2">
          <img src="https://via.placeholder.com/850x500" />
        </div>
        <h1 className="text-2xl p-2">カナダへの留学達成</h1>
        <p className="p-2">
          200字以内のフィードバック
        </p>
      </div>

      <div>
        <div className="rounded border-2 border-beige mt-6">
          comment...
        </div>
        <div className="rounded border-2 border-beige mt-2 ml-4">
          comment...
        </div>
      </div>

      <div>
        <div className="rounded border-2 border-beige mt-6">
          comment...
        </div>
        <div className="rounded border-2 border-beige mt-2 ml-4">
          comment...
        </div>
        <div className="rounded border-2 border-beige mt-2 ml-4">
          comment...
        </div>
      </div>


    </Layout>
  );
}
