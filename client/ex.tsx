import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';

import { Layout } from '../../../components/layout';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import User from '../../../utils/types/user';
import FileInput from '../../../components/FileInput';
import { getUserCookie, getSessionCookie } from '../../../utils/mycookie';

type Props = {
  user: User;
}

const UserSetting: NextPage<Props> = ({ user }) => {
  const { id, name, twitter, description, img } = user;
  const [profImg, setProfImg] = useState<File>(img);
  const [updateSuccess, setUpdateSuccess] = useState<boolean>(false);
  const sessionID = getSessionCookie();

  return (
    <Layout>
      <div className="mt-12 rounded border-beige border-2 p-2">

        <h1 className="text-center p-4">プロフィール設定</h1>

        {
          updateSuccess ?
            <p className="text-center text-red border-red border-2 rounded p-1">
              登録完了しました
              <button className="pl-4" onClick={() => setUpdateSuccess(false)}>
                <FontAwesomeIcon icon="times" />
              </button>
            </p>
            :
            ""
        }

        <Formik
          initialValues={{ img: img, name: name, twitter: twitter, description: description, sess: sessionID }}
          validationSchema={validation()}
          onSubmit={(values) => {
            console.log({
              fileName: values.img.name,
              type: values.img.type,
              size: `${values.img.size} bytes`
            })
            axios.put(
              `${process.env.ACCOMPLIST_API_BROWSER}/users/${id}`,
              {
                name: values.name,
                twitter: values.twitter,
                description: values.description,
                sess: sessionID,
              },
            )
              .then(() => {
                values.img ?
                  axios.put(`${process.env.ACCOMPLIST_API_BROWSER}/users/${id}/img`,
                    {
                      img: values.img
                    },
                    {
                      headers: { 'Content-Type': 'multipart/form-data' },
                    }
                  )
                    .then(() => {
                      setUpdateSuccess(true)
                    })
                    .catch((error) => {
                      // TODO
                      console.log(error)
                    })
                  :
                  setUpdateSuccess(true)
              })
              .catch((error) => {
                // TODO
                console.log(error);
              });
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <div className="grid grid-cols-4">
                <div className="col-span-1">
                  <FileInput
                    setImg={setProfImg}
                    props={props}
                    existImg={profImg}
                    isUser={true}
                  />
                </div>

                <div className="pt-2 col-span-3">
                  <div className="pt-2">
                    <div>
                      <label htmlFor="name">表示名</label>
                    </div>
                    <input
                      id="name"
                      className="rounded border border-beige w-1/2 text-black p-1 text-2xl"
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
                      className="rounded border border-beige w-1/2 text-black p-1"
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
            <button className="w-full bg-blue text-beige hover:bg-red p-1 rounded">戻る</button>
          </a>
        </Link>
      </div>
    </Layout >
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axios.get(`${process.env.ACCOMPLIST_API}/ids`)
  const ids: string[] = await res.data;
  const paths = ids.map(id => `/users/setting/${id}`);
  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params['user-id'];
  const res = await axios.get(`${process.env.ACCOMPLIST_API}/users/${id}`)
  const user = res.data;
  return {
    props: {
      user
    },
  };
}

export default UserSetting;
