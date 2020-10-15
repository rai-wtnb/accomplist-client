import React, { FC } from 'react';
import Link from 'next/link';

export const Header: FC = () => {
  return (
    <header className="header">
      <span className="text-blue text-2xl absolute bottom-0">AccompList.</span>
      <Link
        href="/signup"
      >
        <a className="button">新規登録</a>
      </Link>
      <Link
        href="/login"
      >
        <a className="button">ログイン</a>
      </Link>
    </header>
  );
};
