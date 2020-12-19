import React, { FC } from 'react';
import Link from 'next/link';
import axios from 'axios';

import { divideCookie, getUserCookie } from '../../utils/mycookie';

export const Header: FC = () => {
  const userID = getUserCookie();

  return (
    <header className="header">

      <span className="text-blue text-2xl absolute bottom-0">AccompList.</span>

      {
        userID ?
          <Link href="/">
            <a
              className="button float-right ml-5 bg-blue"
              onClick={() => {
                const content = divideCookie();
                axios.post(`${process.env.ACCOMPLIST_API_BROWSER}/users/logout`, {
                  headers: {
                    Cookie: `userID=${content["userID"]}`
                  },
                  withCredentials: true
                })
                  .then(() => {
                    document.cookie = 'userID="none"; max-age=0; path=/';
                    document.cookie = 'sessionID="none"; max-age=0; path=/';
                  })
              }}
            >ログアウト</a>
          </Link>
          :
          <>
            <Link href="/login">
              <a className="button float-right ml-5">ログイン</a>
            </Link>

            {/* TODO */}
            <Link href="/login">
              <a className="button float-right ml-5">テストユーザーでログイン</a>
            </Link>

            <Link href="/signup">
              <a className="button float-right ml-5">新規登録</a>
            </Link>
          </>
      }

    </header >
  );
};
