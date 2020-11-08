import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

import { Layout } from '../../../components/layout';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import User from '../../../types/user';

type Props = {
  user: User;
}

const UserSetting: NextPage<Props> = ({ user }) => {
  const { name, twitter, profile, img } = user;
  const [profImg, setProfImg] = useState<string>(img);

  var createObjectURL;
  if (process.browser) {
    createObjectURL = (window.URL || window.webkitURL).createObjectURL || window.URL.createObjectURL;
  }
  const handleChangeFile = (e) => {
    var files = e.target.files;
    var imageUrl = files.length === 0 ? "" : createObjectURL(files[0]);
    setProfImg(imageUrl)
  }

  const validation = () =>
    Yup.object().shape({
      name: Yup
        .string().required('※入力してください')
        .max(30, '※名前は30字以下にしてください'),
      twitter: Yup
        .string()
        .max(20, '※Twitterのユーザー名は15字以下です'),
      text: Yup
        .string()
        .max(200, '※プロフィールが長すぎます(200字以下)')
    });


  return (
    <Layout>
      <div className="mt-12 rounded border-beige border-2 p-2">

        <h1 className="text-center p-4">プロフィール設定</h1>

        <Formik
          // TODO
          initialValues={{ img: null, name: name, twitter: twitter, text: profile }}
          validationSchema={validation()}
          // TODO
          onSubmit={(values) => {
            console.log(values)
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <div className="grid grid-cols-4">
                <div className="col-span-1">

                  <div className="pt-4 pb-2">
                    <label htmlFor="img" className="bg-blue hover:bg-red text-beige rounded p-1 px-6">
                      画像を選択
                    </label>
                  </div>
                  <input
                    className="bg-blue text-beige hidden"
                    name="profImg"
                    id="img"
                    type="file"
                    onChange={e => {
                      handleChangeFile(e);
                      props.setFieldValue("img", e.currentTarget.files[0]);
                    }}
                  />
                  <div className="h-32 w-32 rounded bg-beige">
                    {
                      profImg ?
                        <img
                          className="rounded object-cover h-32 w-full"
                          src={profImg}
                        />
                        :
                        <div className="flex justify-center pt-8">
                          <FontAwesomeIcon
                            className="text-7xl text-blue items-center"
                            icon="user"
                          />
                        </div>
                    }
                  </div>
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
                  <label htmlFor="text">プロフィール文</label>
                </div>
                <textarea
                  className="rounded border border-beige w-full text-black p-1"
                  id="text"
                  name="text"
                  value={props.values.text}
                  onChange={props.handleChange}
                  rows={4}
                />
                <p className="text-sm text-red">{props.errors.text}</p>
              </div>

              <button type="submit" className="button w-full p-1 my-1 py-2">
                登録
                </button>
            </form>
          )}
        </Formik>
        <Link href="/users/[user-id]" as="/users/1">
          <a>
            <button className="w-full bg-blue text-beige hover:bg-red p-1 rounded">キャンセル</button>
          </a>
        </Link>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axios.get(`${process.env.ACCOMPLIST_API}/ids`)
  const ids: string[] = await res.data;
  const paths = ids.map(id => `/users/setting/${id}`);
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params['user-id'];
  const res = await axios.get(`${process.env.ACCOMPLIST_API}/users/${id}`)
  const user = res.data;
  return {
    props: {
      user
    },
  };
};

export default UserSetting;
