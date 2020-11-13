import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import { Layout } from '../../../components/layout';
import FileInput from '../../../components/FileInput';
import List from '../../../utils/types/list';
import Feedback from '../../../utils/types/feedback';

const validation = () =>
  Yup.object().shape({
    title: Yup
      .string()
      .required('※入力してください')
      .max(100, 'タイトルが長すぎます(100字以下)'),
    body: Yup
      .string()
      .required('※入力してください')
      .max(500, '本文は500字以内にしてください')
  });

type Props = {
  list: List;
  feedback: Feedback;
  userID: string;
}

const ListSetting: NextPage<Props> = ({ list, feedback, userID }) => {
  const { ID, img, title, body } = feedback;
  const [feedbackImg, setFeedbackImg] = useState<string>(img);
  const router = useRouter();

  return (
    <Layout>
      <div className="rounded border-beige border-2 my-12">
        <h1 className="text-center p-2">達成の記録</h1>

        <Formik
          initialValues={{ user_id: list.user_id, list_id: list.ID, img: img, title: title, body: body }}
          validationSchema={validation()}
          onSubmit={(values) => {
            if (list.done === true) {
              axios.put(`${process.env.ACCOMPLIST_API_BROWSER}/feedbacks/${ID}`, values)
                .then(() => {
                  router.push(`/lists/${list.ID}`)
                })
            } else {
              axios.post(`${process.env.ACCOMPLIST_API_BROWSER}/feedbacks`, values)
                .then(() => {
                  const updateList = {
                    ID: list.ID,
                    user_id: list.user_id,
                    content: list.content,
                    done: true,
                  }
                  axios.put(`${process.env.ACCOMPLIST_API_BROWSER}/lists/specific/${list.ID}`, updateList)
                  router.push(`/lists/${list.ID}`);
                })
            }
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
                  <label htmlFor="title">タイトル</label>
                </div>
                <input
                  id="title"
                  name="title"
                  className="rounded border border-beige w-full text-black p-1 text-2xl"
                  value={props.values.title}
                  onChange={props.handleChange}
                />
                <p className="text-sm text-red">{props.errors.title}</p>
              </div>


              <div className="pt-4">
                <div>
                  <label htmlFor="body">本文</label>
                </div>
                <textarea
                  className="rounded border border-beige w-full text-black p-1"
                  id="body"
                  name="body"
                  value={props.values.body}
                  onChange={props.handleChange}
                  rows={4}
                />
                <p className="text-sm text-red">{props.errors.body}</p>
              </div>

              <button type="submit" className="button w-full p-1 my-1 py-2">
                登録
                </button>
            </form>
          )}
        </Formik>

        <div className="px-2 pb-2">
          <Link href="/users/[user-id]" as={`/users/${userID}`}>
            <a>
              <button className="w-full bg-blue text-beige hover:bg-red py-1 rounded">キャンセル</button>
            </a>
          </Link>
        </div>

      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axios.get(`${process.env.ACCOMPLIST_API}/lists`)
  const lists: List[] = res.data;
  const paths = lists.map(list => `/lists/setting/${list.ID}`);
  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params['list-id'];
  const listRes = await axios.get(`${process.env.ACCOMPLIST_API}/lists/specific/${id}`)
  const list: List = listRes.data;
  const userID = list.user_id;
  if (list.done === true) {
    const feedbackRes = await axios.get(`${process.env.ACCOMPLIST_API}/feedbacks/${id}`)
    const feedback: Feedback = feedbackRes.data;
    return {
      props: {
        list,
        feedback,
        userID,
      },
    }
  } else {
    const feedback: Feedback = {
      ID: "",
      CreatedAt: null,
      UpdatedAt: null,
      user_id: "",
      list_id: "",
      img: "",
      title: "",
      body: "",
    };
    return {
      props: {
        list,
        feedback,
        userID,
      }
    }
  };
}

export default ListSetting;
