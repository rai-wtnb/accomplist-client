import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/router';

import { GetServerSideProps, NextPage } from 'next';
import { Layout } from '../../../components/layout';
import User from '../../../utils/types/user';
import FileInput from '../../../components/FileInput';
import { getUserCookie, getSessionCookie } from '../../../utils/mycookie';

type Props = {
  user: User;
};

const UserSetting: NextPage<Props> = ({ user }) => {
  const { id, name, twitter, description, img } = user;
  const [profImg, setProfImg] = useState<File>(img);
  const [updateSuccess, setUpdateSuccess] = useState<boolean>(false);
  const [updateFailed, setUpdateFailed] = useState<boolean>(false);
  const router = useRouter();
  const sessionID = getSessionCookie();
  const userID = getUserCookie();

  useEffect(() => {
    !userID
      ? router.push(`/login`)
      : userID !== id &&
      router.push(`/`) &&
      alert(
        '許可されていません。ログアウト後、もう1度ログインし直してお試しください。',
      );
  }, []);

  const validation = () =>
    Yup.object().shape({
      name: Yup.string()
        .required('※入力してください')
        .max(30, '※名前は30字以下にしてください'),
      twitter: Yup.string().max(20, '※Twitterのユーザー名は15字以下です'),
      description: Yup.string().max(
        200,
        '※プロフィールが長すぎます(200字以下)',
      ),
    });

  return (
    <Layout>
      <div className="mt-12 rounded border-beige border-2 p-2">
        <h1 className="text-center p-4">プロフィール設定</h1>

        {updateSuccess ? (
          <p className="text-center text-notifyBlue border-notifyBlue border-2 rounded p-1">
            登録完了しました
          </p>
        ) : (
            ''
          )}
        {updateFailed ? (
          <p className="text-center text-red border-red border-2 rounded p-1">
            登録に失敗しました。もう1度入力内容を確認するか、再度ログインし直してお試しください。
          </p>
        ) : (
            ''
          )}

        <Formik
          initialValues={{
            img,
            name,
            twitter,
            description,
            sess: sessionID,
          }}
          validationSchema={validation()}
          onSubmit={(values) => {
            axios
              .put(`${process.env.ACCOMPLIST_API_BROWSER}/users/${id}`, {
                name: values.name,
                twitter: values.twitter,
                description: values.description,
                sess: sessionID,
              })
              .then(() => {
                if (values.img !== img) {
                  const data = new FormData();
                  data.append('img', values.img);
                  axios
                    .put(
                      `${process.env.ACCOMPLIST_API_BROWSER}/users/${id}/img`,
                      data,
                      {
                        headers: {
                          'Content-Type': 'multipart/form-data',
                        },
                      },
                    )
                    .then((res) => {
                      setUpdateSuccess(true);
                      setTimeout(() => setUpdateSuccess(false), 3000);
                      console.log(res);
                    })
                    .catch(() => {
                      setUpdateFailed(true);
                      setTimeout(() => setUpdateFailed(false), 5000);
                    });
                } else {
                  setUpdateSuccess(true);
                  setTimeout(() => setUpdateSuccess(false), 3000);
                }
              })
              .catch(() => {
                setUpdateFailed(true);
                setTimeout(() => setUpdateFailed(false), 5000);
              });
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <div className="md:grid grid-cols-4">
                <div className="col-span-1">
                  <FileInput
                    setImg={setProfImg}
                    props={props}
                    existImg={profImg}
                    isUser
                  />
                </div>

                <div className="pt-2 col-span-3">
                  <div className="pt-2">
                    <div>
                      <label htmlFor="name">表示名</label>
                    </div>
                    <input
                      id="name"
                      className="rounded border border-beige w-full md:w-1/2 text-black p-1 text-2xl"
                      name="name"
                      value={props.values.name}
                      onChange={props.handleChange}
                    />
                    <p className="text-sm text-red">{props.errors.name}</p>
                  </div>

                  <div className="pt-2">
                    <div>
                      <label htmlFor="twitter">Twitterアカウント</label>
                    </div>
                    <span className="pr-1">@</span>
                    <input
                      className="rounded border border-beige md:w-1/2 text-black p-1"
                      id="twitter"
                      name="twitter"
                      value={props.values.twitter}
                      onChange={props.handleChange}
                    />
                    <p className="text-sm text-red">{props.errors.twitter}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <div>
                  <label htmlFor="description">プロフィール文</label>
                </div>
                <textarea
                  className="rounded border border-beige w-full text-black p-1"
                  id="description"
                  name="description"
                  value={props.values.description}
                  onChange={props.handleChange}
                  rows={4}
                />
                <p className="text-sm text-red">{props.errors.description}</p>
              </div>

              <button type="submit" className="button w-full p-1 my-1 py-2">
                登録
              </button>
            </form>
          )}
        </Formik>
        <Link href="/users/[user-id]" as={`/users/${id}`}>
          <a>
            <button className="w-full bg-blue text-beige hover:bg-red p-1 rounded">
              戻る
            </button>
          </a>
        </Link>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params['user-id'];
  const res = await axios.get(`${process.env.ACCOMPLIST_API}/users/${id}`);
  const user = await res.data;
  return {
    props: {
      user,
    },
  };
};

export default UserSetting;
