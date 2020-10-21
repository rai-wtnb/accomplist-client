import React, { useState } from 'react';
import Link from 'next/link';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Layout } from '../../../components/layout';

const validation = () =>
  Yup.object().shape({
    feedbackTitle: Yup
      .string()
      .required('※入力してください')
      .max(100, 'タイトルが長すぎます(100字以下)'),
    feedbackBody: Yup
      .string()
      .required('※入力してください')
      .max(200, 'テキストが長すぎます(200字以下)')
  });

export default function ListSetting() {
  const [feedbackImg, setFeedbackImg] = useState(null);

  var createObjectURL;
  if (process.browser) {
    createObjectURL = (window.URL || window.webkitURL).createObjectURL || window.URL.createObjectURL;
  }
  const handleChangeFile = (e) => {
    var files = e.target.files;
    var imageUrl = files.length === 0 ? "" : createObjectURL(files[0]);
    setFeedbackImg(imageUrl)
  }

  return (
    <Layout>
      <div className="rounded border-beige border-2 my-12">
        <h1 className="text-center p-2">達成の記録</h1>

        <Formik
          // TODO
          initialValues={{ feedbackImg: null, feedbackTitle: '', feedbackBody: '' }}
          validationSchema={validation()}
          // TODO
          onSubmit={(values) => {
            console.log(values)
          }}
          render={(props,) => (
            <form
              onSubmit={props.handleSubmit}
              className="p-2"
            >
              <div className="pt-4 pb-2">
                <label htmlFor="profImg" className="bg-blue hover:bg-red text-beige rounded p-1 px-6">
                  画像を選択
                    </label>
              </div>
              <Field
                className="bg-blue text-beige hidden"
                name="profImg"
                id="profImg"
                type="file"
                value={props.values.feedbackImg}
                onChange={e => handleChangeFile(e)}
              />
              <div>
                {feedbackImg ?
                  <img
                    className="rounded object-cover mx-auto object-cover w-2/3"
                    src={feedbackImg}
                  />
                  :
                  <img className="p-2 mx-auto" src="https://via.placeholder.com/600x400" />
                }
              </div>

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
        />

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
