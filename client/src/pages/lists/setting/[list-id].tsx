import React, { useState } from 'react';
import Link from 'next/link';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Layout } from '../../../components/layout';
import FileInput from '../../../components/FileInput';

const validation = () =>
  Yup.object().shape({
    feedbackTitle: Yup
      .string()
      .required('※入力してください')
      .max(100, 'タイトルが長すぎます(100字以下)'),
    feedbackBody: Yup
      .string()
      .required('※入力してください')
      .max(500, '本文は500字以内にしてください')
  });

export default function ListSetting() {
  const [feedbackImg, setFeedbackImg] = useState<string>(null);

  return (
    <Layout>
      <div className="rounded border-beige border-2 my-12">
        <h1 className="text-center p-2">達成の記録</h1>

        <Formik
          // TODO
          initialValues={{ img: null, feedbackTitle: '', feedbackBody: '' }}
          validationSchema={validation()}
          // TODO
          onSubmit={(values) => {
            console.log(values)
          }}
        >
          {(props,) => (
            <form
              onSubmit={props.handleSubmit}
              className="p-2"
            >

              <FileInput
                setImg={setFeedbackImg}
                props={props}
                existImg={feedbackImg}
                isUser={false}
              />

              <div className="pt-2">
                <div>
                  <label htmlFor="feedbackTitle">タイトル</label>
                </div>
                <input
                  id="feedbackTitle"
                  name="feedbackTitle"
                  className="rounded border border-beige w-full text-black p-1 text-2xl"
                  value={props.values.feedbackTitle}
                  onChange={props.handleChange}
                />
                <p className="text-sm text-red">{props.errors.feedbackTitle}</p>
              </div>


              <div className="pt-4">
                <div>
                  <label htmlFor="feedbackBody">本文</label>
                </div>
                <textarea
                  className="rounded border border-beige w-full text-black p-1"
                  id="feedbackBody"
                  name="feedbackBody"
                  value={props.values.feedbackBody}
                  onChange={props.handleChange}
                  rows={4}
                />
                <p className="text-sm text-red">{props.errors.feedbackBody}</p>
              </div>

              <button type="submit" className="button w-full p-1 my-1 py-2">
                登録
                </button>
            </form>
          )}
        </Formik>

        <div className="px-2 pb-2">
          <Link href="/users/[user-id]" as="/users/1">
            <a>
              <button className="w-full bg-blue text-beige hover:bg-red py-1 rounded">キャンセル</button>
            </a>
          </Link>
        </div>

      </div>
    </Layout>
  );
}
