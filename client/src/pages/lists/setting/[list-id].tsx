import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GetServerSideProps, NextPage } from 'next';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import { Layout } from '../../../components/layout';
import FileInput from '../../../components/FileInput';
import List from '../../../utils/types/list';
import Feedback from '../../../utils/types/feedback';
import { getUserCookie, getSessionCookie } from '../../../utils/mycookie';

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
}

const ListSetting: NextPage<Props> = ({ list }) => {
  const { ID, img, title, body } = list.feedback;
  const [feedbackImg, setFeedbackImg] = useState<File>(img);
  const [updateFailed, setUpdateFailed] = useState<boolean>(false);
  const router = useRouter();
  const userID = getUserCookie();

  useEffect(() => {
    !userID ?
      router.push(`/login`)
      :
      userID !== list.user_id && router.push(`/`) && alert("許可されていません。ログアウト後、もう1度ログインし直してお試しください。");
  }, [])

  return (
    <Layout>
      <div className="rounded border-beige border-2 my-12">
        <h1 className="text-center p-2">達成の記録</h1>

        {
          updateFailed ?
            < p className="text-center text-red border-red border-2 rounded p-1">
              登録に失敗しました。もう1度入力内容を確認するか、再度ログインし直してお試しください。
            </p>
            :
            ""
        }

        <Formik
          initialValues={{ user_id: list.user_id, list_id: list.ID, img: img, title: title, body: body }}
          validationSchema={validation()}
          onSubmit={(values) => {
            const sessionID = getSessionCookie();
            const jsonData = {
              user_id: values.user_id,
              list_id: values.list_id,
              title: values.title,
              body: values.body,
              sess: sessionID,
            }

            if (list.done === true) {
              // update
              axios.put(
                `${process.env.ACCOMPLIST_API_BROWSER}/feedbacks/${ID}`, jsonData)
                .then(() => {
                  if (values.img !== img) {
                    let data = new FormData();
                    data.append("img", values.img);
                    axios.put(
                      `${process.env.ACCOMPLIST_API_BROWSER}/feedbacks/${list.ID}/img`,
                      data,
                      {
                        headers: {
                          'content-type': 'multipart/form-data',
                        },
                      }
                    )
                  }
                })
                .then(() => {
                  router.push(`/lists/${list.ID}`)
                })
                .catch(() => {
                  setUpdateFailed(true)
                  setTimeout(() => setUpdateFailed(false), 5000)
                })
            } else {
              // create
              axios.post(`${process.env.ACCOMPLIST_API_BROWSER}/feedbacks`, jsonData)
                .then(() => {
                  if (values.img !== img) {
                    let data = new FormData();
                    data.append("img", values.img);
                    axios.put(
                      `${process.env.ACCOMPLIST_API_BROWSER}/feedbacks/${list.ID}/img`,
                      data,
                      {
                        headers: {
                          'content-type': 'multipart/form-data',
                        },
                      }
                    )
                  }
                  const updateList = {
                    ID: list.ID,
                    user_id: list.user_id,
                    content: list.content,
                    done: true,
                  }
                  axios.put(`${process.env.ACCOMPLIST_API_BROWSER}/lists/specific/${list.ID}`, updateList)
                })
                .then(() => {
                  router.push(`/lists/${list.ID}`);
                })
                .catch(() => {
                  setUpdateFailed(true)
                  setTimeout(() => setUpdateFailed(false), 5000)
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
          <Link href="/users/[user-id]" as={`/users/${list.user_id}`}>
            <a>
              <button className="w-full bg-blue text-beige hover:bg-red py-1 rounded">キャンセル</button>
            </a>
          </Link>
        </div>

      </div>
    </Layout >
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params['list-id'];
  const listRes = await axios.get(`${process.env.ACCOMPLIST_API}/lists/specific/${id}`)
  const list: List = await listRes.data;
  return {
    props: {
      list,
    },
  }
}

export default ListSetting;
