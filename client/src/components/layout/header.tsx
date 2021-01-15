import React, { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import axios from 'axios';

import { divideCookie, getUserCookie } from '../../utils/mycookie';

export const Header: FC = () => {
  const userID = getUserCookie();
  const router = useRouter();

  return (
    <header className="header">
      <span className="text-blue text-2xl absolute bottom-0">AccompList.</span>

      {userID ? (
        <a
          className="button float-right ml-5 bg-blue"
          onClick={() => {
            const content = divideCookie();
            const params = new URLSearchParams();
            params.append('id', content.userID);
            axios
              .post(
                `${process.env.ACCOMPLIST_API_BROWSER}/users/logout`,
                params,
              )
              .then(() => {
                document.cookie = 'userID="none"; max-age=0; path=/';
                document.cookie = 'sessionID="none"; max-age=0; path=/';
              })
              .then(() => {
                router.push(`/`);
              });
          }}
        >
          ログアウト
        </a>
      ) : (
          <>
            <Link href="/login">
              <a className="button float-right ml-5">ログイン</a>
            </Link>
            <Link href="/signup">
              <a className="button float-right ml-5">新規登録</a>
            </Link>
          </>
        )}
    </header>
  );
};
